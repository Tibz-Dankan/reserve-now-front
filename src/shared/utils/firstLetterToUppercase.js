export const firstLetterToUppercase = (word) => {
  if (typeof word !== "string" || word.length === 0) {
    throw new Error("Input must be a non-empty string");
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};
