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
      return;
    }
    if (key === "search") {
      //--------add name to search params----------------------------------------------------------------
      res.name = { $regex: params[key], $options: "i" };
      return;
    }
    if (key === "type" || key === "brand") {
      //-------- add type || brand to search params -----------------------------------------------------
      res[key] = { $in: params[key]?.split("-") };
      return;
    }
    //--------add options to search params----------------------------------------------------------------
    if (key === "options") {
      JSON.parse(params[key]).map(
        ({ name, value }) =>
          (res.params = {
            $elemMatch: { name, value: { $in: value?.split("-") } },
          })
      );
    } else {
      return;
    }
  });

  return res;
};

module.exports = searchParams;
