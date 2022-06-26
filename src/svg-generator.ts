import type {
  Config,
  DefaultConfig,
  PublicConfig,
  StorybookDefaultConfig
} from './types';
import { Watcher } from './watcher';
import { SpriteGen, StorybookGen } from './gen';
import { StandaloneGen } from './gen/standalone.gen';

class SVGGenerator {
  private static readonly DEFAULT_CONFIG: DefaultConfig = {
    watch: false,
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
