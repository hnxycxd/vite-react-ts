// import { useRef } from 'react';

const urlMap: Record<string, string[]> = {
  isIndex: ['/'],
  isList: ['/list'],
  isDemo: ['/demo'],
  isChart: ['/chart'],
};

export const getPageName = (() => {
  const cache: Record<string, boolean> = {};
  let prevPathname = '';
  return function _getPageName() {
    const pathname = window.location.pathname;
    if (prevPathname === pathname && pathname) {
      return cache;
    }
    prevPathname = pathname;
    for (const key in urlMap) {
      cache[key] = urlMap[key].includes(pathname);
    }
    return cache;
  };
})();
