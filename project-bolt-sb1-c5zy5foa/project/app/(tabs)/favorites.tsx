import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRecipes } from '@/utils/RecipeContext';
import RecipeCard from '@/components/RecipeCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookmarkCheck } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/utils/ThemeContext';

export default function FavoritesScreen() {
  const { getFavoriteRecipes, isLoading, toggleFavorite } = useRecipes();
  const { isDarkMode } = useTheme();
  
  const backgroundColor = isDarkMode ? '#1a1a1a' : '#f9fafb';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  
  const favoriteRecipes = getFavoriteRecipes();
  
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
        <Text style={[styles.title, { color: textColor }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: secondaryTextColor }]}>Your saved recipes</Text>
      </View>
      
      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard recipe={item} onToggleFavorite={toggleFavorite} isDarkMode={isDarkMode} />
          )}
          contentContainerStyle={styles.recipesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <BookmarkCheck size={64} color={isDarkMode ? '#4B5563' : '#d1d5db'} style={styles.emptyIcon} />
          <Text style={[styles.emptyTitle, { color: textColor }]}>No favorites yet</Text>
          <Text style={[styles.emptySubtitle, { color: secondaryTextColor }]}>
            Bookmark your favorite recipes to find them quickly later!
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
  recipesList: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    marginBottom: 16,
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