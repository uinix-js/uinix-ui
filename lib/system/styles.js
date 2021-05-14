import {merge} from 'uinix-fp';

import {TEXT_VARIANT_KEY} from '../constants.js';
import {createTypography} from './typography.js';

export {createStyles};

/**
 * @typedef {{
 *   src: string[],
 *   fontStretch?: string;
 *   fontStyle?: string;
 *   fontVariant?: string;
 *   fontWeight?: string;
 *   unicodeRange?: string;
 * }} FontFaceDefinition A FontFaceDefinition defines font resources and other optional font properties.
 *
 * @typedef {object} StyleObject A StyleObject must be a JSON serializable object.  StyleObjects can be arbitrarily nested (following valid CSS-in-JS rules) and should resolve into CSS property value(s).
 *
 * @typedef {(props: object) => StyleObject} StyleFunction A StyleFunction returns a StyleObject.
 *
 * @typedef {StyleObject | StyleFunction | null} Style A Style can be one of the following types.
 *
 * @typedef {{
 *   [key: string]: Style;
 *   fontFaces: {[key: string]: FontFaceDefinition};
 *   global: {[key: string]: Style};
 *   variants: {[key: string]: Style};
 * }} Styles A Styles object contains StyleDefinitions, and may optionally organize StyleDefinitions under the `global` and `variants` properties.  Font faces can be optionally specified under the `fontFaces` property.
 */

/**
 * Creates a valid Styles object by deepmerging with the provided styles.
 *
 * Does not mutate the provided styles.
 * Merges the Typography styles and variants into the main Styles object.
 *
 * @param {Partial<Styles>} styles
 * @param {Styles} typography
 * @returns {Styles}
 */
const createStyles = (styles = {}, typography = createTypography()) =>
  merge({
    ...typography,
    variants: {
      [TEXT_VARIANT_KEY]: typography.variants,
    },
  })(styles);
