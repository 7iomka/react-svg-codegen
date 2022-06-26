/* eslint-disable */
    
import ChevronDown from './sprite/chevron-down.svg?sprite';
import ChevronLeft from './sprite/chevron-left.svg?sprite';
import ChevronRight from './sprite/chevron-right.svg?sprite';
import ChevronUp from './sprite/chevron-up.svg?sprite';

import Codepen from './sprite/standalone/codepen.svg?sprite';
import Telegram from './sprite/standalone/telegram.svg?sprite';
import Twitter from './sprite/standalone/twitter.svg?sprite';
import Vk from './sprite/standalone/vk.svg?sprite';
import Whatsapp from './sprite/standalone/whatsapp.svg?sprite';


    
    
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
