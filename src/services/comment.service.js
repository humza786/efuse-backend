const httpStatus = require('http-status');
const postService = require('./post.service');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */
const createComment = async (commentBody) => {
  if (!commentBody) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Content cannot be empty');
  }
  const post = await postService.getPostById(commentBody.post);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const comment = await Comment.create(commentBody);
  await post.updateOne({ $push: { comments: comment._id } });
  return comment;
};

/**
 * Get comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  return Comment.findById(id).populate('user');
};

/**
 * Update comment by id
 * @param {ObjectId} commentId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

/**
 * Update comment likes
 * @param {ObjectId} commentId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentLikes = async (commentId, updateBody) => {
  const comment = await Comment.findByIdAndUpdate(commentId, {
    $inc: { likes: updateBody.action === 'like' ? 1 : -1 },
  }).exec();
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  return comment;
};

/**
 * Delete comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.remove();
  return comment;
};

module.exports = {
  createComment,
  updateCommentById,
  deleteCommentById,
  updateCommentLikes,
};
