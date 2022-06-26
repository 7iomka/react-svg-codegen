import type { Meta, Story } from '@storybook/react';
import { IconGallery, IconItem } from '@storybook/addon-docs';
import type { IconItemProps } from '@storybook/components';
import type { FC, PropsWithChildren } from 'react';

import { Icon } from '../index';

import { CodepenIcon } from '../codepen';
import { ChevronDownIcon } from '../chevron-down';
import { ChevronLeftIcon } from '../chevron-left';
import { ChevronRightIcon } from '../chevron-right';
import { ChevronUpIcon } from '../chevron-up';
import { TelegramIcon } from '../telegram';
import { TwitterIcon } from '../twitter';
import { VkIcon } from '../vk';
import { WhatsappIcon } from '../whatsapp';

const PatchedIconGallery = IconGallery as FC<PropsWithChildren>;
const PatchedIconItem = IconItem as FC<PropsWithChildren<IconItemProps>>;

export const Playground: Story = () => (
  <PatchedIconGallery>
    <PatchedIconItem name='Icon.ChevronDown'>
      <Icon.ChevronDown />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.ChevronLeft'>
      <Icon.ChevronLeft />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.ChevronRight'>
      <Icon.ChevronRight />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.ChevronUp'>
      <Icon.ChevronUp />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Codepen'>
      <Icon.Codepen />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Telegram'>
      <Icon.Telegram />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Twitter'>
      <Icon.Twitter />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Vk'>
      <Icon.Vk />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Whatsapp'>
      <Icon.Whatsapp />
    </PatchedIconItem>

    <PatchedIconItem name='CodepenIcon'>
      <CodepenIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronDownIcon'>
      <ChevronDownIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronLeftIcon'>
      <ChevronLeftIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronRightIcon'>
      <ChevronRightIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronUpIcon'>
      <ChevronUpIcon />
    </PatchedIconItem>

    <PatchedIconItem name='TelegramIcon'>
      <TelegramIcon />
    </PatchedIconItem>

    <PatchedIconItem name='TwitterIcon'>
      <TwitterIcon />
    </PatchedIconItem>

    <PatchedIconItem name='VkIcon'>
      <VkIcon />
    </PatchedIconItem>

    <PatchedIconItem name='WhatsappIcon'>
      <WhatsappIcon />
    </PatchedIconItem>
  </PatchedIconGallery>
);
export const Sprite: Story = () => (
  <PatchedIconGallery>
    <PatchedIconItem name='Icon.ChevronDown'>
      <Icon.ChevronDown />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.ChevronLeft'>
      <Icon.ChevronLeft />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.ChevronRight'>
      <Icon.ChevronRight />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.ChevronUp'>
      <Icon.ChevronUp />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Codepen'>
      <Icon.Codepen />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Telegram'>
      <Icon.Telegram />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Twitter'>
      <Icon.Twitter />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Vk'>
      <Icon.Vk />
    </PatchedIconItem>

    <PatchedIconItem name='Icon.Whatsapp'>
      <Icon.Whatsapp />
    </PatchedIconItem>
  </PatchedIconGallery>
);
export const Standalone: Story = () => (
  <PatchedIconGallery>
    <PatchedIconItem name='CodepenIcon'>
      <CodepenIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronDownIcon'>
      <ChevronDownIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronLeftIcon'>
      <ChevronLeftIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronRightIcon'>
      <ChevronRightIcon />
    </PatchedIconItem>

    <PatchedIconItem name='ChevronUpIcon'>
      <ChevronUpIcon />
    </PatchedIconItem>

    <PatchedIconItem name='TelegramIcon'>
      <TelegramIcon />
    </PatchedIconItem>

    <PatchedIconItem name='TwitterIcon'>
      <TwitterIcon />
    </PatchedIconItem>

    <PatchedIconItem name='VkIcon'>
      <VkIcon />
    </PatchedIconItem>

    <PatchedIconItem name='WhatsappIcon'>
      <WhatsappIcon />
    </PatchedIconItem>
  </PatchedIconGallery>
);

const story: Meta = {
  title: 'Icons'
};

export default story;
