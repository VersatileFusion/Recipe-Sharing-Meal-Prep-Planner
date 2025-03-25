const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validate, recipeValidationRules } = require('../middleware/validate');
const upload = require('../middleware/upload');
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleLike,
  addComment
} = require('../controllers/recipeController');

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search recipes by title or description
 *       - in: query
 *         name: dietaryTags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [vegetarian, vegan, gluten-free, dairy-free, low-carb, keto, paleo]
 *         description: Filter recipes by dietary tags
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter recipes by difficulty level
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get('/', getRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', getRecipeById);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - ingredients
 *               - instructions
 *               - prepTime
 *               - cookTime
 *               - servings
 *               - difficulty
 *               - calories
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     unit:
 *                       type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               prepTime:
 *                 type: integer
 *               cookTime:
 *                 type: integer
 *               servings:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               calories:
 *                 type: integer
 *               dietaryTags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [vegetarian, vegan, gluten-free, dairy-free, low-carb, keto, paleo]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 */
router.post('/', protect, upload.single('image'), recipeValidationRules.create, validate, createRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     unit:
 *                       type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               prepTime:
 *                 type: integer
 *               cookTime:
 *                 type: integer
 *               servings:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               calories:
 *                 type: integer
 *               dietaryTags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [vegetarian, vegan, gluten-free, dairy-free, low-carb, keto, paleo]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', protect, upload.single('image'), recipeValidationRules.update, validate, updateRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', protect, deleteRecipe);

/**
 * @swagger
 * /api/recipes/{id}/like:
 *   put:
 *     summary: Toggle like status of a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Recipe not found
 */
router.put('/:id/like', protect, toggleLike);

/**
 * @swagger
 * /api/recipes/{id}/comments:
 *   post:
 *     summary: Add a comment to a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Recipe not found
 */
router.post('/:id/comments', protect, addComment);

module.exports = router; 