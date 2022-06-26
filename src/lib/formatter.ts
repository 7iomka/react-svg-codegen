import slash from 'slash';
import path from 'path';
import type { DirectoryTreeInfo } from '../types';

class Formatter {
  private static readonly formatImportFileName = (
    pathname: string,
    extension: string
  ) => slash(path.basename(pathname.replace(/^.*[\\\/]/, ''), extension));

  private static readonly toPascalCase = (str: string) =>
    `${str}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1: string, $2: string, $3: string) =>
          `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase());

  public static readonly toImportName = (fileName: string, extension = 'svg') =>
    Formatter.toPascalCase(Formatter.formatImportFileName(fileName, extension));

  public static readonly toImportPath = (root: string, relative: string) =>
    `${slash(path.normalize(path.relative(root, relative)))}`;

  public static readonly flatMapDir = (
    item: DirectoryTreeInfo
  ): DirectoryTreeInfo | DirectoryTreeInfo[] => {
    if (item.type === 'file') {
      return item;
    }

    return (item.children ?? []).flatMap(this.flatMapDir);
  };

  public static readonly dirToImport =
    (iconsFolder: string, importNameSuffix = '') =>
    (
      item: DirectoryTreeInfo
    ): {
      importName: string;
      importPath: string;
      original: DirectoryTreeInfo;
    } => ({
      importName: Formatter.toImportName(item.name) + importNameSuffix,
      importPath: Formatter.toImportPath(iconsFolder, item.path),
      original: item
    });
}

export { Formatter };
