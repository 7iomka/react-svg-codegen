import type { Config, IconsMap } from '../types';
import { Formatter } from './formatter';
import path from 'path';

class FileWriter {
  public constructor(private readonly config: Config) {}

  public writeImports(iconsMap: IconsMap, importNames: string[]): string {
    return `${Object.entries(iconsMap || {})
      .map(([key, iconsMapValue]) => {
        if (typeof iconsMapValue === 'object') {
          return this.writeImports(iconsMapValue, importNames);
        }

        const importName = Formatter.toImportName(key);

        importNames.push(importName);

        const importPath = this.config.serveFromPublic
          ? Formatter.getDirPathFromPublic(iconsMapValue)
          : Formatter.toImportPath(
              path.resolve(this.config.outputFolder),
              iconsMapValue
            );

        const importPathSuffix = this.config.sprite ? '?sprite' : '';

        const importPathPrefix =
          this.config.serveFromPublic || importPath.startsWith('.') ? '' : './';

        return `import ${importName} from '${importPathPrefix}${importPath}${importPathSuffix}';`;
      })
      .filter(Boolean)
      .join('\n')}
`;
  }

  public writeTypes(importNames: string[]): string {
    if (!importNames.length) return '';

    return `
type Icons = 
  | ${importNames.map(name => `'${name}'`).join('\n  | ')}
`;
  }

  public writeVars(importNames: string[]) {
    return `
const Icon = ${JSON.stringify(importNames, null, 2)
      .replace(/"/g, '')
      .replace(/\[/g, '{')
      .replace(/]/g, '}')};
`;
  }
}

export { FileWriter };
