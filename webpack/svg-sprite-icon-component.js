/* eslint-disable */
import { createElement, useMemo, memo } from 'react'
import SpriteSymbol from '$$symbolRequest$$'
import sprite from '$$spriteRequest$$'


const symbol = new SpriteSymbol($$stringifiedSymbol$$);
sprite.add(symbol);

const SvgSpriteIcon = function SvgSpriteIcon(props = {}) {
  const {
    viewBox: propViewBox,
    width: propWidth,
    height: propHeight,
    className,
    ...restProps
  } = props;
  const viewBox = propViewBox || symbol.viewBox;
  const vParts = viewBox.split(' ');
  const vW = vParts[2];
  const vH = vParts[3];

  const aspectRatio = Number(vW) / Number(vH);

  const width = propWidth || Math.floor(propHeight * aspectRatio) || symbol.width || '1em';
  const height = propHeight || Math.floor(propWidth / aspectRatio) || symbol.height || '1em';


  return createElement(
    'svg',
    {
      viewBox,
      width,
      height,
      className: ['c-sprite-icon', className].filter(Boolean).join(' '),
      ...restProps,
    },
    createElement('use', {
      xlinkHref: '#' + symbol.id,
    }),
  );
};

SvgSpriteIcon.viewBox = symbol.viewBox;
SvgSpriteIcon.id = symbol.id;
SvgSpriteIcon.content = symbol.content;
SvgSpriteIcon.url = symbol.url;
SvgSpriteIcon.toString = symbol.toString;

const MemoSvgSpriteIcon = memo(SvgSpriteIcon);
MemoSvgSpriteIcon.displayName = `SvgSpriteIcon_${symbol.id}`;
export default MemoSvgSpriteIcon;
