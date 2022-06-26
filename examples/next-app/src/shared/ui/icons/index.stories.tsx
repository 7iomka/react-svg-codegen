import type { Meta, Story } from '@storybook/react';
import { IconGallery, IconItem } from '@storybook/addon-docs';
import type { IconItemProps } from '@storybook/components';

import { Icon } from './index';

import type { FC, PropsWithChildren } from 'react';

const PatchedIconGallery = IconGallery as FC<PropsWithChildren>;
const PatchedIconItem = IconItem as FC<PropsWithChildren<IconItemProps>>;

export const Playground: Story = () => (
  <PatchedIconGallery>
     
        <PatchedIconItem name='ChevronDown'>
  <Icon.ChevronDown />
</PatchedIconItem>

     
        <PatchedIconItem name='ChevronLeft'>
  <Icon.ChevronLeft />
</PatchedIconItem>

     
        <PatchedIconItem name='ChevronRight'>
  <Icon.ChevronRight />
</PatchedIconItem>

     
        <PatchedIconItem name='ChevronUp'>
  <Icon.ChevronUp />
</PatchedIconItem>

     
        <PatchedIconItem name='Codepen'>
  <Icon.Codepen />
</PatchedIconItem>

     
        <PatchedIconItem name='Telegram'>
  <Icon.Telegram />
</PatchedIconItem>

     
        <PatchedIconItem name='Twitter'>
  <Icon.Twitter />
</PatchedIconItem>

     
        <PatchedIconItem name='Vk'>
  <Icon.Vk />
</PatchedIconItem>

     
        <PatchedIconItem name='Whatsapp'>
  <Icon.Whatsapp />
</PatchedIconItem>

       </PatchedIconGallery>
);

const story: Meta = {
  title: 'Icons'
};

export default story;
