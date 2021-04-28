## `Layout`

`Layout` is composed from [`Element`](./element).

> TODO: add details

### API

```ts
function Layout(props: LayoutProps): JSX.Element;

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


```

### Use

Easily create consistently theme-spaced layouts with `Layout`.

```js
import { Icon, Layout } from 'uinix-ui';

const BackButton = ({ disabled }) => {
  return (
    <Layout
      as="header"
      align="center"
      justify="space-between"
      px="l"
      py="s"
      spacing="m">
      <h1>Logo</h1>
      <Layout align="center" spacing="l">
        <Layout direction="column" spacing="xxs">
          <Icon icon="account" />
          <button>Account</button>
        </Layout>
        <button>Sign out</button>
      </Layout>
    </Layout>
  );
}
```
