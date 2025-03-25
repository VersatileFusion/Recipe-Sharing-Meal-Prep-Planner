const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

// @desc    Get user's meal plans
// @route   GET /api/meal-plans
// @access  Private
const getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user._id })
      .populate('meals.recipe')
      .sort({ weekStartDate: -1 });

    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single meal plan
// @route   GET /api/meal-plans/:id
// @access  Private
const getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id)
      .populate('meals.recipe');

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Check if user owns the meal plan
    if (mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create meal plan
// @route   POST /api/meal-plans
// @access  Private
const createMealPlan = async (req, res) => {
  try {
    const { weekStartDate, meals, dietaryPreferences, budget } = req.body;

    // Calculate total calories from recipes
    const recipeIds = meals.map(meal => meal.recipe);
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });
    
    const totalCalories = recipes.reduce((sum, recipe) => sum + recipe.calories, 0);

    const mealPlan = await MealPlan.create({
      user: req.user._id,
      weekStartDate,
      meals,
      dietaryPreferences,
      budget,
      totalCalories,
      shoppingList: generateShoppingList(recipes)
    });

    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update meal plan
// @route   PUT /api/meal-plans/:id
// @access  Private
const updateMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Check if user owns the meal plan
    if (mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('meals.recipe');

    res.json(updatedMealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete meal plan
// @route   DELETE /api/meal-plans/:id
// @access  Private
const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Check if user owns the meal plan
    if (mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await mealPlan.deleteOne();
    res.json({ message: 'Meal plan removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update shopping list item status
// @route   PUT /api/meal-plans/:id/shopping-list/:itemId
// @access  Private
const updateShoppingListItem = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Check if user owns the meal plan
    if (mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const item = mealPlan.shoppingList.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Shopping list item not found' });
    }

    item.purchased = !item.purchased;
    await mealPlan.save();

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to generate shopping list from recipes
const generateShoppingList = (recipes) => {
  const shoppingList = {};
  
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const key = `${ingredient.name}-${ingredient.unit}`;
      if (shoppingList[key]) {
        shoppingList[key].amount += ingredient.amount;
      } else {
        shoppingList[key] = {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit
        };
      }
    });
  });

  return Object.values(shoppingList);
};

module.exports = {
  getMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
  updateShoppingListItem,
}; 