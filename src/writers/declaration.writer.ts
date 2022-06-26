import { Formatter, Writer } from '../lib';
import type { Config, IconsMap } from '../types';
import path from 'path';

class DeclarationWriter extends Writer {
  public constructor(private readonly config: Config) {
    super();
  }

  public write = async (iconsMap: IconsMap) => {
    this.prepareData(iconsMap);

    const content = await this.getContentByTemplate(
      path.resolve(this.config.templateFolder, 'declaration', 'index.eta'),
      {
        iconsMap,
        iconsDeclaration: JSON.stringify(this.names, null, 2)
          .replace(/"/g, '')
          .replace(/\[/g, '{')
          .replace(/]/g, '}'),
        Formatter,
        names: this.names,
        ...this.config
      }
    );

    this.writeContentToFile(
      this.config.outputFolder,
      this.config.output,
      content,
      {
        onError: err => this.config.logger.error(err),
        onSuccess: () => this.config.logger.info('SVG: map was generated')
      }
    );
  };
}

export { DeclarationWriter };
