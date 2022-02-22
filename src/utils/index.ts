export { getPageName } from './getPageName';

export function CN(len = 1) {
  let _rsl = '';
  while (len) {
    let _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
    eval('_rsl+=' + '"\\u' + _randomUniCode + '"');
    len--;
  }
  return _rsl;
}
