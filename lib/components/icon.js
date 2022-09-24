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
    ...restProps
  } = props;

  const iconSvg = useIcon(icon);

  const style = filterEntries(([_k, v]) => v !== undefined)({
    color,
    display: 'inline-flex',
    flex: 'none',
    '> svg': {
      height: height || size,
      width: width || size,
    },
  });

  return Element({
    ...restProps,
    children: iconSvg,
    styleProps,
    styles: mergeStyles([style, styles]),
  });
};
