export {
  // components
  Element,
  Icon,
  Layout,
  Text,
  // context
  useIcon,
  useStyles,
  useThemes,
  // utils
  createTheme,
  createStyles,
  createTypography,
  merge,
};

function Element(props: ElementProps): JSX.Element;

function Icon(props: IconProps): JSX.Element;

function Layout(props: LayoutProps): JSX.Element;

function Text(props: TextProps): JSX.Element;

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type StyleProps = Record<string, any>;

type StyleObject = Record<string, any>;

type StyleRule = (styleProps: StyleProps) => StyleObject;

type Style = StyleObject | StyleRule;

type Styles = Style | Style[] | null;

interface ElementProps extends React.Props {
  /** renders into the equivalent HTML Element via nodeName */
  as?: string;
  /** accepts singleton or arrays of StyleObject/StyleRule/null */
  styles?: Styles;
  /** provides the style props that are applied on style rules */
  styleProps?: StyleProps;
  /** will apply styles defined in Provider.styles.variant */
  variant?: string;
  [propName]: any;
}

interface IconProps extends ElementProps {
  /** will use the SVG icon defined in Provider.icons */
  icon: string;
  /** Sets the color of the icon (any valid theme color key) */
  color?: string;
  /** Sets the height of the icon (any valid theme color key) */
  height?: any;
  /** Sets the height and width of the icon (any valid theme size key) */
  size?: any;
  /** Sets the width of the icon (any valid theme size key) */
  width?: any;
}

interface LayoutProps extends ElementProps {
  /** sets the align-items CSS property */
  align?: string;
  /** sets the align-self CSS property */
  alignSelf?: string;
  /** sets the flex-direction CSS property */
  direction?: string;
  /** sets the flex CSS property */
  flex?: string;
  /** if true, sets the display to "inline-flex" instead of "flex" */
  inline?: boolean;
  /** sets the justify-content CSS property */
  justify?: boolean;
  /** sets the justify-self CSS property */
  justifySelf?: boolean;
  /** sets the margin-right spacing of children under Layout(any valid theme spacing key) */
  spacing?: any;
  /** when "wrap" prop is true, this sets the margin-top spacing of children under Layout (any valid theme spacing key) */
  wrapSpacing?: any;
  /** sets the "wrap" value for the flex-wrap CSS property */
  wrap?: boolean;
}

interface TextProps extends ElementProps {}
