const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const commentValidation = require('../validations/comment.validation');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router.route('/').post(auth(), validate(commentValidation.createComment), commentController.createComment);

router
  .route('/:commentId')
  .patch(auth(), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth(), validate(commentValidation.deleteComment), commentController.deleteComment);

router
  .route('/:commentId/likes')
  .post(auth(), validate(commentValidation.updateCommentLikes), commentController.updateCommentLikes);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments management
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a Comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post
 *               - content
 *             properties:
 *               post:
 *                 type: string
 *               content:
 *                 type: string
 *             example:
 *               post: 6240048c53cb255c81f26ffd
 *               content: content of comment
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: content of post
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: content id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /comments/{id}/likes:
 *   post:
 *     summary: Like or unlike a Comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string(like/unlike)
 *             example:
 *               action: like
 *     responses:
 *       "201":
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
