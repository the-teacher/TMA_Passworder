export const normalizeSpaces = (value: string): string => {
  return value.replace(/\s+/g, " ");
};

export const trimValue = (value: string): string => {
  return value.trim();
};
