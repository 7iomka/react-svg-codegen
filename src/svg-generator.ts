import type { Config, DefaultConfig, PublicConfig } from './types';
import { Watcher } from './watcher';
import { SpriteGen, StandaloneGen, StorybookGen } from './gen';

class SVGGenerator {
  private static readonly DEFAULT_CONFIG: DefaultConfig = {
    watch: false,
    generateTypes: false
  };

  public constructor(config: PublicConfig) {
    Object.assign(this.config, SVGGenerator.DEFAULT_CONFIG, config);
  }

  private readonly config: Config = {} as Config;

  private readonly generateStorybookDocs = () => {
    new StorybookGen(this.config).write();
  };

  private readonly generateSVGStandalone = () => {
    new StandaloneGen(this.config).write();
  };

  private readonly generateSVGSprite = () => {
    new SpriteGen(this.config).write();
  };

  private readonly generate = () => {
    this.generateSVGSprite();
    this.generateSVGStandalone();

    if (!this.config.storybook) return;

    this.generateStorybookDocs();
  };

  public readonly init = () => {
    this.generate();

    if (!this.config.watch) return;

    new Watcher(this.config, this.generate).init();
  };
}

export { SVGGenerator };
