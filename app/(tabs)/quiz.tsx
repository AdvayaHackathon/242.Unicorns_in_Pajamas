import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Star, Lock } from 'lucide-react-native';
import Animated, { 
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  Layout
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme, themes } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');
const GRID_SPACING = 16;
const GRID_SIZE = (width - (GRID_SPACING * 5)) / 4; // 4 items per row

const quizLevels = [
  { id: 1, stars: 3, unlocked: true, type: 'mathematics' },
  { id: 2, stars: 2, unlocked: true, type: 'science' },
  { id: 3, stars: 2, unlocked: true, type: 'mathematics' },
  { id: 4, stars: 1, unlocked: true, type: 'science' },
  { id: 5, stars: 0, unlocked: false, type: 'mathematics' },
  { id: 6, stars: 0, unlocked: false, type: 'science' },
  { id: 7, stars: 0, unlocked: false, type: 'mathematics' },
  { id: 8, stars: 0, unlocked: false, type: 'science' },
  { id: 9, stars: 0, unlocked: false, type: 'mathematics' },
  { id: 10, stars: 0, unlocked: false, type: 'science' },
  { id: 11, stars: 0, unlocked: false, type: 'mathematics' },
  { id: 12, stars: 0, unlocked: false, type: 'science' },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function QuizScreen() {
  const { theme } = useTheme();
  const colors = themes[theme];
  
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleQuizStart = (level: typeof quizLevels[0]) => {
    if (level.unlocked) {
      router.push({
        pathname: '/quiz-game',
        params: { type: level.type }
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Quiz Challenges</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          Complete challenges to unlock new levels!
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.quizGrid}>
          {quizLevels.map((level, index) => (
            <Animated.View
              key={level.id}
              entering={FadeInUp.delay(index * 100)}
              layout={Layout}>
              <Pressable
                style={[
                  styles.quizNode,
                  !level.unlocked && styles.lockedNode,
                  { backgroundColor: level.unlocked ? colors.card : colors.border }
                ]}
                onPress={() => handleQuizStart(level)}>
                <LinearGradient
                  colors={level.unlocked ? ['#fcd34d', '#f59e0b'] : ['#9ca3af', '#6b7280']}
                  style={styles.nodeContent}>
                  <Text style={styles.levelNumber}>{level.id}</Text>
                  {level.unlocked ? (
                    <View style={styles.starsContainer}>
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          color={i < level.stars ? '#ffffff' : '#e5e7eb'}
                          fill={i < level.stars ? '#ffffff' : 'none'}
                        />
                      ))}
                    </View>
                  ) : (
                    <Lock size={16} color="#e5e7eb" />
                  )}
                </LinearGradient>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: GRID_SPACING,
  },
  quizGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_SPACING,
    justifyContent: 'center',
  },
  quizNode: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  lockedNode: {
    opacity: 0.7,
  },
  nodeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  levelNumber: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#fff',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
});