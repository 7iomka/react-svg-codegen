import path from 'path';
import slash from 'slash';
import { rm } from 'fs/promises';

import type { Config, DefaultConfig, PublicConfig } from './types';
import { Watcher } from './watcher';
import { SpriteGen, StandaloneGen, StorybookGen } from './gen';
import { DirectoryScanner, Formatter } from './lib';

class SVGGenerator {
  private static readonly DEFAULT_CONFIG: DefaultConfig = {
    watch: false,
    generateTypes: false
  };

  public constructor(config: PublicConfig) {
    Object.assign(this.config, SVGGenerator.DEFAULT_CONFIG, config);

    this.storybookGen = new StorybookGen(this.config);
    this.standaloneGen = new StandaloneGen(this.config);
    this.spriteGen = new SpriteGen(this.config);
  }

  private readonly config: Config = {} as Config;

  private readonly spriteGen: SpriteGen;

  private readonly standaloneGen: StandaloneGen;

  private readonly storybookGen: StorybookGen;

  private readonly generate = () => {
    this.spriteGen.write();
    this.standaloneGen.write();

    if (!this.config.storybook) return;

    this.storybookGen.write();
  };

  private readonly cleanup = (cleanupPath: string) => {
    const isSvg = cleanupPath.endsWith('.svg');

    const normalizedStandaloneFolderPath = slash(
      path.normalize(DirectoryScanner.getStandaloneFolderPath(this.config))
    );

    const isStandaloneFolder = slash(cleanupPath).startsWith(
      normalizedStandaloneFolderPath
    );

    /**
     * Cleanup .tsx, standalone icons, files after .svg, standalone icons, removed
     */
    if (!isSvg || !isStandaloneFolder) return;

    const iconFileNameWithSvgExtension = path.basename(cleanupPath);
    const iconFileNameWithTsxExtension = Formatter.svgToTsx(
      iconFileNameWithSvgExtension
    );
    const deletedFilePath = path.resolve(
      this.config.iconsFolder,
      iconFileNameWithTsxExtension
    );

    rm(deletedFilePath);
  };

  public readonly init = () => {
    this.generate();

    if (!this.config.watch) return;

    new Watcher(this.config, this.generate, this.cleanup).init();
  };
}

export { SVGGenerator };
