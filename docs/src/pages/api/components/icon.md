## `Icon`

`Icon` is composed from [`Element`](./element).

> TODO: add details

### API

```ts
function Icon(props: IconProps): JSX.Element;

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

```

### Use

Ensure the SVG icon is defined in `icons` that is passed to the `Provider`.

```js
import { Icon } from 'uinix-ui';

const styles = {
  disabled: ({ disabled }) => ({
    pointerEvents: disabled ? 'none' : undefined,
    opacity: disabled ? 'disabled' : 'visible',
  }),
}

const BackButton = ({ disabled }) => {
  return (
    <Icon
      color="brand.primary"
      icon="back"
      size="icon.m" // sets the icon's height and width to the specified theme value
      styleProps={{ disabled }} // style props for style rules
      styles={styles.disabled}
      onClick={console.log}
    />
  );
}
```
