export function getDeps(code: string) {
  return [
    ...(code.match(/from '([^']+)'(;)?(\r)?\n/g) || []),
    ...(code.match(/from "([^"]+)"(;)?(\r)?\n/g) || []),
  ]
    .map((v) => {
      let dep = '';
      if (v.includes("'")) {
        dep = v.split("'")[1];
      } else if (v.includes('"')) {
        dep = v.split('"')[1];
      }
      if (dep.includes('/') && !dep.startsWith('@')) {
        dep = dep.split('/')[0];
      }
      return dep;
    })
    .filter((dep) => dep !== '')
    .reduce((prevV: any, dep: string) => {
      prevV[dep] = 'latest';
      return prevV;
    }, {});
}
