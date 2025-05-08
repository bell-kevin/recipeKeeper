import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Recipe } from '../types/recipe';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
  isDarkMode?: boolean;
}

const windowWidth = Dimensions.get('window').width;

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onToggleFavorite, isDarkMode = false }) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    
    setTimeout(() => {
      router.push(`/recipe/${recipe.id}`);
    }, 150);
  };
  
  const handleFavoritePress = () => {
    onToggleFavorite(recipe.id);
  };
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} hr ${remainingMinutes} min` 
        : `${hours} hr`;
    }
  };
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const backgroundColor = isDarkMode ? '#262626' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  
  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor }]}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={handlePress}
        style={styles.cardContainer}
      >
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.image}
        />
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          {recipe.isFavorite ? (
            <BookmarkCheck size={24} color="#ffffff" />
          ) : (
            <Bookmark size={24} color="#ffffff" />
          )}
        </TouchableOpacity>
        
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
            {recipe.title}
          </Text>
          
          <Text style={[styles.description, { color: secondaryTextColor }]} numberOfLines={2}>
            {recipe.description}
          </Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.timeContainer}>
              <Clock size={16} color={secondaryTextColor} />
              <Text style={[styles.timeText, { color: secondaryTextColor }]}>{formatTime(totalTime)}</Text>
            </View>
            
            <View style={styles.difficultyContainer}>
              <Text 
                style={[
                  styles.difficulty, 
                  recipe.difficulty === 'easy' 
                    ? styles.easyDifficulty 
                    : recipe.difficulty === 'medium' 
                    ? styles.mediumDifficulty
                    : styles.hardDifficulty
                ]}
              >
                {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 4,
    fontSize: 13,
  },
  difficultyContainer: {},
  difficulty: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  easyDifficulty: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  mediumDifficulty: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  hardDifficulty: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
});

export default RecipeCard;