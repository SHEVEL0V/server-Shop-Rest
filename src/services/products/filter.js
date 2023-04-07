/** @format */

const types = (data) => {
  return [...new Set(data.map((item) => item.type))];
};

const brands = (data) => {
  return [...new Set(data.map((item) => item.brand))];
};

const params = (products) => {
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

  return Object.keys(options).map((key) => ({
    name: key,
    value: options[key],
  }));
};

export const filter = { types, params, brands };
