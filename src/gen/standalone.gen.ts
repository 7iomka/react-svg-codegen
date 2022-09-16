import type { Config } from '../types';
import { DirectoryScanner, Formatter, Writer } from '../lib';
import path from 'path';

class StandaloneGen {
  public constructor(private readonly config: Config) {}

  public readonly write = async () => {
    const icons = new DirectoryScanner(this.config).getStandaloneIcons();

    for (const { importName, importPath, original } of icons) {
      try {
        const content = await Writer.getContentByTemplate(
          path.resolve(this.config.templateFolder, 'standalone'),
          { importName, importPath }
        );

        await Writer.writeContentToFile(
          this.config.iconsFolder,
          Formatter.svgToTsx(original.name),
          content
        );
      } catch (e) {
        console.log(e);
      }
    }

    console.log('SVG: standalone was generated');
  };
}

export { StandaloneGen };
