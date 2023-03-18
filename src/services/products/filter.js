/** @format */

const filterTypes = (data) => {
  return [...new Set(data.map((item) => item.type))];
};

const filterBrands = (data) => {
  return [...new Set(data.map((item) => item.brand))];
};

const filterParams = (products) => {
  const options = {};
  products.map((product) => {
    product.params.map(({ name, value }) => {
      if (name) {
        options[name]
          ? (options[name] = [...new Set([...options[name], value])])
          : (options[name] = [value]);
      }
    });
  });

  return options;
};

module.exports = { filterTypes, filterParams, filterBrands };
