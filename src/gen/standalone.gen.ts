import type { Config } from '../types';
import { DirectoryScanner, Writer } from '../lib';

class StandaloneGen {
  public constructor(private readonly config: Config) {}

  private readonly getIcons = () => {
    const scanner = new DirectoryScanner(this.config);

    return scanner.getStandaloneIcons();
  };

  public readonly write = async () => {
    const icons = this.getIcons();

    icons.forEach(({ importName, importPath, original }) => {
      Writer.writeContentToFile(
        this.config.iconsFolder,
        original.name.replace('.svg', '.tsx'),
        `import ${importName} from './${importPath}';
        
export { ${importName} };`,
        {
          onError: console.log,
          onSuccess: () =>
            console.log(`Success write for ${importName} ${importPath}`)
        }
      );
    });
  };
}

export { StandaloneGen };
