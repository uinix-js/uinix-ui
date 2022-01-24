/**
 * This module exports nothing.  It contains JSDoc typedefs.
 */

export {};

/**
 * Some types (e.g. `H`, `Props`) are loosely typed because the consumers
 * own the API configuration.
 */

// General
/**
 * @typedef {Record<string, any>} Props
 *    A JS object of any properties.
 */

/**
 * @callback H
 *    `h` from hyperscript
 * @param {string} tag
 *    HTML element tag name (e.g. 'div', 'p', 'a')
 * @param {Object<string, any>} [attributes]
 *    HTML attributes
 * @param {Array<string | any>} [children]
 * @returns {any}
 */

/**
 * @typedef {Record<string, any>} StyleObject
 *    A JS object representing a style.
 *    - Keys:
 *      - CSS property names
 *      - pseudo-classes/selectors
 *    - Values:
 *      - CSS style values
 *      - Array of CSS property values (responsive style values)
 *      - Nested style objects (SASS-like)
      Example:
      ```js
      const style = {
        backgroundColor: 'red', // CSS style value
        padding: [24, 48], // responsive style values
        ':focus': { // SASS-like nesting
          backgroundColor: 'blue',
          ':hover': {
            backgroundColor: 'white',
          }
        }
      }
      ```
 *
 * @callback StyleFunction
 *    An unary function taking `StyleProps` and returning a `StyleObject`
 * @param {Props} StyleProps
 * @return {StyleObject | null}
 *
 * @typedef {StyleObject | StyleFunction | null | undefined} Style
 *    A `Style` can be any of the specified type.
 *
 * @typedef {Style | Style[]} Styles
 *    `Styles` can be specified as a singleton or array of `Style`s.
 */

// Config
/**
 * @typedef {Object<string, string[]>} ShorthandPropsMapping
 *    A mapping of CSS property names to an array of shorthand property names.
 */
