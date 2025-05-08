import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { RecipeProvider } from '@/utils/RecipeContext';
import { ThemeProvider } from '@/utils/ThemeContext';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  useFrameworkReady();
  
  const [fontsLoaded] = useFonts({
    'Merriweather-Regular': 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap',
    'Inter-Regular': 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
    'Inter-Medium': 'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap',
    'Inter-SemiBold': 'https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap',
    'Inter-Bold': 'https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap',
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RecipeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="recipe/[id]" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="recipe/edit/[id]" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </RecipeProvider>
    </ThemeProvider>
  );
}