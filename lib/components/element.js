import {useConfig, useCss, useH, useVariant} from '../system/hooks.js';
import {mergeClassNames} from '../util/merge-class-names.js';
import {mergeStyles} from '../util/merge-styles.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export {Element};

/**
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').CustomElement} CustomElement
 * @typedef {import('../types.js').H} H
 * @typedef {import('../types.js').Styles} Styles
 *
 * @typedef ElementProps
 * @property {string | CustomElement} [as="div"]
 *    Renders `Element` as the specified HTML element or `CustomElement`.
 *    Renders as a `HTMLDivElement` by default.
 * @property {string} [variant=""]
 *    A variant is a property path that accesses a style in
 *    `system.styles.variants[variant]`.
 * @property {AnyProps} [styleProps]
 *    Style props are used by style functions provided in the `styles` prop.
 * @property {Styles} [styles]
 *    Style objects or style functions can be provided as a single value or in
 *    array-form for composition.
 */

/**
 * `Element` is the elementary building block in uinix-ui.
 *
 * It implements the other uinix-ui components (`Layout`, `Icon`, `Text`).
 * It functions essentially as a passthrough to a `HTMLElement`, with a minimal
 * API of just a few additional props that allow access to the UI system.
 *
 * @param {AnyProps & ElementProps} props
 * @returns {ReturnType<H>}
 */
const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    styleProps,
    styles,
    variant = '',
    ...restProps
  } = props;

  const config = useConfig();
  const elementCss = useCss(props);
  const styleCss = useCss(styleProps);
  const h = useH();
  const variantStyle = useVariant(variant);

  const {elementShorthandPropsMapping, elementStyles} = config;
  const {nonShorthandProps, shorthandPropsStyle} = resolveShorthandProps(
    elementShorthandPropsMapping,
  )(restProps);

  const mergedStyles = mergeStyles([styles, shorthandPropsStyle, variantStyle]);
  const mergedClassNames = mergeClassNames([
    elementCss(elementStyles),
    styleCss(mergedStyles),
    className,
  ]);

  const elementProps = {
    ...nonShorthandProps,
    className: mergedClassNames,
  };

  return typeof as === 'string'
    ? h(as, elementProps, children)
    : as(elementProps, children);
};
