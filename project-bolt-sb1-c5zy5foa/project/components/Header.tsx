import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { ChevronLeft, Share2 } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onSharePress?: () => void;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showShareButton = false,
  onSharePress,
  transparent = false,
}) => {
  const navigation = useNavigation();
  
  const handleBackPress = () => {
    navigation.goBack();
  };
  
  return (
    <View style={[
      styles.container,
      transparent ? styles.transparentContainer : null,
    ]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={handleBackPress} 
            style={[
              styles.backButton,
              transparent ? styles.buttonTransparent : null,
            ]}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChevronLeft 
              size={24} 
              color={transparent ? '#ffffff' : '#111827'} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <Text 
        style={[
          styles.title,
          transparent ? styles.titleTransparent : null,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {showShareButton && (
          <TouchableOpacity 
            onPress={onSharePress} 
            style={[
              styles.shareButton,
              transparent ? styles.buttonTransparent : null,
            ]}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Share2 
              size={20} 
              color={transparent ? '#ffffff' : '#111827'} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  transparentContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 4,
  },
  shareButton: {
    padding: 4,
  },
  buttonTransparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  titleTransparent: {
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default Header;