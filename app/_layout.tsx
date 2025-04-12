import { useCallback, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  useFrameworkReady();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <Stack 
          screenOptions={{
            headerShown: false,
            contentStyle: { 
              backgroundColor: 'white'
            },
            animation: Platform.OS === 'ios' ? 'default' : 'fade'
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(groups)" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="subject" />
          <Stack.Screen name="notes" />
          <Stack.Screen name="lesson" />
          <Stack.Screen name="quiz-game" />
          <Stack.Screen name="grandma-stories" />
          <Stack.Screen name="visual-learning" />
          <Stack.Screen name="animal-sounds" />
          <Stack.Screen name="career-paths" />
        </Stack>
        <StatusBar style="auto" />
      </UserProvider>
    </ThemeProvider>
  );
}