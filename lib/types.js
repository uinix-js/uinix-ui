/**
 * This module exports nothing.  It contains JSDoc typedefs.
 */

export {};

// Components
/**
 * @typedef {Object<string, any>} AnyProps
 *    An object of any properties.
 *
 * @callback CustomElement
 * @param {AnyProps} [props]
 * @param {CustomElement | CustomElement[]} [children]
 * @returns {ReturnType<H>}
 *
 * @callback H
 *    Hyperscript's `h` interface.
 * @param {string} name
 * @param {Object<string, any>} [attributes]
 * @param {Array<string | any>} [children]
 * @returns {any}
 */

// Styles
/**
 * @typedef {string | number} StyleValue
 *    A valid `CssProperty` value (e.g. "center", "10px", 10).
 *
 * @typedef {StyleValue | StyleValue[]} ResponsiveStyleValue
 *    Responsive style values are StyleValue expressed in array-form.
 *
 * @typedef {{
 *   [key: string]: ResponsiveStyleValue | StyleObject;
 * }} StyleObject
 *    An object representing a style.
 *    - Keys: CSS property names and pseudo-classes/selectors.
 *    - Values: CSSProperties or theme property keys specified as single
 *      values or in array form (i.e. responsive values).
 *
 * @callback StyleFunction
 *    A style function is an unary function taking `StyleProps` as args
 *    and returns a `StyleObject`.
 * @param {AnyProps} props
 *    StyleProps
 * @return {StyleObject | null}
 *    StyleObject or null
 *
 * @typedef {StyleObject | StyleFunction | null | undefined} Style
 *    A `Style` interface may refer to a `StyleObject`, `StyleFunction`,
 *    `null`, or `undefined`.
 *
 * @typedef {Style | Style[]} Styles
 *    `Styles` may be provided as a single `Style` or an array of `Style`s.
 *
 * @typedef {{
 *    [key: string]: StyleObject | StyleDefinition
 * }} StyleDefinition
 *    A `StyleDefinition` can be recursively nested to organize
 *    eventually-resolved `StyleObjects`.
 */

// System
/**
 * @typedef {{
 *    [key: string]: string | SystemIcons
 * }} SystemIcons
 *    Recursively nestable map of icon name to its svg contents.
 *
 * @typedef {import('uinix-theme').Theme} SystemTheme
 *    A uinix-theme complient object to manage theme values.
 *
 * @typedef FontFace
 *    A representation of a CSS font-face
 * @property {string} src
 *    The font-face resource.  Can be a relative path or an absolute url.
 *
 * @typedef TypographyStyles
 * @property {Object<string, FontFace>} fontFaces
 *    Define all font-face resources.
 *    The keys are the font-face name that may be referenced by
 *    `system.theme.fontFamilies`
 * @property {StyleDefinition} global
 *    See Styles.global.
 *    Global styles should only apply to typographic HTML elements.
 * @property {StyleDefinition} variants
 *    See Styles.variants.
 *    Typography style variants can only be used by the `Text` component.
 *
 * @typedef {{
 *    [key: string]: any;
 *    breakpoints: string[];
 *    global: StyleDefinition;
 *    variants: StyleDefinition;
 *    typography: TypographyStyles;
 * }} SystemStyles (Typescript declaration workaround JSDoc not supporting generic typedefs)
 *    A typed object defining style breakpoints, global styles, variant
 *    styles, typography styles, custom styles (objects/functions) for
 *    the system.
 * @property {string[]} breakpoints
 *    Specifies responsive breakpoints (`min-width`-based media queries) as an
 *    array of strings.
 * @property {StyleDefinition} global
 *    Specifies styles that will affect the global stylsheet.  Useful for
 *    - CSS resets.
 *    - Global styling of HTML elements with theme-based styles.
 *    - Overriding vendor classnames with theme-based styles.
 *
 *    The keys for `styles.global` should valid CSS selectors (e.g. HTML names,
 *    CSS classnames).
 * @property {StyleDefinition} variants
 *    Specifies style objects that can be retrieved by the `variant` prop in
 *    uinix-ui components.
 * @property {TypographyStyles} typography
 *    An `Styles`-like object defining typography styles for the `Text`
 *    component.
 *
 * @typedef System
 *    The source of truth for the `icons`, `styles`, `theme` specs.
 * @property {SystemIcons} icons
 * @property {SystemStyles} styles
 * @property {SystemTheme} theme
 */

// Config
/**
 * @typedef {Object<string, string[]>} ShorthandPropsMapping
 *    A mapping of CSS property names to an array of shorthand prop names.
 *
 * @typedef Config
 *    A configuration for the system and components.
 * @property {ShorthandPropsMapping} elementShorthandPropsMapping
 *    Configures the `Element` component with shorthand props that support
 *    theme-based styling.
 * @property {StyleFunction[]} elementStyles
 *    Configures the `Element` component and applies the provided style
 *    functions.
 * @property {boolean} enableAtomicCss
 *    Renders atomic CSS if set to true.
 * @property {string[]} responsiveCssProperties
 *    Whitelists responsive CSS properties.
 **/

// Store
/**
 * @callback CssRenderer
 *    Renders an `Style`s into CSS
 * @param {Styles} styles
 *    A single or array of `Style`s.
 * @return {string}
 *    Rendered CSS class name, and renders the CSS to DOM.
 *
 * @callback CreateCssRenderer;
 *    Creates a CSS renderer, given style props and style functions.
 * @param {AnyProps} [props]
 *    Style props for style functions.
 * @returns {CssRenderer}
 *    Returns a CSS renderer
 *
 * @typedef Store;
 *    Stores the system instance.
 * @property {Config} config
 *    System configuration.
 * @property {CreateCssRenderer} createCssRenderer
 *    Creates a CSS renderer.
 * @property {H} h
 *    Hyperscript h function.
 * @property {System} system
 *    The system source of truth.
 */
