import type { FSWatcher } from 'chokidar';
import chokidar from 'chokidar';

import { DirScanner } from './lib';
import type {
  Config,
  DefaultConfig,
  DirTreeInfo,
  IconsMap,
  PublicConfig,
  StorybookDefaultConfig
} from './types';
import { DeclarationWriter, StorybookWriter } from './writers';

class SVGGenerator {
  private static readonly DEFAULT_CONFIG: DefaultConfig = {
    watch: false,
    sprite: true,
    servedFromPublic: false,
    logger: console,
    generateTypes: false
  };

  private static readonly DEFAULT_STORYBOOK_CONFIG: StorybookDefaultConfig = {
    patchFC: true
  };

  public constructor(config: PublicConfig) {
    Object.assign(this.config, { ...SVGGenerator.DEFAULT_CONFIG, ...config });

    if (!config.storybook) return;

    Object.assign(this.config, {
      storybook: {
        ...SVGGenerator.DEFAULT_STORYBOOK_CONFIG,
        ...config.storybook
      }
    });
  }

  private readonly config: Config = {} as Config;

  private isWatching = false;

  private readonly getIconsMap = () => {
    const rootDir = DirScanner.getDirTree(this.config.iconsFolder);

    const map = {} as IconsMap;

    (rootDir.children ?? []).forEach(folder => {
      this.addLevelToMap(map, folder);
    });

    return map;
  };

  private readonly addLevelToMap = (map: IconsMap, dirInfo: DirTreeInfo) => {
    if (dirInfo.type === 'folder' && dirInfo.children) {
      map[dirInfo.name] = {};

      dirInfo.children.forEach(_dirInfo => {
        this.addLevelToMap(map[dirInfo.name] as IconsMap, _dirInfo);
      });

      return;
    }

    map[dirInfo.name] = dirInfo.path;
  };

  private readonly generateStorybookDocs = async () => {
    if (!this.config.storybook) return;

    const iconsMap = this.getIconsMap();

    const writer = new StorybookWriter(this.config, this.config.storybook);

    writer.write(iconsMap);
  };

  private readonly generateSVGDeclaration = () => {
    const iconsMap = this.getIconsMap();

    const writer = new DeclarationWriter(this.config);

    writer.write(iconsMap);
  };

  private readonly attachWatchers = (watcher: FSWatcher) => {
    watcher.on('change', pth => {
      this.config.logger.log('SVG: path changed', pth);
      this.generate();
    });

    watcher.on('add', pth => {
      this.config.logger.log('SVG: path added', pth);
      this.generate();
    });

    watcher.on('addDir', pth => {
      this.config.logger.log('SVG: dir added', pth);
      this.generate();
    });

    watcher.on('unlink', pth => {
      this.config.logger.log('SVG: path removed', pth);
      this.generate();
    });

    watcher.on('unlinkDir', pth => {
      this.config.logger.log('SVG: dir removed', pth);
      this.generate();
    });

    this.config.logger.log('SVG: watch mode is enabled');
  };

  private readonly initWatchers = () => {
    if (this.isWatching) return;

    this.isWatching = true;

    const watcher = chokidar.watch([`${this.config.iconsFolder}/**/*`], {
      ignored: [`${this.config.iconsFolder}/*.tsx`],
      ignoreInitial: true,
      persistent: true,
      ignorePermissionErrors: true,
      depth: 4
    });

    this.attachWatchers(watcher);
  };

  private readonly generate = () => {
    this.generateSVGDeclaration();

    if (!this.config.storybook) return;

    this.generateStorybookDocs();
  };

  public readonly init = () => {
    this.generate();

    if (!this.config.watch) return;

    this.initWatchers();
  };
}

export { SVGGenerator };
