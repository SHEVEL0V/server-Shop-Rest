/** @format */
const Product = require("../../db/schema/product");

const getListProduct = async function (req, res, next) {
  const { limit, page, type, price, search, brand, sort } = req.query;

  const query = () => {
    const findBrand = brand ? { brand: { $in: brand?.split("-") } } : undefined;
    const findType = type ? { type: { $in: type?.split("-") } } : undefined;
    const findName = search
      ? { name: { $regex: search, $options: "i" } }
      : undefined;
    const findPrice = price
      ? {
          price: {
            $gte: Number(price?.split("-")[0]),
            $lte: Number(price?.split("-")[1]),
          },
        }
      : undefined;

    return { ...findBrand, ...findType, ...findName, ...findPrice };
  };

  const sortQuery = () => {
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

  const products = await Product.find(query())
    .sort(sortQuery())
    .skip(page ? limit * (page - 1) : null)
    .limit(limit);

  const count = await Product.countDocuments(query());

  res.json({ products, count });
};

module.exports = getListProduct;
