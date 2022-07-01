import path from 'path';

import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';

class SpriteGen {
  public constructor(private readonly config: Config) {}

  private readonly getIcons = () => {
    const scanner = new DirectoryScanner(this.config);

    return scanner.getSpriteIcons();
  };

  public readonly write = async () => {
    const icons = this.getIcons();
    const names = icons.map(({ importName }) => importName);

    try {
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

      await Writer.writeContentToFile(
        this.config.iconsFolder,
        'index.tsx',
        content
      );

      console.info('SVG: map was generated');
    } catch (e) {
      console.error(e);
    }
  };
}

export { SpriteGen };
