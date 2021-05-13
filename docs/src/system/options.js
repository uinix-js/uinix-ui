import styles from './styles.js';

const elementStyles = [
  ({disabled}) => (disabled ? styles.disabled : null),
  styles.interactive,
];

const globalStyles = {
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    scrollBehavior: 'smooth',
  },
  'a:hover': {
    // TODO: https://github.com/robinweser/fela/issues/876
    opacity: 'interactive',
  },
  body: {
    margin: 0,
    padding: 0,
  },
  blockquote: {
    borderLeft: 'bordered',
    borderWidth: 'l',
    fontSize: 'l',
    fontStyle: 'italic',
    margin: 0,
    padding: 0,
    paddingLeft: 'm',
  },
  hr: {
    borderBottom: 'bordered',
    borderTop: 'none',
    margin: 0,
    width: '100%',
  },
};

const shorthandPropsMapping = {
  backgroundColor: ['bg'],
  borderRadius: ['borderRadius'],
  border: ['b'],
  borderBottom: ['bb', 'by', 'b'],
  borderLeft: ['bl', 'bx', 'b'],
  borderRight: ['br', 'bx', 'b'],
  borderTop: ['bt', 'by', 'b'],
  boxShadow: ['boxShadow'],
  color: ['color'],
  flex: ['flex'],
  height: ['h'],
  width: ['w'],
  margin: ['m'],
  marginBottom: ['mb', 'my', 'm'],
  marginLeft: ['ml', 'mx', 'm'],
  marginRight: ['mr', 'mx', 'm'],
  marginTop: ['mt', 'my', 'm'],
  padding: ['p'],
  paddingBottom: ['pb', 'py', 'p'],
  paddingLeft: ['pl', 'px', 'p'],
  paddingRight: ['pr', 'px', 'p'],
  paddingTop: ['pt', 'py', 'p'],
  position: ['position'],
  bottom: ['bottom'],
  left: ['left'],
  right: ['right'],
  top: ['top'],
  zIndex: ['z'],
};

const options = {
  elementStyles,
  shorthandPropsMapping,
  globalStyles,
  responsiveAttributes: ['color'],
  responsiveBreakpoints: ['480px', '768px'],
};

export default options;
