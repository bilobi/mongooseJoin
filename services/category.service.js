const db = require("../models");
const mongoose = require("mongoose");
require("../mongo")
  .connect()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

function postVariant(rq, res) {
  const variant = new db.Variant({
    ...rq.body,
  });
  variant.save(function (err) {
    if (err) res.json(err);

    db.Product.findById(variant.product).then((prod) => {
      product = new db.Product(prod);
      product.variants.push(variant._id);

      db.Product.findByIdAndUpdate(product._id, product).then((result) => {
        console.log(result);
        res.json(variant);
      });
    });
  });
}

function postProduct(rq, res) {
  const prod = new db.Product({
    ...rq.body,
  });
  prod.save((err) => {
    if (err) res.json(err);

    db.Category.findById(prod.category).then((category) => {
      cat = new db.Category(category);
      cat.products.push(prod._id);

      db.Category.findByIdAndUpdate(cat._id, cat).then((categ) => {
        console.log(categ);
        res.json(prod);
      });
    });
  });
}

function postCategory(rq, res) {
  const category = new db.Category({
    ...rq.body,
  });

  category.save(function (err) {
    if (err) res.json(err);
    res.json(category);
  });
}

function putCategory(rq, res) {
  res.send("put");
}

function getVariants(rq, res) {
  db.Variant.find({})
    .populate({ path: "product", select: "_id title" })
    .populate({ path: "category", select: "_id title" })
    .then(function (dbProduct) {
      res.json(dbProduct);
    })
    .catch(function (err) {
      res.json(err);
    });
}

function getCategories(rq, res) {
  db.Category.find({})
    .populate({
      path: "products",
      select: "_id title",
      populate: { path: "variants", select: "_id title",},
    })
    .then(function (dbCategory) {
      res.json(dbCategory);
    })
    .catch(function (err) {
      res.json(err);
    });
}

module.exports = {
  postCategory,
  postProduct,
  postVariant,
  putCategory,
  getCategories,
  getVariants,
};
