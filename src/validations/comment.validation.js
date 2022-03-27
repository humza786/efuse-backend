const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    post: Joi.required().custom(objectId),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string(),
    })
    .min(1),
};

const updateCommentLikes = {
  params: Joi.object().keys({
    commentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      action: Joi.string().valid('like', 'unlike'),
    })
    .min(1),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  updateComment,
  updateCommentLikes,
  deleteComment,
};
