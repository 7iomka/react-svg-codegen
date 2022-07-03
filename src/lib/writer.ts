import * as Eta from 'eta';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';

import type { includeFile } from 'eta/dist/types/file-handlers';

class Writer {
  public static getContentByTemplate = async (
    templatePath: Parameters<typeof Eta.renderFile>[0],
    data: Parameters<typeof Eta.renderFile>[1] = {},
    options: Partial<Parameters<typeof includeFile>[1]> = {}
  ) =>
    new Promise<string>((resolve, reject) => {
      Eta.configure({ autoEscape: false });

      Eta.renderFile(
        path.join(templatePath, 'index.eta'),
        data,
        options,
        (err, str) => {
          if (err || !str) {
            return reject(err);
          }
          resolve(str);
        }
      );
    });

  public static writeContentToFile = async (
    folderPath: string,
    filePath: string,
    content: string
  ) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    return writeFile(path.resolve(folderPath, filePath), content);
  };
}

export { Writer };
