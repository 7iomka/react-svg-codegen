import path from 'path';

import type { Config, IconsMap, StorybookConfig } from '../types';
import { Writer } from '../lib';

class StorybookWriter extends Writer {
  public constructor(
    private readonly config: Config,
    private readonly storybook: StorybookConfig
  ) {
    super();
  }

  public write = async (iconsMap: IconsMap) => {
    this.prepareData(iconsMap);

    const content = await this.getContentByTemplate(
      path.resolve(this.config.templateFolder, 'storybook', 'index.eta'),
      { names: this.names, patchedFC: this.storybook.patchFC }
    );

    this.writeContentToFile(
      this.storybook.folder,
      this.storybook.output,
      content,
      {
        onError: err => this.config.logger.error(err),
        onSuccess: () => this.config.logger.info('SVG: Docs was generated')
      }
    );
  };
}

export { StorybookWriter };
