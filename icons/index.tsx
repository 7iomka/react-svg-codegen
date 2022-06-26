/* eslint-disable */

import ChevronDown from './sprite/chevron-down.svg?sprite';
import ChevronLeft from './sprite/chevron-left.svg?sprite';
import ChevronRight from './sprite/chevron-right.svg?sprite';
import ChevronUp from './sprite/chevron-up.svg?sprite';

import Codepen from './standalone/codepen.svg?sprite';
import Telegram from './standalone/telegram.svg?sprite';
import Twitter from './standalone/twitter.svg?sprite';
import Vk from './standalone/vk.svg?sprite';
import Whatsapp from './standalone/whatsapp.svg?sprite';




type Icons =
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Codepen'
  | 'Telegram'
  | 'Twitter'
  | 'Vk'
  | 'Whatsapp'



const Icon = {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Codepen,
  Telegram,
  Twitter,
  Vk,
  Whatsapp
};


export { Icon }
export type { Icons }
