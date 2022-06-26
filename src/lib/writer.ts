import * as Eta from 'eta';
import path from 'path';
import fs from 'fs';
import type { includeFile } from 'eta/dist/types/file-handlers';

class Writer {
  public static getContentByTemplate = async (
    templatePath: Parameters<typeof Eta.renderFile>[0],
    data: Parameters<typeof Eta.renderFile>[1] = {},
    options: Partial<Parameters<typeof includeFile>[1]> = {}
  ) =>
    new Promise<string>((resolve, reject) => {
      Eta.renderFile(templatePath, data, options, (err, str) => {
        if (err || !str) {
          return reject(err);
        }
        resolve(str);
      });
    });

  public static writeContentToFile = (
    folderPath: string,
    filePath: string,
    content: string,
    options: {
      onError: (err: NodeJS.ErrnoException | null) => void;
      onSuccess: () => void;
    } = { onError: () => {}, onSuccess: () => {} }
  ) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFile(path.resolve(folderPath, filePath), content, err => {
      if (err) {
        options.onError(err);

        return;
      }

      options.onSuccess();
    });
  };
}

export { Writer };
