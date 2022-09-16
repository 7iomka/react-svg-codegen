import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';
import path from 'path';

class SpriteGen {
  public constructor(private readonly config: Config) {}

  public readonly write = async () => {
    const scanner = new DirectoryScanner(this.config);
    const icons = scanner.getSpriteIcons();

    const names = icons.map(({ importName }) => importName);

    try {
      const content = await Writer.getContentByTemplate(
        path.resolve(this.config.templateFolder, 'sprite'),
        {
          icons,
          iconsDeclaration: JSON.stringify(names, null, 2)
            .replace(/"/g, '')
            .replace(/\[/g, '{')
            .replace(/]/g, '}')
        }
      );

      await Writer.writeContentToFile(
        this.config.iconsFolder,
        'index.tsx',
        content
      );

      console.log('SVG: map was generated');
    } catch (e) {
      console.log(e);
    }
  };
}

export { SpriteGen };
