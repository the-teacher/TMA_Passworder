/**
 * Deep merge two objects
 * @param {Object} target - Target object to merge into
 * @param {Object} source - Source object to merge from
 * @returns {Object} Merged object
 */
export const mergeDeep = (target, source) => {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
};
