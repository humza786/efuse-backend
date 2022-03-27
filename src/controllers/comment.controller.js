const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment({ user: req.user, ...req.body });
  res.status(httpStatus.CREATED).send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(comment);
});

const updateCommentLikes = catchAsync(async (req, res) => {
  const action = pick(req.body, ['action']);
  const post = await commentService.updateCommentLikes(req.params.commentId, action);
  res.send(post);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  updateComment,
  updateCommentLikes,
  deleteComment,
};
