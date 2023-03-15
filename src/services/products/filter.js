/** @format */

const filterOptions = (products) => {
  const options = {};
  products.map((product) => {
    product.options.map(({ name, value }) => {
      if (name) {
        options[name]
          ? (options[name] = [...new Set([...options[name], value])])
          : (options[name] = [value]);
      }
    });
  });

  return options;
};

module.exports = filterOptions;
