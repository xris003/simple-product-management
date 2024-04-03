const mongoose = require("mongoose");
// const Product = require("./productModel");
//const slugify = require('slugify');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "A product must have a comment"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
  },
  // To visualize properties that are not stored in the DB but are calculated using some other values when it has an output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.index({ product: 1, user: 1 }, { unique: true });

// commentSchema.pre(/^find/, function (next) {
//   // this.populate({
//   //   select: 'name',
//   // }).populate({
//   //   path: 'user',
//   //   select: 'name photo',
//   // });

//   this.populate({
//     path: 'user',
//     select: 'name photo',
//   });

//   next();
// });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
