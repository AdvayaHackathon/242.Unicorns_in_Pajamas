import { Tabs } from 'expo-router';
import { Book, Brain, Trophy, MessageSquareMore, User } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useTheme, themes } from '@/context/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: Platform.select({
            ios: 85,
            android: 65,
            web: 60
          }),
          paddingBottom: Platform.select({
            ios: 30,
            android: 10,
            web: 10
          }),
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ size, color }) => <Book size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ size, color }) => <Brain size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ size, color }) => <Trophy size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ask-ai"
        options={{
          title: 'Ask AI',
          tabBarIcon: ({ size, color }) => <MessageSquareMore size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}