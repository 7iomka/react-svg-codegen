import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';
import path from 'path';

class StorybookGen {
  public constructor(private readonly config: Config) {}

  private readonly getIcons = () => {
    const scanner = new DirectoryScanner(this.config);

    return {
      sprite: scanner.getSpriteIcons(),
      standalone: scanner.getStandaloneIcons()
    };
  };

  public readonly write = async () => {
    const { sprite, standalone } = this.getIcons();
    const names = sprite.map(({ importName }) => importName);

    try {
      const content = await Writer.getContentByTemplate(
        path.resolve(this.config.templateFolder, 'storybook', 'index.eta'),
        { names, patchedFC: true, standalone }
      );

      await Writer.writeContentToFile(
        path.join(this.config.iconsFolder, 'docs'),
        'index.stories.tsx',
        content
      );

      console.info('SVG: docs was generated');
    } catch (e) {
      console.error(e);
    }
  };
}

export { StorybookGen };
