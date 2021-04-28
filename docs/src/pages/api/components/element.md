## `Element`

> TODO: add details

### API

```ts
function Element(props: ElementProps): JSX.Element;

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
```

### Use

```js
import { Element } from 'uinix-ui';

const styles = {
  active: ({ isActive }) => ({
    backgroundColor: isActive ? 'brand.active' : 'white',
    color: isActive ? 'white' : 'brand.light',
  }),
  button: {
    cursor: 'pointer',
    outline: 'none',
  },
}

const MyElement = ({ isSelected }) => {
  return (
    <Element
      as="button" // render as specified HTML element
      px="m" // shorthand style props
      py="xxs"
      styleProps={{ isActive: isSelected }} // style props for style rules
      styles={[styles.active, styles.button]} // compose multiple styles
      onClick={console.log}
    />
  );
}
```
