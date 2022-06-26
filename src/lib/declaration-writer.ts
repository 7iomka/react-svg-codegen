import type { Config, IconsMap } from '../types';
import { Formatter } from './formatter';
import path from 'path';

class DeclarationWriter {
  public constructor(private readonly config: Config) {}

  private readonly names: string[] = [];

  public writeImports(iconsMap: IconsMap): string {
    return `${Object.entries(iconsMap || {})
      .map(([key, iconsMapValue]) => {
        if (typeof iconsMapValue === 'object') {
          return this.writeImports(iconsMapValue);
        }

        const importName = Formatter.toImportName(key);

        this.names.push(importName);

        const importPath = this.config.servedFromPublic
          ? Formatter.getDirPathFromPublic(iconsMapValue)
          : Formatter.toImportPath(
              path.resolve(this.config.outputFolder),
              iconsMapValue
            );

        const importPathSuffix = this.config.sprite ? '?sprite' : '';

        const importPathPrefix =
          this.config.servedFromPublic || importPath.startsWith('.')
            ? ''
            : './';

        return `import ${importName} from '${importPathPrefix}${importPath}${importPathSuffix}';`;
      })
      .filter(Boolean)
      .join('\n')}
`;
  }

  public writeTypes(): string {
    if (!this.names.length) return '';

    return `
type Icons = 
  | ${this.names.map(name => `'${name}'`).join('\n  | ')}
`;
  }

  public writeVars() {
    return `
const Icon = ${JSON.stringify(this.names, null, 2)
      .replace(/"/g, '')
      .replace(/\[/g, '{')
      .replace(/]/g, '}')};
`;
  }

  public getFileContent = (iconsMap: IconsMap) => `/* eslint-disable */
${this.writeImports(iconsMap)}
${this.writeTypes()}
${this.writeVars()}
    
export { Icon }
export type { Icons }
`;
}

export { DeclarationWriter };
