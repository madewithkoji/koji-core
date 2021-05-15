// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get

interface GetInput {
  [index: string]: any;
}

export const get = (
  obj: GetInput = {},
  path: string[],
  defaultValue: any = undefined,
) => {
  const travel = (regexp: RegExp) => (
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      )
  );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};
