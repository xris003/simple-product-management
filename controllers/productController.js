const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

exports.uploadProduct = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing user ID" });
  }

  // Add userId to the req.body
  req.body.user = userId;

  // Create the product with userId included
  const product = await Product.create(req.body);

  if (!product || !userId) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing required parameters" });
  }

  res.status(201).json({
    status: "success",
    data: {
      data: product,
    },
  });
});

exports.productAroundUser = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng)
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat, lng",
        400
      )
    );

  //console.log(distance, lat, lng, unit);
  const products = await Product.find({
    productLocation: { $geoWithin: { $centerSphere: [[lat, lng], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});
