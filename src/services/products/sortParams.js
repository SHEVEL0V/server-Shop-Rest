/** @format */

const sortParams = (sort) => {
  if (sort === "min") {
    return { price: 1 };
  }
  if (sort === "max") {
    return { price: -1 };
  }
  if (sort === "new") {
    return { createdAt: -1 };
  }
  if (sort === "old") {
    return { createdAt: 1 };
  }
};

module.exports = sortParams;
