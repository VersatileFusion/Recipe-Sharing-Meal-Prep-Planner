const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Recipe validation rules
const recipeValidationRules = {
  create: [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('ingredients').isArray().withMessage('Ingredients must be an array'),
    body('ingredients.*.name').trim().notEmpty().withMessage('Ingredient name is required'),
    body('ingredients.*.amount').isNumeric().withMessage('Amount must be a number'),
    body('ingredients.*.unit').trim().notEmpty().withMessage('Unit is required'),
    body('instructions').isArray().withMessage('Instructions must be an array'),
    body('instructions.*').trim().notEmpty().withMessage('Instruction cannot be empty'),
    body('prepTime').isInt({ min: 0 }).withMessage('Prep time must be a positive number'),
    body('cookTime').isInt({ min: 0 }).withMessage('Cook time must be a positive number'),
    body('servings').isInt({ min: 1 }).withMessage('Servings must be at least 1'),
    body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
    body('calories').isInt({ min: 0 }).withMessage('Calories must be a positive number'),
    body('dietaryTags').isArray().withMessage('Dietary tags must be an array'),
    body('dietaryTags.*').isIn(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'low-carb', 'keto', 'paleo'])
      .withMessage('Invalid dietary tag')
  ],
  update: [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
    body('instructions').optional().isArray().withMessage('Instructions must be an array'),
    body('prepTime').optional().isInt({ min: 0 }).withMessage('Prep time must be a positive number'),
    body('cookTime').optional().isInt({ min: 0 }).withMessage('Cook time must be a positive number'),
    body('servings').optional().isInt({ min: 1 }).withMessage('Servings must be at least 1'),
    body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
    body('calories').optional().isInt({ min: 0 }).withMessage('Calories must be a positive number'),
    body('dietaryTags').optional().isArray().withMessage('Dietary tags must be an array')
  ]
};

// Meal plan validation rules
const mealPlanValidationRules = {
  create: [
    body('weekStartDate').isISO8601().withMessage('Invalid date format'),
    body('meals').isArray().withMessage('Meals must be an array'),
    body('meals.*.day').isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
      .withMessage('Invalid day of the week'),
    body('meals.*.type').isIn(['breakfast', 'lunch', 'dinner', 'snack'])
      .withMessage('Invalid meal type'),
    body('meals.*.recipeId').isMongoId().withMessage('Invalid recipe ID'),
    body('dietaryPreferences').isArray().withMessage('Dietary preferences must be an array'),
    body('budget').isFloat({ min: 0 }).withMessage('Budget must be a positive number')
  ],
  update: [
    body('weekStartDate').optional().isISO8601().withMessage('Invalid date format'),
    body('meals').optional().isArray().withMessage('Meals must be an array'),
    body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a positive number')
  ]
};

// User validation rules
const userValidationRules = {
  register: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter'),
    body('dietaryPreferences').isArray().withMessage('Dietary preferences must be an array')
  ],
  login: [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

module.exports = {
  validate,
  recipeValidationRules,
  mealPlanValidationRules,
  userValidationRules
}; 