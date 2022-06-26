import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';
import path from 'path';

class SpriteGen {
  public constructor(private readonly config: Config) {}

  private readonly getIcons = () => {
    const scanner = new DirectoryScanner(this.config);

    return scanner.getSpriteIcons();
  };

  public readonly write = async () => {
    const icons = this.getIcons();
    const names = icons.map(({ importName }) => importName);

    const content = await Writer.getContentByTemplate(
      path.resolve(this.config.templateFolder, 'sprite', 'index.eta'),
      {
        icons,
        iconsDeclaration: JSON.stringify(names, null, 2)
          .replace(/"/g, '')
          .replace(/\[/g, '{')
          .replace(/]/g, '}')
      }
    );

    Writer.writeContentToFile(this.config.iconsFolder, 'index.tsx', content, {
      onError: err => console.error(err),
      onSuccess: () => console.info('SVG: map was generated')
    });
  };
}

export { SpriteGen };
