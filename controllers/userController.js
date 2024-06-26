const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const axios = require("axios");
// const sendEmail = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from input
  user.password = undefined;

  res.status(statusCode).json({
    status: "Succcess",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Extract the address from the request body
  const { userLocation, ...restOfData } = req.body;
  const { address } = userLocation;

  try {
    console.log(userLocation);
    console.log(process.env.GOOGLE_API_KEY);
    // Convert address to latitude and longitude using Google Maps Geocoding API
    const geocodingResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        userLocation
      )}&key=${process.env.GOOGLE_API_KEY}`
    );

    // Extract latitude and longitude from the response
    const { results } = geocodingResponse.data;
    const { lat, lng } = results[0].geometry.location;

    // Update userLocation object with new coordinates
    const updatedUserLocation = {
      type: "Point",
      coordinates: [lng, lat], // Note: Longitude comes first
      address: address,
    };

    // Combine updated userLocation with the rest of the data
    const updatedData = {
      ...restOfData,
      userLocation: updatedUserLocation,
    };

    // Create new user with updated data
    const newUser = await User.create(updatedData);
    createSendToken(newUser, 201, res);
  } catch (error) {
    // Handle error
    console.error("Error converting address:", error);
    // Send error response
    res.status(400).json({
      status: "fail",
      message: "Error converting address to coordinates",
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exist and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3) if everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!. Please login", 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  console.log(currentUser);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist", 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  //-- Broken
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }

  // GRANT ACCESS TO USER
  req.user = currentUser;
  next();
});
