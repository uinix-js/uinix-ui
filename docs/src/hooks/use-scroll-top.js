import { useEffect, useState } from 'react';

export const useScrollTop = () => {
  const [canScrollTop, setCanScrollTop] = useState(false);

  const scrollTop = () => {
    if (canScrollTop) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setCanScrollTop(document.documentElement.scrollTop > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [canScrollTop, scrollTop];
};
