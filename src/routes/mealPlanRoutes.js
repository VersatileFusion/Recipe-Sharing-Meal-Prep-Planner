const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
  updateShoppingListItem,
} = require('../controllers/mealPlanController');

/**
 * @swagger
 * /api/meal-plans:
 *   get:
 *     summary: Get user's meal plans
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's meal plans
 */
router.get('/', protect, getMealPlans);

/**
 * @swagger
 * /api/meal-plans/{id}:
 *   get:
 *     summary: Get meal plan by ID
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal plan details
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Meal plan not found
 */
router.get('/:id', protect, getMealPlanById);

/**
 * @swagger
 * /api/meal-plans:
 *   post:
 *     summary: Create a new meal plan
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weekStartDate
 *               - meals
 *               - dietaryPreferences
 *               - budget
 *             properties:
 *               weekStartDate:
 *                 type: string
 *                 format: date
 *               meals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       enum: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
 *                     mealType:
 *                       type: string
 *                       enum: [breakfast, lunch, dinner, snack]
 *                     recipe:
 *                       type: string
 *                     notes:
 *                       type: string
 *               dietaryPreferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [vegetarian, vegan, keto, paleo, gluten-free, dairy-free]
 *               budget:
 *                 type: number
 *     responses:
 *       201:
 *         description: Meal plan created successfully
 */
router.post('/', protect, createMealPlan);

/**
 * @swagger
 * /api/meal-plans/{id}:
 *   put:
 *     summary: Update meal plan
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Meal plan updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Meal plan not found
 */
router.put('/:id', protect, updateMealPlan);

/**
 * @swagger
 * /api/meal-plans/{id}:
 *   delete:
 *     summary: Delete meal plan
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal plan deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Meal plan not found
 */
router.delete('/:id', protect, deleteMealPlan);

/**
 * @swagger
 * /api/meal-plans/{id}/shopping-list/{itemId}:
 *   put:
 *     summary: Update shopping list item status
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shopping list item status updated
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Meal plan or item not found
 */
router.put('/:id/shopping-list/:itemId', protect, updateShoppingListItem);

module.exports = router; 