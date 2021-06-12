import {filter} from 'uinix-fp';

import {useSystem} from '../context/hooks.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Layout};

/**
 * @typedef {{
 *   align?: string;
 *   alignSelf?: string;
 *   direction?: string;
 *   flex?: string;
 *   inline?: boolean;
 *   justify?: string;
 *   justifySelf?: string;
 *   spacing?: string | number;
 *   wrap?: boolean;
 *   wrapSpacing?: string | number;
 * } & import('./element.js').ElementProps} LayoutProps
 */

/**
 * `Layout` is the primitive component used to easily build flex-based layouts and apply spacing rules for its children defined by the system.
 *
 * `Layout` provides many flex-based shorthand props (e.g. `align`, `direction`, `justify`) to configure the flex container styles.  The `spacing`, `wrap`, `wrapSpacing` props specify the spacing rules for its children.
 *
 * `Layout` is composed from `Element`.
 *
 * @param {LayoutProps} props
 * @returns {import('react').ReactElement}
 */
const Layout = (props) => {
  const {
    align,
    alignSelf,
    direction,
    flex,
    inline,
    justify,
    justifySelf,
    spacing,
    styleProps,
    styles,
    wrap,
    wrapSpacing,
    ...restProps
  } = props;

  const system = useSystem();

  const {h} = system.config;

  const style = filter((x) => x !== undefined)({
    alignItems: align,
    alignSelf,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    justifyContent: justify,
    justifySelf,
    marginTop: `-${wrap ? wrapSpacing : undefined}`,
    '> :not(:last-child)': {
      [direction === 'column' ? 'marginBottom' : 'marginRight']: spacing,
      marginTop: wrapSpacing,
    },
    '> :last-child': {
      marginTop: wrapSpacing,
    },
  });

  return h(Element, {
    ...restProps,
    styleProps,
    styles: mergeStyles([style, styles]),
  });
};
