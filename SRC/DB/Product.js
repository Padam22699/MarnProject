// products
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  compnay: String,
});
module.exports = mongoose.model("products", ProductSchema);
