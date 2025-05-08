import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRecipes } from '@/utils/RecipeContext';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/utils/ThemeContext';

export default function SearchScreen() {
  const { recipes, isLoading, toggleFavorite, searchRecipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const { isDarkMode } = useTheme();
  
  const backgroundColor = isDarkMode ? '#1a1a1a' : '#f9fafb';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes([]);
    } else {
      setFilteredRecipes(searchRecipes(searchQuery));
    }
  }, [searchQuery, recipes]);
  
  const handleClearSearch = () => {
    setSearchQuery('');
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
        <Text style={[styles.title, { color: textColor }]}>Search</Text>
        <Text style={[styles.subtitle, { color: secondaryTextColor }]}>Find the perfect recipe</Text>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="Search by name or ingredient..."
        isDarkMode={isDarkMode}
      />
      
      {searchQuery.trim() === '' ? (
        <View style={styles.initialStateContainer}>
          <Search size={64} color={isDarkMode ? '#4B5563' : '#d1d5db'} style={styles.initialStateIcon} />
          <Text style={[styles.initialStateText, { color: secondaryTextColor }]}>
            Search for recipes by name or ingredients
          </Text>
        </View>
      ) : filteredRecipes.length > 0 ? (
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
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsTitle, { color: textColor }]}>No results found</Text>
          <Text style={[styles.noResultsSubtitle, { color: secondaryTextColor }]}>
            Try different keywords or check the spelling
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
  initialStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  initialStateIcon: {
    marginBottom: 16,
  },
  initialStateText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});