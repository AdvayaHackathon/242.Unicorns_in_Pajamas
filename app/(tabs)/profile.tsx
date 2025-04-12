import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Medal, Star, Trophy, Flame, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTheme, themes } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const { userName } = useUser();
  
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const badges = [
    { id: 1, name: 'Quick Learner', icon: Medal, color: colors.primary },
    { id: 2, name: 'Quiz Master', icon: Star, color: '#eab308' },
    { id: 3, name: 'Champion', icon: Trophy, color: colors.success },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Profile</Text>
        <Pressable 
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}>
          <Settings size={24} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: colors.text }]}>{userName}</Text>
        <Text style={[styles.grade, { color: colors.secondaryText }]}>Grade 8 • English</Text>
      </View>

      <View style={[styles.statsContainer, { borderColor: colors.border }]}>
        <View style={styles.statItem}>
          <Flame size={24} color={colors.danger} />
          <Text style={[styles.statValue, { color: colors.text }]}>7</Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Trophy size={24} color="#eab308" />
          <Text style={[styles.statValue, { color: colors.text }]}>#4</Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Rank</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text }]}>2,100</Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Points</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Badges Earned</Text>
      <View style={styles.badgesContainer}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeItem}>
            <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
              <badge.icon size={24} color="#fff" />
            </View>
            <Text style={[styles.badgeName, { color: colors.secondaryText }]}>{badge.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  settingsButton: {
    padding: 8,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  grade: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  badgeItem: {
    alignItems: 'center',
    width: '30%',
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
});