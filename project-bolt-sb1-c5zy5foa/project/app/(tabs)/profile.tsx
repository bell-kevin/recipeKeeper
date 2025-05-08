import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, BookmarkCheck, Clock, Info, Moon, CircleHelp as HelpCircle, Github, Mail } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/utils/ThemeContext';

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  const backgroundColor = isDarkMode ? '#1a1a1a' : '#f9fafb';
  const textColor = isDarkMode ? '#ffffff' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
  const borderColor = isDarkMode ? '#374151' : '#f3f4f6';
  const menuBackgroundColor = isDarkMode ? '#262626' : '#f3f4f6';
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.profileSection, { borderColor }]}>
          <View style={[styles.profileImageContainer, { backgroundColor: isDarkMode ? '#4B5563' : '#FEF3C7' }]}>
            <User size={40} color={isDarkMode ? '#E5E7EB' : '#E86C2C'} />
          </View>
          <Text style={[styles.profileName, { color: textColor }]}>Culinary Chef</Text>
          <Text style={[styles.profileEmail, { color: secondaryTextColor }]}>chef@example.com</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Preferences</Text>
          
          <View style={[styles.settingItem, { borderColor }]}>
            <View style={styles.settingTextContainer}>
              <Moon size={20} color={secondaryTextColor} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: textColor }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#d1d5db', true: '#E86C2C' }}
              thumbColor="#ffffff"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Account</Text>
          
          <TouchableOpacity style={[styles.menuItem, { borderColor }]}>
            <BookmarkCheck size={20} color={secondaryTextColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>Your Recipes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderColor }]}>
            <Clock size={20} color={secondaryTextColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>Recently Viewed</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderColor }]}>
            <Settings size={20} color={secondaryTextColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>Account Settings</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Support</Text>
          
          <TouchableOpacity style={[styles.menuItem, { borderColor }]}>
            <HelpCircle size={20} color={secondaryTextColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>Help & FAQ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderColor }]}>
            <Mail size={20} color={secondaryTextColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>Contact Us</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderColor }]}>
            <Info size={20} color={secondaryTextColor} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: textColor }]}>About App</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.footer, { borderColor }]}>
          <Text style={[styles.footerText, { color: secondaryTextColor }]}>Recipe Keeper v1.0.0</Text>
          <Text style={[styles.footerSubtext, { color: secondaryTextColor }]}>Made with ❤️ for good food</Text>
        </View>
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
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
  },
});