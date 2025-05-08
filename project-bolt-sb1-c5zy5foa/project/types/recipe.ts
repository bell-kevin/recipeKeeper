export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  categories: string[];
  ingredients: Ingredient[];
  steps: string[];
  isFavorite: boolean;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

// Default categories that come with the app
export const defaultCategories: Category[] = [
  { id: 'breakfast', name: 'Breakfast', color: '#FDA4AF' },
  { id: 'lunch', name: 'Lunch', color: '#FCD34D' },
  { id: 'dinner', name: 'Dinner', color: '#60A5FA' },
  { id: 'dessert', name: 'Dessert', color: '#F9A8D4' },
  { id: 'snack', name: 'Snack', color: '#A3E635' },
  { id: 'beverage', name: 'Beverage', color: '#C4B5FD' },
  { id: 'vegetarian', name: 'Vegetarian', color: '#34D399' },
  { id: 'vegan', name: 'Vegan', color: '#6EE7B7' },
  { id: 'gluten-free', name: 'Gluten Free', color: '#FB923C' },
  { id: 'dairy-free', name: 'Dairy Free', color: '#A78BFA' },
];

// Sample recipes
export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Pancakes',
    description: 'Fluffy, golden pancakes perfect for breakfast.',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'easy',
    categories: ['breakfast'],
    ingredients: [
      { id: '1-1', name: 'All-purpose flour', quantity: 1.5, unit: 'cups' },
      { id: '1-2', name: 'Sugar', quantity: 3, unit: 'tbsp' },
      { id: '1-3', name: 'Baking powder', quantity: 1, unit: 'tbsp' },
      { id: '1-4', name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { id: '1-5', name: 'Milk', quantity: 1.25, unit: 'cups' },
      { id: '1-6', name: 'Egg', quantity: 1, unit: '' },
      { id: '1-7', name: 'Butter, melted', quantity: 3, unit: 'tbsp' },
    ],
    steps: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
      'In a separate bowl, whisk milk, egg, and melted butter until combined.',
      'Pour wet ingredients into dry ingredients and stir just until combined (batter will be lumpy).',
      'Heat a griddle or frying pan over medium heat. Pour 1/4 cup batter for each pancake.',
      'Cook until bubbles form on the surface, then flip and cook until golden brown on both sides.',
      'Serve warm with maple syrup, fresh fruit, or your favorite toppings.',
    ],
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Avocado Toast',
    description: 'Simple, nutritious avocado toast with a twist.',
    imageUrl: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: 'easy',
    categories: ['breakfast', 'vegetarian'],
    ingredients: [
      { id: '2-1', name: 'Bread slice', quantity: 1, unit: '' },
      { id: '2-2', name: 'Ripe avocado', quantity: 0.5, unit: '' },
      { id: '2-3', name: 'Cherry tomatoes', quantity: 5, unit: '' },
      { id: '2-4', name: 'Feta cheese', quantity: 2, unit: 'tbsp' },
      { id: '2-5', name: 'Red pepper flakes', quantity: 0.25, unit: 'tsp' },
      { id: '2-6', name: 'Lemon juice', quantity: 1, unit: 'tsp' },
      { id: '2-7', name: 'Salt and pepper', quantity: 1, unit: 'pinch' },
    ],
    steps: [
      'Toast bread until golden and crisp.',
      'In a small bowl, mash the avocado with lemon juice, salt, and pepper.',
      'Spread the avocado mixture on the toast.',
      'Slice cherry tomatoes in half and arrange on top of the avocado.',
      'Sprinkle with crumbled feta cheese and red pepper flakes.',
      'Add additional toppings like microgreens or a drizzle of olive oil if desired.',
    ],
    isFavorite: true,
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
  },
  {
    id: '3',
    title: 'Pasta Primavera',
    description: 'Light and fresh pasta loaded with spring vegetables.',
    imageUrl: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'medium',
    categories: ['dinner', 'vegetarian'],
    ingredients: [
      { id: '3-1', name: 'Fettuccine pasta', quantity: 8, unit: 'oz' },
      { id: '3-2', name: 'Asparagus, trimmed and cut', quantity: 1, unit: 'cup' },
      { id: '3-3', name: 'Broccoli florets', quantity: 1, unit: 'cup' },
      { id: '3-4', name: 'Cherry tomatoes, halved', quantity: 1, unit: 'cup' },
      { id: '3-5', name: 'Yellow squash, sliced', quantity: 1, unit: 'medium' },
      { id: '3-6', name: 'Garlic, minced', quantity: 2, unit: 'cloves' },
      { id: '3-7', name: 'Olive oil', quantity: 3, unit: 'tbsp' },
      { id: '3-8', name: 'Parmesan cheese, grated', quantity: 0.5, unit: 'cup' },
      { id: '3-9', name: 'Fresh basil, chopped', quantity: 0.25, unit: 'cup' },
      { id: '3-10', name: 'Salt and pepper', quantity: 1, unit: 'to taste' },
    ],
    steps: [
      'Cook pasta according to package directions. Reserve 1/2 cup pasta water before draining.',
      'In a large skillet, heat olive oil over medium heat. Add garlic and sauté for 30 seconds.',
      'Add broccoli and asparagus, cook for 3-4 minutes until bright green.',
      'Add squash and tomatoes, cook for another 2-3 minutes until vegetables are tender-crisp.',
      'Add drained pasta to the skillet with vegetables. Toss to combine.',
      'Add a splash of reserved pasta water if needed to loosen the sauce.',
      'Remove from heat and stir in Parmesan cheese and fresh basil.',
      'Season with salt and pepper to taste. Serve immediately with additional cheese if desired.',
    ],
    isFavorite: false,
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 172800000,
  },
  {
    id: '4',
    title: 'Beef Wellington',
    description: 'A luxurious and challenging dish featuring beef tenderloin wrapped in mushroom duxelles and puff pastry.',
    imageUrl: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg',
    prepTime: 60,
    cookTime: 45,
    servings: 6,
    difficulty: 'hard',
    categories: ['dinner'],
    ingredients: [
      { id: '4-1', name: 'Beef tenderloin', quantity: 2, unit: 'lbs' },
      { id: '4-2', name: 'Mushrooms, finely chopped', quantity: 1, unit: 'lb' },
      { id: '4-3', name: 'Prosciutto slices', quantity: 8, unit: 'slices' },
      { id: '4-4', name: 'Puff pastry', quantity: 1, unit: 'sheet' },
      { id: '4-5', name: 'Egg wash', quantity: 1, unit: 'large egg' },
      { id: '4-6', name: 'Dijon mustard', quantity: 2, unit: 'tbsp' },
      { id: '4-7', name: 'Shallots, minced', quantity: 2, unit: 'medium' },
      { id: '4-8', name: 'Garlic, minced', quantity: 3, unit: 'cloves' },
      { id: '4-9', name: 'Fresh thyme', quantity: 2, unit: 'sprigs' },
    ],
    steps: [
      'Sear the beef tenderloin on all sides until browned. Let it cool completely.',
      'Make mushroom duxelles: Cook mushrooms, shallots, and garlic until moisture evaporates.',
      'Lay out plastic wrap, arrange prosciutto in a rectangle, spread mushroom mixture.',
      'Brush cooled beef with mustard, place on prosciutto, and wrap tightly. Chill for 30 minutes.',
      'Roll out puff pastry, unwrap beef, and place on pastry. Wrap pastry around beef.',
      'Brush with egg wash, score the top in a decorative pattern.',
      'Bake at 400°F (200°C) for 40-45 minutes until pastry is golden and beef reaches desired temperature.',
      'Rest for 10 minutes before slicing and serving.',
    ],
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '5',
    title: 'Quinoa Buddha Bowl',
    description: 'A nourishing gluten-free and dairy-free bowl packed with protein and vegetables.',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: 'medium',
    categories: ['lunch', 'dinner', 'gluten-free', 'dairy-free', 'vegetarian'],
    ingredients: [
      { id: '5-1', name: 'Quinoa', quantity: 1, unit: 'cup' },
      { id: '5-2', name: 'Sweet potato, cubed', quantity: 1, unit: 'medium' },
      { id: '5-3', name: 'Chickpeas', quantity: 1, unit: 'can' },
      { id: '5-4', name: 'Kale, chopped', quantity: 2, unit: 'cups' },
      { id: '5-5', name: 'Avocado', quantity: 1, unit: 'medium' },
      { id: '5-6', name: 'Tahini', quantity: 2, unit: 'tbsp' },
      { id: '5-7', name: 'Lemon juice', quantity: 1, unit: 'tbsp' },
      { id: '5-8', name: 'Maple syrup', quantity: 1, unit: 'tsp' },
      { id: '5-9', name: 'Cumin', quantity: 1, unit: 'tsp' },
      { id: '5-10', name: 'Paprika', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      'Cook quinoa according to package instructions.',
      'Toss sweet potato cubes with olive oil, cumin, and paprika. Roast at 400°F for 20-25 minutes.',
      'Drain and rinse chickpeas, toss with olive oil and same spices. Roast for 15-20 minutes until crispy.',
      'Massage kale with olive oil and lemon juice until softened.',
      'Make dressing: Whisk together tahini, lemon juice, maple syrup, and water until smooth.',
      'Assemble bowls: Layer quinoa, roasted vegetables, chickpeas, and kale.',
      'Top with sliced avocado and drizzle with tahini dressing.',
      'Garnish with seeds or microgreens if desired.',
    ],
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '6',
    title: 'Almond Flour Chocolate Chip Cookies',
    description: 'Delicious gluten-free and dairy-free cookies that everyone will love.',
    imageUrl: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'easy',
    categories: ['dessert', 'gluten-free', 'dairy-free'],
    ingredients: [
      { id: '6-1', name: 'Almond flour', quantity: 2.5, unit: 'cups' },
      { id: '6-2', name: 'Coconut sugar', quantity: 0.5, unit: 'cup' },
      { id: '6-3', name: 'Baking soda', quantity: 0.5, unit: 'tsp' },
      { id: '6-4', name: 'Salt', quantity: 0.25, unit: 'tsp' },
      { id: '6-5', name: 'Coconut oil, melted', quantity: 0.5, unit: 'cup' },
      { id: '6-6', name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
      { id: '6-7', name: 'Egg', quantity: 1, unit: 'large' },
      { id: '6-8', name: 'Dairy-free chocolate chips', quantity: 1, unit: 'cup' },
    ],
    steps: [
      'Preheat oven to 350°F (175°C). Line baking sheets with parchment paper.',
      'In a large bowl, whisk together almond flour, coconut sugar, baking soda, and salt.',
      'In another bowl, mix melted coconut oil, vanilla extract, and egg until well combined.',
      'Add wet ingredients to dry ingredients and mix until dough forms.',
      'Fold in dairy-free chocolate chips.',
      'Drop rounded tablespoons of dough onto prepared baking sheets.',
      'Bake for 10-12 minutes until edges are lightly golden.',
      'Let cool on baking sheets for 5 minutes before transferring to wire rack.',
    ],
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];