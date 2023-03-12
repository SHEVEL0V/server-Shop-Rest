/** @format */

const searchOptions = ({ type, price, search, brand }) => {
  //--------brand search options--------//
  const findBrand = brand ? { brand: { $in: brand?.split("-") } } : undefined;
  //--------type search options--------//
  const findType = type ? { type: { $in: type?.split("-") } } : undefined;
  //--------name search options--------//
  const findName = search
    ? { name: { $regex: search, $options: "i" } }
    : undefined;
  //--------price search options--------//
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

module.exports = searchOptions;
