import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useRecipes } from '@/utils/RecipeContext';
import Header from '@/components/Header';
import { Clock, Users, BookmarkCheck, Bookmark, CreditCard as Edit, Trash2, SquareCheck as CheckSquare } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  FadeIn,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 100 : 80;
const IMAGE_HEIGHT = 300;

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeById, categories, toggleFavorite, deleteRecipe } = useRecipes();
  const recipe = getRecipeById(id);
  
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT - HEADER_HEIGHT],
      [0, 1],
      Extrapolation.CLAMP
    );
    
    return {
      opacity,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      borderBottomColor: `rgba(229, 231, 235, ${opacity})`,
      borderBottomWidth: opacity,
    };
  });
  
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
      [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2],
      Extrapolation.CLAMP
    );
    
    const scale = interpolate(
      scrollY.value,
      [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
      [2, 1, 1],
      Extrapolation.CLAMP
    );
    
    return {
      transform: [{ translateY }, { scale }],
    };
  });
  
  if (!recipe) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Recipe not found</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
  };
  
  const handleShareRecipe = async () => {
    try {
      await Share.share({
        title: recipe.title,
        message: `Check out this recipe for ${recipe.title}:\n\n${recipe.description}\n\nPrep Time: ${recipe.prepTime} minutes\nCook Time: ${recipe.cookTime} minutes\nServings: ${recipe.servings}`,
      });
    } catch (error) {
      console.error('Error sharing recipe:', error);
    }
  };
  
  const handleEditRecipe = () => {
    router.push(`/recipe/edit/${recipe.id}`);
  };
  
  const handleDeleteRecipe = () => {
    deleteRecipe(recipe.id);
    router.back();
  };
  
  const toggleIngredientCheck = (ingredientId: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };
  
  const toggleStepCheck = (stepIndex: number) => {
    setCheckedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((idx) => idx !== stepIndex)
        : [...prev, stepIndex]
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Header
          title={recipe.title}
          showBackButton
          showShareButton
          onSharePress={handleShareRecipe}
          transparent={scrollY.value < IMAGE_HEIGHT - HEADER_HEIGHT}
        />
      </Animated.View>
      
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
          <View style={styles.imagePill}>
            <Text style={styles.difficultyText}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </Text>
          </View>
        </Animated.View>
        
        <View style={styles.contentContainer}>
          <Animated.View 
            style={styles.titleContainer}
            entering={FadeIn.delay(200)}
          >
            <Text style={styles.title}>{recipe.title}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.metaText}>
                  {totalTime} min
                </Text>
              </View>
              
              <View style={styles.metaItem}>
                <Users size={16} color="#6b7280" />
                <Text style={styles.metaText}>
                  {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
                </Text>
              </View>
            </View>
            
            <Text style={styles.description}>{recipe.description}</Text>
            
            <View style={styles.categoriesContainer}>
              {recipe.categories.map((categoryId) => (
                <View key={categoryId} style={styles.category}>
                  <Text style={styles.categoryText}>
                    {getCategoryName(categoryId)}
                  </Text>
                </View>
              ))}
            </View>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={handleToggleFavorite}
              >
                {recipe.isFavorite ? (
                  <BookmarkCheck size={20} color="#E86C2C" />
                ) : (
                  <Bookmark size={20} color="#6b7280" />
                )}
                <Text
                  style={[
                    styles.actionText,
                    recipe.isFavorite && styles.favoriteText,
                  ]}
                >
                  {recipe.isFavorite ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleEditRecipe}
              >
                <Edit size={20} color="#6b7280" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDeleteRecipe}
              >
                <Trash2 size={20} color="#6b7280" />
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.sectionSubtitle}>
              {recipe.ingredients.length} {recipe.ingredients.length === 1 ? 'item' : 'items'}
            </Text>
            
            {recipe.ingredients.map((ingredient) => (
              <TouchableOpacity
                key={ingredient.id}
                style={[
                  styles.ingredientItem,
                  checkedIngredients.includes(ingredient.id) && styles.ingredientChecked,
                ]}
                onPress={() => toggleIngredientCheck(ingredient.id)}
              >
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      checkedIngredients.includes(ingredient.id) && styles.checkboxChecked,
                    ]}
                  >
                    {checkedIngredients.includes(ingredient.id) && (
                      <CheckSquare size={16} color="#ffffff" />
                    )}
                  </View>
                </View>
                
                <View style={styles.ingredientContent}>
                  <Text
                    style={[
                      styles.ingredientName,
                      checkedIngredients.includes(ingredient.id) && styles.textChecked,
                    ]}
                  >
                    {ingredient.name}
                  </Text>
                  
                  {(ingredient.quantity > 0 || ingredient.unit) && (
                    <Text
                      style={[
                        styles.ingredientQuantity,
                        checkedIngredients.includes(ingredient.id) && styles.textChecked,
                      ]}
                    >
                      {ingredient.quantity > 0 ? ingredient.quantity : ''}{' '}
                      {ingredient.unit}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.sectionSubtitle}>
              {recipe.steps.length} {recipe.steps.length === 1 ? 'step' : 'steps'}
            </Text>
            
            {recipe.steps.map((step, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.stepItem,
                  checkedSteps.includes(index) && styles.stepChecked,
                ]}
                onPress={() => toggleStepCheck(index)}
              >
                <View style={styles.stepNumberContainer}>
                  <View
                    style={[
                      styles.stepNumber,
                      checkedSteps.includes(index) && styles.stepNumberChecked,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumberText,
                        checkedSteps.includes(index) && styles.stepNumberTextChecked,
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepText,
                      checkedSteps.includes(index) && styles.textChecked,
                    ]}
                  >
                    {step}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#E86C2C',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    width: SCREEN_WIDTH,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  imagePill: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  category: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 16,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  favoriteText: {
    color: '#E86C2C',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  ingredientChecked: {
    opacity: 0.5,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#E86C2C',
    borderColor: '#E86C2C',
  },
  ingredientContent: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 2,
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#6b7280',
  },
  textChecked: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepChecked: {
    opacity: 0.5,
  },
  stepNumberContainer: {
    marginRight: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberChecked: {
    backgroundColor: '#E86C2C',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  stepNumberTextChecked: {
    color: '#ffffff',
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
});