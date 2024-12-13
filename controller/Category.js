const model = require("../model/Brand");
const Brand = model.Brand;

exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};
