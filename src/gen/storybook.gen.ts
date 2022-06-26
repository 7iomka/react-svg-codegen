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
    const { sprite: icons, standalone } = this.getIcons();
    const names = icons.map(({ importName }) => importName);

    const content = await Writer.getContentByTemplate(
      path.resolve(this.config.templateFolder, 'storybook', 'index.eta'),
      { names, patchedFC: this.config.storybook?.patchFC ?? true, standalone }
    );

    Writer.writeContentToFile(
      path.join(this.config.iconsFolder, 'docs'),
      this.config.storybook?.output ?? 'index.stories.tsx',
      content,
      {
        onError: err => console.error(err),
        onSuccess: () => console.info('SVG: docs was generated')
      }
    );
  };
}

export { StorybookGen };
