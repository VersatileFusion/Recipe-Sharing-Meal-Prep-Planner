const Recipe = require('../models/Recipe');
const cache = require('../middleware/cache');
const logger = require('../utils/logger');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
exports.getRecipes = async (req, res) => {
  try {
    const { search, dietaryTags, difficulty } = req.query;
    const query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by dietary tags
    if (dietaryTags) {
      const tags = dietaryTags.split(',');
      query.dietaryTags = { $in: tags };
    }

    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'name')
      .sort('-createdAt');

    res.json(recipes);
  } catch (error) {
    logger.error('Error in getRecipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.user', 'name');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    logger.error('Error in getRecipeById:', error);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
};

// @desc    Create recipe
// @route   POST /api/recipes
// @access  Private
exports.createRecipe = async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      author: req.user._id,
      image: req.file ? req.file.path : null
    };

    const recipe = await Recipe.create(recipeData);
    await recipe.populate('author', 'name');

    logger.info(`New recipe created: ${recipe._id}`);
    res.status(201).json(recipe);
  } catch (error) {
    logger.error('Error in createRecipe:', error);
    res.status(500).json({ message: 'Error creating recipe' });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user owns the recipe
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this recipe' });
    }

    const updateData = {
      ...req.body,
      image: req.file ? req.file.path : recipe.image
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name');

    logger.info(`Recipe updated: ${recipe._id}`);
    res.json(updatedRecipe);
  } catch (error) {
    logger.error('Error in updateRecipe:', error);
    res.status(500).json({ message: 'Error updating recipe' });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user owns the recipe
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this recipe' });
    }

    await recipe.remove();
    logger.info(`Recipe deleted: ${recipe._id}`);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    logger.error('Error in deleteRecipe:', error);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
};

// @desc    Toggle like status
// @route   PUT /api/recipes/:id/like
// @access  Private
exports.toggleLike = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const likeIndex = recipe.likes.indexOf(req.user._id);
    if (likeIndex === -1) {
      recipe.likes.push(req.user._id);
    } else {
      recipe.likes.splice(likeIndex, 1);
    }

    await recipe.save();
    logger.info(`Recipe like status toggled: ${recipe._id}`);
    res.json({ message: 'Like status updated successfully' });
  } catch (error) {
    logger.error('Error in toggleLike:', error);
    res.status(500).json({ message: 'Error updating like status' });
  }
};

// @desc    Add comment
// @route   POST /api/recipes/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    recipe.comments.push({
      text: req.body.text,
      user: req.user._id
    });

    await recipe.save();
    await recipe.populate('comments.user', 'name');

    logger.info(`Comment added to recipe: ${recipe._id}`);
    res.status(201).json(recipe);
  } catch (error) {
    logger.error('Error in addComment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleLike,
  addComment,
}; 