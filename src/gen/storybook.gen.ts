import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';
import path from 'path';

class StorybookGen {
  public constructor(private readonly config: Config) {}

  public readonly write = async () => {
    const scanner = new DirectoryScanner(this.config);
    const sprite = scanner.getSpriteIcons();
    const standalone = scanner.getStandaloneIcons();

    const names = sprite.map(({ importName }) => importName);

    try {
      const content = await Writer.getContentByTemplate(
        path.resolve(this.config.templateFolder, 'storybook'),
        { names, standalone, patchedFC: true }
      );

      await Writer.writeContentToFile(
        path.join(this.config.iconsFolder, 'docs'),
        'index.stories.tsx',
        content
      );

      console.log('SVG: docs was generated');
    } catch (e) {
      console.log(e);
    }
  };
}

export { StorybookGen };
