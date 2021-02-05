export const truncate = (string: string, n: number) => {
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
};

export function isObjectValid(obj: object) {
  return !!obj && Object.keys(obj).length > 0;
}
