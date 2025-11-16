export const isAnagram = (a: string, b: string): boolean => {
  const cleanA = a.replace(/\s/g, "").toLowerCase();
  const cleanB = b.replace(/\s/g, "").toLowerCase();

  if (cleanA.length !== cleanB.length) {
    return false;
  }

  const sortedA = cleanA.split("").sort().join("");
  const sortedB = cleanB.split("").sort().join("");

  return sortedA === sortedB;
};
