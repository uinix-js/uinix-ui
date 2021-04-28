import { useEffect, useState } from 'react';

// TODO: hacky way to get css-in-js (fela) loaded
export const useIsReady = (ms = 100) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeout;
    const isCssReady = document.querySelector('style[data-fela-type="STATIC"]');
    if (isCssReady) {
      setIsReady(true);
    } else {
      timeout = setTimeout(() => setIsReady(true));
    }
    return () => clearTimeout(timeout);
  }, [ms]);

  return isReady;
};
