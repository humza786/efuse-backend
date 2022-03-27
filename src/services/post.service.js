const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  if (!postBody) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Content cannot be empty');
  }
  return Post.create(postBody);
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, { populate: 'user,comments.user', ...options });
  return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return Post.findById(id);
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

/**
 * Update post likes
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostLikes = async (postId, updateBody) => {
  const post = await Post.findByIdAndUpdate(postId, { $inc: { likes: updateBody.action === 'like' ? 1 : -1 } }).exec();
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  updatePostLikes,
  deletePostById,
};
