/** @format */

const searchParams = (params) => {
  const res = {};

  Object.keys(params).forEach(async (key) => {
    //-------------not add to search params---------------------------------------------------------------
    if (key === "page" || key === "limit" || key === "sort") {
      return;
    }
    if (key === "price") {
      //--------add price to search params----------------------------------------------------------------
      res[key] = {
        $gte: Number(params[key]?.split("-")[0]),
        $lte: Number(params[key]?.split("-")[1]),
      };
    }
    if (key === "name") {
      //--------add name to search params----------------------------------------------------------------
      res[key] = { $regex: params[key], $options: "i" };
    }
    if (key === "type" || key === "brand") {
      //-------- add type || brand to search params -----------------------------------------------------
      res[key] = { $in: params[key]?.split("-") };
    } else {
      //-------- add params to search params-------------------------------------------------------------
      res.params = {
        $elemMatch: { name: key, value: { $in: params[key]?.split("-") } },
      };
    }
  });

  return res;
};

module.exports = searchParams;