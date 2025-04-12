import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Trophy } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';

export default function LeaderboardScreen() {
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

  const leaderboardData = [
    { id: 1, name: userName, points: 2500, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Mike R.', points: 2300, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Emma L.', points: 2100, avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Leaderboard</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Top performers this week</Text>
      </View>

      {leaderboardData.map((user, index) => (
        <View key={user.id} style={[styles.userCard, { backgroundColor: colors.card }]}>
          <View style={styles.rankContainer}>
            {index === 0 ? (
              <Trophy size={24} color="#eab308" fill="#eab308" />
            ) : (
              <Text style={[styles.rankText, { color: colors.text }]}>#{index + 1}</Text>
            )}
          </View>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.points, { color: colors.secondaryText }]}>{user.points} points</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginTop: 4,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  points: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
});