import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecipes } from '@/utils/RecipeContext';
import { Recipe, Ingredient, Category } from '@/types/recipe';
import { Plus, Minus, Save, X, Image as ImageIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CategoryPill from '@/components/CategoryPill';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/utils/ThemeContext';

export default function AddRecipeScreen() {
  const { categories, addRecipe } = useRecipes();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  
  const backgroundColor = isDarkMode ? '#1a1a1a' : '#f9fafb';
  const cardBackgroundColor = isDarkMode ? '#262626' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  const borderColor = isDarkMode ? '#374151' : '#e5e7eb';
  const placeholderColor = isDarkMode ? '#6b7280' : '#9ca3af';
  const iconColor = isDarkMode ? '#6b7280' : '#6b7280';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Partial<Ingredient>[]>([
    { id: '1', name: '', quantity: 0, unit: '' },
  ]);
  const [steps, setSteps] = useState<string[]>(['']);
  
  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: String(ingredients.length + 1), name: '', quantity: 0, unit: '' },
    ]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };
  
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    
    if (field === 'quantity' && typeof value === 'string') {
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value === '' ? 0 : parseFloat(value),
      };
    } else {
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value,
      };
    }
    
    setIngredients(newIngredients);
  };
  
  const handleAddStep = () => {
    setSteps([...steps, '']);
  };
  
  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
    }
  };
  
  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleSubmit = () => {
    // Basic validation
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a recipe title');
      return;
    }
    
    if (!imageUrl.trim()) {
      Alert.alert('Error', 'Please enter an image URL');
      return;
    }
    
    if (isNaN(parseInt(prepTime)) || isNaN(parseInt(cookTime)) || isNaN(parseInt(servings))) {
      Alert.alert('Error', 'Prep time, cook time, and servings must be numbers');
      return;
    }
    
    if (selectedCategories.length === 0) {
      Alert.alert('Error', 'Please select at least one category');
      return;
    }
    
    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.name && ing.name.trim() !== ''
    );
    
    if (validIngredients.length === 0) {
      Alert.alert('Error', 'Please add at least one ingredient');
      return;
    }
    
    // Validate steps
    const validSteps = steps.filter((step) => step.trim() !== '');
    
    if (validSteps.length === 0) {
      Alert.alert('Error', 'Please add at least one step');
      return;
    }
    
    // Create the recipe object
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || 'No description provided',
      imageUrl: imageUrl.trim(),
      prepTime: parseInt(prepTime),
      cookTime: parseInt(cookTime),
      servings: parseInt(servings),
      difficulty,
      categories: selectedCategories,
      ingredients: validIngredients as Ingredient[],
      steps: validSteps,
      isFavorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    // Save the recipe
    addRecipe(newRecipe);
    
    // Show success message and navigate back
    Alert.alert('Success', 'Recipe added successfully', [
      {
        text: 'OK',
        onPress: () => router.push('/'),
      },
    ]);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Add Recipe</Text>
        <Text style={[styles.subtitle, { color: secondaryTextColor }]}>Create a new delicious recipe</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Recipe Title*</Text>
          <TextInput
            style={[styles.input, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
            value={title}
            onChangeText={setTitle}
            placeholder="E.g., Chocolate Chip Cookies"
            placeholderTextColor={placeholderColor}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your recipe..."
            placeholderTextColor={placeholderColor}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Image URL*</Text>
          <View style={[styles.imageUrlContainer, { backgroundColor: cardBackgroundColor, borderColor }]}>
            <TextInput
              style={[styles.imageUrlInput, { color: textColor }]}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor={placeholderColor}
            />
            <View style={[styles.imageIconContainer, { borderColor }]}>
              <ImageIcon size={20} color={iconColor} />
            </View>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={[styles.label, { color: textColor }]}>Prep Time (mins)*</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
              value={prepTime}
              onChangeText={setPrepTime}
              placeholder="15"
              placeholderTextColor={placeholderColor}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={[styles.label, { color: textColor }]}>Cook Time (mins)*</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
              value={cookTime}
              onChangeText={setCookTime}
              placeholder="25"
              placeholderTextColor={placeholderColor}
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={[styles.label, { color: textColor }]}>Servings*</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
              value={servings}
              onChangeText={setServings}
              placeholder="4"
              placeholderTextColor={placeholderColor}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={[styles.label, { color: textColor }]}>Difficulty*</Text>
            <View style={styles.difficultyContainer}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'easy' && styles.difficultyActive,
                  styles.difficultyEasy,
                  { borderColor },
                ]}
                onPress={() => setDifficulty('easy')}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    difficulty === 'easy' && styles.difficultyTextActive,
                    { color: difficulty === 'easy' ? '#ffffff' : textColor },
                  ]}
                >
                  Easy
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'medium' && styles.difficultyActive,
                  styles.difficultyMedium,
                  { borderColor },
                ]}
                onPress={() => setDifficulty('medium')}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    difficulty === 'medium' && styles.difficultyTextActive,
                    { color: difficulty === 'medium' ? '#ffffff' : textColor },
                  ]}
                >
                  Medium
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'hard' && styles.difficultyActive,
                  styles.difficultyHard,
                  { borderColor },
                ]}
                onPress={() => setDifficulty('hard')}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    difficulty === 'hard' && styles.difficultyTextActive,
                    { color: difficulty === 'hard' ? '#ffffff' : textColor },
                  ]}
                >
                  Hard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Categories*</Text>
          <Text style={[styles.helperText, { color: secondaryTextColor }]}>Select at least one category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                category={category}
                isSelected={selectedCategories.includes(category.id)}
                onPress={handleCategoryToggle}
                isDarkMode={isDarkMode}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Ingredients*</Text>
          <Text style={[styles.helperText, { color: secondaryTextColor }]}>Add all ingredients needed for the recipe</Text>
          
          {ingredients.map((ingredient, index) => (
            <Animated.View 
              key={ingredient.id}
              style={styles.ingredientRow}
              entering={FadeInDown.delay(index * 50).springify()}
            >
              <View style={styles.ingredientNameContainer}>
                <TextInput
                  style={[styles.ingredientName, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
                  value={ingredient.name}
                  onChangeText={(value) => handleIngredientChange(index, 'name', value)}
                  placeholder="Ingredient name"
                  placeholderTextColor={placeholderColor}
                />
              </View>
              
              <View style={styles.ingredientQuantityContainer}>
                <TextInput
                  style={[styles.ingredientQuantity, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
                  value={ingredient.quantity?.toString() || ''}
                  onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                  placeholder="Qty"
                  placeholderTextColor={placeholderColor}
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.ingredientUnitContainer}>
                <TextInput
                  style={[styles.ingredientUnit, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
                  value={ingredient.unit}
                  onChangeText={(value) => handleIngredientChange(index, 'unit', value)}
                  placeholder="Unit"
                  placeholderTextColor={placeholderColor}
                />
              </View>
              
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveIngredient(index)}
              >
                <X size={20} color="#ef4444" />
              </TouchableOpacity>
            </Animated.View>
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add Ingredient</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Instructions*</Text>
          <Text style={[styles.helperText, { color: secondaryTextColor }]}>Add step-by-step cooking instructions</Text>
          
          {steps.map((step, index) => (
            <Animated.View 
              key={index}
              style={styles.stepContainer}
              entering={FadeInDown.delay(index * 50).springify()}
            >
              <View style={[styles.stepNumberContainer, { backgroundColor: '#E86C2C' }]}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <View style={styles.stepInputContainer}>
                <TextInput
                  style={[styles.stepInput, { backgroundColor: cardBackgroundColor, borderColor, color: textColor }]}
                  value={step}
                  onChangeText={(value) => handleStepChange(index, value)}
                  placeholder={`Step ${index + 1}...`}
                  placeholderTextColor={placeholderColor}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
              <TouchableOpacity
                style={styles.removeStepButton}
                onPress={() => handleRemoveStep(index)}
              >
                <X size={20} color="#ef4444" />
              </TouchableOpacity>
            </Animated.View>
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddStep}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add Step</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Save size={20} color="#ffffff" style={styles.submitIcon} />
          <Text style={styles.submitText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 14,
    marginBottom: 12,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  difficultyEasy: {
    backgroundColor: '#dcfce730',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  difficultyMedium: {
    backgroundColor: '#fef3c730',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  difficultyHard: {
    backgroundColor: '#fee2e230',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  difficultyActive: {
    borderColor: 'transparent',
  },
  difficultyText: {
    fontWeight: '500',
  },
  difficultyTextActive: {
    color: '#ffffff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  ingredientNameContainer: {
    flex: 3,
    marginRight: 8,
  },
  ingredientName: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  ingredientQuantityContainer: {
    flex: 1,
    marginRight: 8,
  },
  ingredientQuantity: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  ingredientUnitContainer: {
    flex: 1,
    marginRight: 8,
  },
  ingredientUnit: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#E86C2C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 6,
  },
  stepNumber: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  stepInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  stepInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  removeStepButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#E86C2C',
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  submitIcon: {
    marginRight: 8,
  },
  imageUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageUrlInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  imageIconContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    paddingVertical: 10,
  },
});