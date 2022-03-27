const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    user: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      user: Joi.string(),
    })
    .min(1),
};

const updatePostLikes = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      action: Joi.string().valid('like', 'unlike'),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  updatePostLikes,
  deletePost,
};
