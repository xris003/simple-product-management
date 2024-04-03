const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Product must have a name"],
  },
  image: {
    type: String,
    // required: [true, "A Product must have an image"]
  },
  productLocation: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

productSchema.index({ productLocation: "2dsphere" });

productSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

//Virtual Populate
productSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
