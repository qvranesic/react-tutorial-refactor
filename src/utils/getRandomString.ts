const getRandomString = (radix = 36) => {
  return Math.random()
    .toString(radix)
    .replace(/[^a-z]+/g, "");
};

export { getRandomString };
