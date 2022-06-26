import fs from 'fs';
import path from 'path';
import type { Config, DirectoryTreeInfo } from '../types';
import { Formatter } from './formatter';

class DirectoryScanner {
  private static readonly getDirTree = (folderPath: string) => {
    const stats = fs.lstatSync(folderPath);

    const info: DirectoryTreeInfo = {
      path: folderPath,
      name: path.basename(folderPath),
      type: stats.isDirectory() ? 'folder' : 'file'
    };

    if (stats.isDirectory()) {
      info.children = fs
        .readdirSync(folderPath)
        .map(child => DirectoryScanner.getDirTree(`${folderPath}/${child}`));
    }

    return info;
  };

  public constructor(private readonly config: Config) {}

  public readonly getSpriteIcons = () => {
    const dir = DirectoryScanner.getDirTree(
      path.resolve(this.config.iconsFolder, 'sprite')
    );

    const dirItems = dir.children ?? [];

    return dirItems
      .flatMap(Formatter.flatMapDir)
      .filter(item => item.path.endsWith('.svg'))
      .map(Formatter.dirToImport(this.config.iconsFolder));
  };

  public readonly getStandaloneIcons = () => {
    const dir = DirectoryScanner.getDirTree(
      path.resolve(this.config.iconsFolder, 'standalone')
    );

    const dirItems = dir.children ?? [];

    return dirItems
      .flatMap(Formatter.flatMapDir)
      .filter(item => item.path.endsWith('.svg'))
      .map(Formatter.dirToImport(this.config.iconsFolder, 'Icon'));
  };
}

export { DirectoryScanner };
