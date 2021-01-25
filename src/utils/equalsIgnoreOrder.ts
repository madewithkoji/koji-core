// https://www.30secondsofcode.org/blog/s/javascript-array-comparison

export const equalsIgnoreOrder = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);

  let equal = true;

  uniqueValues.forEach((v) => {
    const aCount = a.filter((e: any) => e === v).length;
    const bCount = b.filter((e: any) => e === v).length;
    if (aCount !== bCount) equal = false;
  });

  return equal;
};
