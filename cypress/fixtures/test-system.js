import {createElement} from 'react';
import themeSpec from 'uinix-theme-spec';

const icon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

export default {
  config: {
    createElement,
  },
  icons: {
    x: icon,
    nested: {
      x: icon,
    },
    'a.b.c': icon,
  },
  globalStyles: {
    h1: {
      fontSize: '42px',
    },
  },
  styles: {
    rules: {
      red: {
        color: 'rgb(255, 0, 0)',
      },
    },
    Button: {
      primary: {
        color: 'rgb(0, 0, 255)',
        ':focus': {
          opacity: '0.7',
          color: 'rgb(0, 0, 125)',
        },
      },
    },
    Card: {
      small: {
        padding: '4px',
      },
    },
    Icon: {
      disabled: {
        opacity: '0.3',
      },
    },
    Heading: {
      1: {
        color: 'rgb(0, 0, 255)',
        fontSize: '32px',
        fontWeight: '700',
      },
    },
    Small: {
      fontSize: '10px',
    },
  },
  theme: {
    colors: {
      palette: {
        red0: '#330000',
        red1: '#aa0000',
        red2: '#bb0000',
      },
      brand: {
        primary: 'blue',
        active: 'purple',
      },
    },
    fontFamilies: {
      body: 'arial',
      heading: 'impact',
    },
    fontSizes: {
      xs: 12,
      s: 16,
      m: 20,
      l: 32,
      xl: 40,
    },
    keyframes: {
      flicker: {
        '0%': {
          opacity: '0',
        },
        '50%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
    },
    spacings: {
      xs: 4,
      s: 8,
      m: 16,
      l: 32,
      xl: 64,
      scale: {
        4: 16,
      },
    },
    sizes: {
      icon: {
        s: 16,
        m: 24,
        l: 32,
      },
    },
    transforms: {
      rotate0: 'rotate(0deg)',
      rotate180: 'rotate(180deg)',
      scaleHalf: 'scale(0.5)',
      translateXHalf: 'translateX(50%)',
    },
    transitions: {
      all: {
        fast: 'all 0.3s ease-in-out',
        default: 'all 0.7s ease-in-out',
        slow: 'all 1s ease-in-out',
      },
      opacity: {
        fast: 'opacity 0.3s ease-in-out',
        default: 'opacity 0.5s ease-in-out',
        slow: 'opacity 1s ease-in-out',
      },
    },
  },
  themeSpec,
};
