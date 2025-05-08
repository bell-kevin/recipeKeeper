import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useRecipes } from '@/utils/RecipeContext';
import RecipeCard from '@/components/RecipeCard';
import CategoryPill from '@/components/CategoryPill';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/utils/ThemeContext';

export default function HomeScreen() {
  const { recipes, categories, isLoading, toggleFavorite } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  
  const backgroundColor = isDarkMode ? '#1a1a1a' : '#f9fafb';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  
  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.categories.includes(selectedCategory))
    : recipes;
  
  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };
  
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#E86C2C" />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Recipe Keeper</Text>
        <Text style={[styles.subtitle, { color: secondaryTextColor }]}>What would you like to cook today?</Text>
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryPill
              category={item}
              isSelected={selectedCategory === item.id}
              onPress={handleCategoryPress}
              isDarkMode={isDarkMode}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard recipe={item} onToggleFavorite={toggleFavorite} isDarkMode={isDarkMode} />
          )}
          contentContainerStyle={styles.recipesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: textColor }]}>No recipes found</Text>
          <Text style={[styles.emptySubtitle, { color: secondaryTextColor }]}>
            {selectedCategory 
              ? 'No recipes in this category. Try selecting another category or add a new recipe!' 
              : 'Add your first recipe to get started!'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  recipesList: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});