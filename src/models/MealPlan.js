const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weekStartDate: {
    type: Date,
    required: true
  },
  meals: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    },
    notes: String
  }],
  totalCalories: {
    type: Number,
    required: true,
    min: 0
  },
  dietaryPreferences: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'keto', 'paleo', 'gluten-free', 'dairy-free']
  }],
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  shoppingList: [{
    ingredient: {
      name: String,
      amount: Number,
      unit: String
    },
    purchased: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Index for quick user meal plan retrieval
mealPlanSchema.index({ user: 1, weekStartDate: 1 });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan; 