const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catgorySchema = new Schema({
  title: { type: String, required: true ,index: { unique: true }},
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const productSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  title: { type: String, required: true,index: { unique: true } },
  variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
});

const variantSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  title: { type: String, required: true ,index: { unique: true }},
});

const Variant = mongoose.model("Variant", variantSchema);
const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", catgorySchema);

module.exports = {
  Variant,
  Product,
  Category,
};
