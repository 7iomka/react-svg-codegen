/* eslint-disable */
// Sprite icons
import ChevronDown from './sprite/chevron-down.svg?sprite';
import ChevronLeft from './sprite/chevron-left.svg?sprite';
import ChevronRight from './sprite/chevron-right.svg?sprite';
import ChevronUp from './sprite/chevron-up.svg?sprite';
// Standalone svgs
import Codepen from './standalone/codepen.svg';
import Telegram from './standalone/telegram.svg';
import Twitter from './standalone/twitter.svg';
import Vk from './standalone/vk.svg';
import Whatsapp from './standalone/whatsapp.svg';
// Custom svg-components (TSX): TODO: ready yet


// Types
export type SpriteIcon = 
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp';
 
export type StandaloneIcon = 
  | 'Codepen'
  | 'Telegram'
  | 'Twitter'
  | 'Vk'
  | 'Whatsapp';

export type CustomIcon = any;

export const Icons = {
  sprite: {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp
  },
  standalone: {
    Codepen,
    Telegram,
    Twitter,
    Vk,
    Whatsapp
  },
  custom: {}
};
