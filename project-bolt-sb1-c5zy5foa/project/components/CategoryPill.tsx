import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Category } from '../types/recipe';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface CategoryPillProps {
  category: Category;
  isSelected?: boolean;
  onPress: (categoryId: string) => void;
  isDarkMode?: boolean;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ 
  category, 
  isSelected = false, 
  onPress,
  isDarkMode = false
}) => {
  const scale = useSharedValue(1);
  
  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1, { damping: 15 });
    });
    onPress(category.id);
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const backgroundColor = isSelected 
    ? category.color 
    : isDarkMode 
      ? `${category.color}15`
      : `${category.color}30`;
  
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            { 
              color: isSelected 
                ? '#ffffff' 
                : isDarkMode 
                  ? category.color 
                  : category.color 
            },
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CategoryPill;