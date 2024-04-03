const express = require("express");
const commentController = require("./../controllers/commentController");
const userController = require("./../controllers/userController");

const router = express.Router({ mergeParams: true });

router.route("/createcomment").post(
  // reviewController.setTourUserIds,
  // userController.protect,
  commentController.createComment
);

// router.route("/:id").get(reviewController.getReview);

module.exports = router;
