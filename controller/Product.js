const model = require("../model/Product");
const Product = model.Product;

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  console.log(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {

  let condition = {}
  console.log(req.query.admin)
  if(!req.query.admin){
      condition.deleted = {$ne:true}
  }
  console.log(condition)
  let query = Product.find(condition);
  let totalProductQuery = Product.find(condition);

  //Filter-Category
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductQuery = totalProductQuery.find({
      category: req.query.category,
    });
  }
  //Filter-Brand
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductQuery = totalProductQuery.find({ brand: req.query.brand });
  }

  //TODO:How to get sort on discounted Price not on actual price
  //Sorting

  if (req.query._sort && req.query._order ) {
    query = query.sort({[req.query._sort]:req.query._order});
  }
  const totalDocs = await totalProductQuery.countDocuments().exec();
  console.log({ totalDocs });

  //Pagination
  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

 
  try {
    const docs = await query.exec();
    res.set("X-Total-Count",totalDocs)
    res.status(200).json(docs);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};



exports.fetchProductById = async (req, res) => {
 const {id}=req.params
  try {
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};


exports.updateProduct = async (req, res) => {
  const {id}=req.params
   try {
     const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
     res.status(201).json(product);
   } catch (err) {
     console.error({ err });
     res.status(400).json(err);
   }
 };

