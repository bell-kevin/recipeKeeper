import React, { createContext, useState, useEffect, useContext } from 'react';
import { Recipe, Category, defaultCategories } from '../types/recipe';
import * as Storage from './storage';

interface RecipeContextType {
  recipes: Recipe[];
  categories: Category[];
  isLoading: boolean;
  getRecipeById: (id: string) => Recipe | undefined;
  addRecipe: (recipe: Recipe) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  getFavoriteRecipes: () => Recipe[];
  getCategoryRecipes: (categoryId: string) => Recipe[];
  searchRecipes: (query: string) => Recipe[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const storedRecipes = await Storage.loadRecipes();
        const storedCategories = await Storage.loadCategories();
        
        setRecipes(storedRecipes);
        setCategories(storedCategories);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Get a single recipe by ID
  const getRecipeById = (id: string) => {
    return recipes.find((recipe) => recipe.id === id);
  };

  // Add a new recipe
  const addRecipe = async (recipe: Recipe) => {
    try {
      await Storage.addRecipe(recipe);
      setRecipes((prevRecipes) => [...prevRecipes, recipe]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  // Update an existing recipe
  const updateRecipe = async (updatedRecipe: Recipe) => {
    try {
      await Storage.updateRecipe(updatedRecipe);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        )
      );
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  // Delete a recipe
  const deleteRecipe = async (id: string) => {
    try {
      await Storage.deleteRecipe(id);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (id: string) => {
    try {
      await Storage.toggleFavorite(id);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id
            ? { ...recipe, isFavorite: !recipe.isFavorite }
            : recipe
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Get all favorite recipes
  const getFavoriteRecipes = () => {
    return recipes.filter((recipe) => recipe.isFavorite);
  };

  // Get recipes by category
  const getCategoryRecipes = (categoryId: string) => {
    return recipes.filter((recipe) => recipe.categories.includes(categoryId));
  };

  // Search recipes by title, description, or ingredients
  const searchRecipes = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(lowercaseQuery)
      )
    );
  };

  const value = {
    recipes,
    categories,
    isLoading,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    getFavoriteRecipes,
    getCategoryRecipes,
    searchRecipes,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};