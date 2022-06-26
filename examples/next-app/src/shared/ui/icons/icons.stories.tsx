import type { Meta, Story } from '@storybook/react';
import { IconGallery, IconItem } from '@storybook/addon-docs';
import type { IconItemProps } from '@storybook/components';
import type { FC, PropsWithChildren } from 'react';

import { Icon } from './index';

const PatchedIconGallery = IconGallery as FC<PropsWithChildren>;
const PatchedIconItem = IconItem as FC<PropsWithChildren<IconItemProps>>;

export const Playground: Story = () => (
  <PatchedIconGallery>
    <PatchedIconItem name='VK'>
      <Icon.Vk />
    </PatchedIconItem>
  </PatchedIconGallery>
);

const story: Meta = {
  title: 'Icons'
};

export default story;
