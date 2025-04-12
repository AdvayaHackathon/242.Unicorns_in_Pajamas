import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { useRouter } from 'expo-router';
import { BookOpen, SquarePen as PenSquare, Headphones } from 'lucide-react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, themes } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import LearningNav from '@/components/LearningNav';
import LearningTabs from '@/components/LearningTabs';

const subjects = [
  {
    id: 1,
    name: 'Mathematics',
    gradient: ['#fef3c7', '#fcd34d'],
    textColor: '#92400e',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Environmental Studies',
    gradient: ['#dcfce7', '#86efac'],
    textColor: '#166534',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'English',
    gradient: ['#dbeafe', '#93c5fd'],
    textColor: '#1e40af',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&auto=format&fit=crop',
  },
];

export default function PrimaryScreen() {
  const router = useRouter();
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LearningNav title="Primary Learning" />
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>Hello {userName}! 👋</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            Ready to discover something amazing?
          </Text>
        </View>

        <View style={styles.subjectsGrid}>
          {subjects.map((subject, index) => (
            <Animated.View
              key={subject.id}
              entering={FadeInDown.delay(index * 200)}
              layout={Layout.springify()}>
              <Pressable
                style={styles.subjectCard}
                onPress={() => router.push({
                  pathname: '/subject',
                  params: { 
                    id: subject.id, 
                    name: subject.name,
                    group: 'Primary'
                  }
                })}>
                <LinearGradient
                  colors={subject.gradient}
                  style={styles.cardGradient}>
                  <BookOpen size={32} color={subject.textColor} />
                  <Text style={[styles.subjectName, { color: subject.textColor }]}>
                    {subject.name}
                  </Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/notes')}>
            <PenSquare size={24} color="#fff" />
            <Text style={styles.buttonText}>My Notes</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: '#8b5cf6' }]}
            onPress={() => router.push('/grandma-stories')}>
            <Headphones size={24} color="#fff" />
            <Text style={styles.buttonText}>Grandma's Stories</Text>
          </Pressable>
        </View>
      </ScrollView>
      <LearningTabs currentTab="learn" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginTop: 4,
  },
  subjectsGrid: {
    padding: 20,
    gap: 16,
  },
  subjectCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  subjectName: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});