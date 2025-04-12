import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Chrome as Home, Settings, LogOut } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';

interface LearningNavProps {
  title: string;
}

export default function LearningNav({ title }: LearningNavProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <View style={[styles.navbar, { backgroundColor: colors.background }]}>
      <View style={styles.leftSection}>
        <Pressable 
          style={styles.navButton}
          onPress={() => router.replace('/')}>
          <Home size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.brandName, { color: colors.primary }]}>EDVANCE</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      <View style={styles.rightButtons}>
        <Pressable 
          style={styles.navButton}
          onPress={() => router.push('/settings')}>
          <Settings size={24} color={colors.text} />
        </Pressable>
        <Pressable 
          style={styles.navButton}
          onPress={() => router.replace('/login')}>
          <LogOut size={24} color={colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandName: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    padding: 8,
  },
});