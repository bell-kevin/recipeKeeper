import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe, Category, defaultCategories, sampleRecipes } from '../types/recipe';

// Keys for AsyncStorage
const RECIPES_STORAGE_KEY = 'recipeApp:recipes';
const CATEGORIES_STORAGE_KEY = 'recipeApp:categories';
const FIRST_LAUNCH_KEY = 'recipeApp:firstLaunch';

// Load recipes from storage
export const loadRecipes = async (): Promise<Recipe[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    
    // Check if it's the first app launch
    const isFirstLaunch = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
    if (isFirstLaunch === null) {
      // Set first launch flag
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'false');
      
      // Save sample recipes on first launch
      await saveRecipes(sampleRecipes);
      return sampleRecipes;
    }
    
    return [];
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
};

// Save recipes to storage
export const saveRecipes = async (recipes: Recipe[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving recipes:', error);
  }
};

// Load categories from storage
export const loadCategories = async (): Promise<Category[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    
    // If no categories exist, save and return the default categories
    await saveCategories(defaultCategories);
    return defaultCategories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return defaultCategories;
  }
};

// Save categories to storage
export const saveCategories = async (categories: Category[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

// Add a new recipe
export const addRecipe = async (newRecipe: Recipe): Promise<void> => {
  try {
    const recipes = await loadRecipes();
    recipes.push(newRecipe);
    await saveRecipes(recipes);
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

// Update an existing recipe
export const updateRecipe = async (updatedRecipe: Recipe): Promise<void> => {
  try {
    const recipes = await loadRecipes();
    const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
    
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      await saveRecipes(recipes);
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
  }
};

// Delete a recipe
export const deleteRecipe = async (recipeId: string): Promise<void> => {
  try {
    const recipes = await loadRecipes();
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    await saveRecipes(updatedRecipes);
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

// Toggle favorite status
export const toggleFavorite = async (recipeId: string): Promise<void> => {
  try {
    const recipes = await loadRecipes();
    const index = recipes.findIndex((recipe) => recipe.id === recipeId);
    
    if (index !== -1) {
      recipes[index].isFavorite = !recipes[index].isFavorite;
      await saveRecipes(recipes);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};