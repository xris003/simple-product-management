const Comment = require("./../models/commentModel");
const catchAsync = require("./../utils/catchAsync");
// const factory = require('./handlerFactory');

// exports.setTourUserIds = (req, res, next) => {
//   // Allow nested route
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

// exports.getAllReviews = factory.getAll(Review);
// exports.getReview = factory.getOne(Review);

// exports.getOne = (Model, popOptions) =>
//   catchAsync(async (req, res, next) => {
//     let query = Model.findById(req.params.id);
//     if (popOptions) query = query.populate(popOptions);
//     const doc = await query;
//     //const doc = await Model.findById(req.params.id).populate('reviews');

//     if (!doc) {
//       return next(new AppError('No document with id', 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: doc,
//       },
//     });
//   });

exports.createComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.create(req.body);

  if (!comment) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing required parameters" });
  }

  res.status(201).json({
    status: "success",
    data: {
      data: comment,
    },
  });
});
