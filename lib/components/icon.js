import {filterEntries} from 'uinix-fp';

import {useIcon} from '../system/hooks.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Icon};

const Icon = (props) => {
  const {
    color = 'currentColor',
    height,
    icon = '',
    size,
    styleProps,
    styles,
    width,
    onClick,
    ...restProps
  } = props;

  const iconSvg = useIcon(icon);

  const style = filterEntries(([_k, v]) => v !== undefined)({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color,
    display: 'flex',
    flex: 'none',
    margin: 0,
    padding: 0,
    '> svg': {
      height: height || size,
      width: width || size,
    },
  });

  return Element({
    ...restProps,
    as: onClick ? 'button' : 'div',
    children: iconSvg,
    styleProps,
    styles: mergeStyles([style, styles]),
    onClick,
  });
};
