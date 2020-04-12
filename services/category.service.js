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

postVariant = (rq, res) => {
  const variant = new db.Variant({
    ...rq.body
  })

  variant.save((err)=>{
    if (err) res.json(err);
      db.Product.findById(variant.product).then((product)=>{
        const prod=new db.Product(product)
        prod.variants.push(variant._id);
        db.Product.findByIdAndUpdate(product._id,prod)  
       .then((prod)=>{
         console.log(prod)
         res.status(200).json(variant);
       })
      }) 
  });
  /*
  const session = await  mongoose.startSession()
  session.startTransaction();
  try {
    const opts={session};
    const varSave=await db.Variant({...rq.body}).save(opts);
    // let product=await db.Product.findById(variant.product) 
    // product.variants.push(varSave._id);
    product= await db.Product.findByIdAndUpdate(product._id,{ $push:{varSave._id}},opts)  
    
    await session.commitTransaction();
    session.endSession();

    res.json(varSave);
    
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; 
    
  }*/
  // try {
  //   await variant.save((err) => {
  //       if (err) res.json(err);
  //       res.json(variant);     
  //     console.log("test1");   

  //      db.Product.findById(variant.product).then((prod) => {
  //       product = new db.Product(prod);
  //       product.variants.push(variant._id);

  //       db.Product.findByIdAndUpdate(product._id, product).then(
  //         (result) => {
  //           res.json(result);
  //         }
  //       )
  //     });
  //   });
  //     session.commitTransaction()
  // } catch (error) {
  //   console.log("test catch");   
  //   session.abortTransaction()
  //     res.json(error);
  // } finally{
  //   session.endSession()
  // }
};

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
    .then(function (dbVariant) {
      res.json(dbVariant);
    })
    .catch(function (err) {
      res.json(err);
    });
}

function getProducts(rq, res) {
  db.Product.find({})
    .populate({ path: "variants", select: "_id title" })
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
      populate: { path: "variants", select: "_id title" },
    })
    .then(function (dbCategory) {
      res.json(dbCategory);
    })
    .catch(function (err) {
      res.json(err);
    });
}

function checkFound(res, product) {
  if (!product) {
      res.status(404).json({
          status: false,
          message: 'Product not found!'
      });
      return;
  }
  return product;
}


function checkServerError(res, error) {
  if (error) {
      res.status(500).send(error);
      return error;
  }
}



module.exports = {
  postCategory,
  postProduct,
  postVariant,
  putCategory,
  getCategories,
  getProducts,
  getVariants,
};
