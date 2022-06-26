import fs from 'fs';
import path from 'path';
import type { DirTreeInfo } from '../types';

class DirScanner {
  public static getDirTree(folderPath: string) {
    const stats = fs.lstatSync(folderPath);

    const info: DirTreeInfo = {
      path: folderPath,
      name: path.basename(folderPath),
      type: stats.isDirectory() ? 'folder' : 'file'
    };

    if (stats.isDirectory()) {
      info.children = fs
        .readdirSync(folderPath)
        .map(child => DirScanner.getDirTree(`${folderPath}/${child}`));
    }

    return info;
  }
}

export { DirScanner };
