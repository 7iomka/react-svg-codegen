import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';
import path from 'path';

class StandaloneGen {
  public constructor(private readonly config: Config) {}

  private readonly getIcons = () => {
    const scanner = new DirectoryScanner(this.config);

    return scanner.getStandaloneIcons();
  };

  public readonly write = async () => {
    const icons = this.getIcons();

    for (const { importName, importPath, original } of icons) {
      const content = await Writer.getContentByTemplate(
        path.resolve(this.config.templateFolder, 'standalone', 'index.eta'),
        { importName, importPath }
      );

      Writer.writeContentToFile(
        this.config.iconsFolder,
        original.name.replace('.svg', '.tsx'),
        content,
        {
          onSuccess: () =>
            console.log(`Success write for ${importName} ${importPath}`)
        }
      );
    }
  };
}

export { StandaloneGen };
