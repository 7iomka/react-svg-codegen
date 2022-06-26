import slash from 'slash';
import path from 'path';

class Formatter {
  private static formatImportFileName(pathname: string, extension: string) {
    return slash(path.basename(pathname.replace(/^.*[\\\/]/, ''), extension));
  }

  private static toPascalCase(str: string) {
    return `${str}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1: string, $2: string, $3: string) =>
          `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }

  public static toImportName(fileName: string, extension = 'svg') {
    return Formatter.toPascalCase(
      Formatter.formatImportFileName(fileName, extension)
    );
  }

  public static toImportPath(root: string, relative: string) {
    return `${slash(path.normalize(path.relative(root, relative)))}`;
  }

  public static getDirPathFromPublic = (path: string): string =>
    slash(path).split('public').reverse()[0];
}

export { Formatter };
