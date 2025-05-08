import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { X, Search } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSpring,
  Easing
} from 'react-native-reanimated';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  isDarkMode?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  onClear, 
  placeholder = 'Search recipes...',
  isDarkMode = false
}) => {
  const inputFocused = useSharedValue(false);
  const scale = useSharedValue(1);
  
  const handleFocus = () => {
    inputFocused.value = true;
    scale.value = withTiming(0.98, { 
      duration: 200,
      easing: Easing.ease
    });
  };
  
  const handleBlur = () => {
    inputFocused.value = false;
    scale.value = withTiming(1, { 
      duration: 200, 
      easing: Easing.ease
    });
  };
  
  const backgroundColor = isDarkMode ? '#262626' : '#f3f4f6';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const placeholderColor = isDarkMode ? '#6b7280' : '#9ca3af';
  const iconColor = isDarkMode ? '#6b7280' : '#6b7280';
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: inputFocused.value 
        ? withTiming(isDarkMode ? '#333333' : '#ffffff', { duration: 200 })
        : withTiming(backgroundColor, { duration: 200 }),
      shadowOpacity: inputFocused.value
        ? withTiming(0.15, { duration: 200 })
        : withTiming(0.05, { duration: 200 }),
    };
  });
  
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Search size={20} color={iconColor} style={styles.searchIcon} />
      
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType="search"
        clearButtonMode="never"
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <X size={18} color={iconColor} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;