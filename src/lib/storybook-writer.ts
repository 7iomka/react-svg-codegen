import type { Config, IconsMap } from '../types';
import { Formatter } from './formatter';

class StorybookWriter {
  public constructor(private readonly config: Config) {}

  private readonly names: string[] = [];

  private readonly fulfillNames = (iconsMap: IconsMap) => {
    Object.entries(iconsMap || {}).forEach(([key, iconsMapValue]) => {
      if (typeof iconsMapValue === 'object') {
        this.getContent(iconsMapValue);

        return;
      }

      this.names.push(Formatter.toImportName(key));
    });
  };

  private readonly writeImports = () => `
import type { Meta, Story } from '@storybook/react';

import { IconGallery, IconItem } from '@storybook/addon-docs';

import type { IconItemProps } from '@storybook/components';

${
  this.config.storybook.patchFC &&
  `import type { FC, PropsWithChildren } from 'react';
  `
}
import { Icon } from './index';
`;

  private readonly writeStoryConfig = () => `
const story: Meta = {
  title: 'Icons'
};

export default story;
`;

  private readonly writePlayground = () => {
    const IconGalleryComponent = this.config.storybook.patchFC
      ? 'PatchedIconGallery'
      : 'IconGallery';

    return `
${
  this.config.storybook.patchFC &&
  `
const PatchedIconGallery = IconGallery as FC<PropsWithChildren>;
const PatchedIconItem = IconItem as FC<PropsWithChildren<IconItemProps>>;
`
}


export const Playground: Story = () => (
  <${IconGalleryComponent}>
   ${this.writeIcons()}
  </${IconGalleryComponent}>
);
`;
  };

  private readonly writeIcons = () =>
    this.names
      .map(
        name => `
    <PatchedIconItem name='${name}'>
      <Icon.${name} />
    </PatchedIconItem>
    `
      )
      .join('\n');

  public getContent(iconsMap: IconsMap) {
    this.fulfillNames(iconsMap);

    return `
${this.writeImports()}

${this.writePlayground()}

${this.writeStoryConfig()}
`;
  }
}

export { StorybookWriter };
