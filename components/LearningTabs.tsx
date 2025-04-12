import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Book, Brain, Trophy, MessageSquareMore, User } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';

interface LearningTabsProps {
  currentTab: string;
}

export default function LearningTabs({ currentTab }: LearningTabsProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];

  const tabs = [
    { name: 'learn', icon: Book, label: 'Learn' },
    { name: 'quiz', icon: Brain, label: 'Quiz' },
    { name: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { name: 'ask-ai', icon: MessageSquareMore, label: 'Ask AI' },
    { name: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.name;
        const Icon = tab.icon;
        
        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(`/(tabs)/${tab.name}`)}>
            <Icon
              size={24}
              color={isActive ? colors.primary : colors.secondaryText}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? colors.primary : colors.secondaryText,
                  fontFamily: isActive ? 'Nunito-Bold' : 'Nunito-Regular',
                },
              ]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    height: Platform.select({
      ios: 85,
      android: 65,
      web: 60,
    }),
    paddingBottom: Platform.select({
      ios: 30,
      android: 10,
      web: 10,
    }),
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
  },
});