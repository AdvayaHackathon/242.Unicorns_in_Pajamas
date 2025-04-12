import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import Animated, { 
  FadeInUp, 
  FadeInRight,
  Layout,
  SlideInRight,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useTheme, themes } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

// Platform-specific animated component
const AnimatedPressable = Platform.OS === 'web' 
  ? Pressable 
  : Animated.createAnimatedComponent(Pressable);

const syllabusData = {
  'Pre-Primary': {
    'Numbers & Counting': [
      { id: 1, title: 'Numbers 1-10', description: 'Learn to count and recognize numbers from 1 to 10' },
      { id: 2, title: 'Numbers 11-20', description: 'Explore counting and number recognition up to 20' },
      { id: 3, title: 'Basic Counting', description: 'Practice counting objects in your environment' },
      { id: 4, title: 'Number Games', description: 'Fun activities to reinforce number learning' },
    ],
    'Alphabet Fun': [
      { id: 1, title: 'Letter Recognition', description: 'Learn to identify uppercase letters' },
      { id: 2, title: 'Letter Sounds', description: 'Discover the sounds each letter makes' },
      { id: 3, title: 'Writing Letters', description: 'Practice writing uppercase letters' },
      { id: 4, title: 'Alphabet Songs', description: 'Learn the alphabet through music' },
    ],
    'My World': [
      { id: 1, title: 'My Body', description: 'Learn about different parts of the body' },
      { id: 2, title: 'My Family', description: 'Explore family relationships' },
      { id: 3, title: 'Colors & Shapes', description: 'Identify basic colors and shapes' },
      { id: 4, title: 'Weather & Seasons', description: 'Learn about different types of weather' },
    ],
  },
  'Primary': {
    'Mathematics': [
      { id: 1, title: 'Addition and Subtraction', description: 'Learn basic arithmetic operations' },
      { id: 2, title: 'Multiplication Tables', description: 'Master multiplication facts' },
      { id: 3, title: 'Division Basics', description: 'Understand division concepts' },
      { id: 4, title: 'Fractions', description: 'Introduction to fractions' },
    ],
    'Environmental Studies': [
      { id: 1, title: 'Plants & Animals', description: 'Learn about living things' },
      { id: 2, title: 'Our Earth', description: 'Explore our planet and its features' },
      { id: 3, title: 'Weather', description: 'Understanding weather patterns' },
      { id: 4, title: 'Conservation', description: 'Learning to protect our environment' },
    ],
    'English': [
      { id: 1, title: 'Reading Skills', description: 'Develop basic reading comprehension' },
      { id: 2, title: 'Writing Practice', description: 'Learn to write simple sentences' },
      { id: 3, title: 'Grammar Basics', description: 'Introduction to basic grammar' },
      { id: 4, title: 'Vocabulary', description: 'Build your word knowledge' },
    ],
  },
  'Middle': {
    'Mathematics': [
      { id: 1, title: 'Algebra Basics', description: 'Introduction to algebraic concepts' },
      { id: 2, title: 'Geometry', description: 'Learn about shapes and measurements' },
      { id: 3, title: 'Statistics', description: 'Understanding data and graphs' },
      { id: 4, title: 'Equations', description: 'Solving linear equations' },
    ],
    'Science': [
      { id: 1, title: 'Cell Biology', description: 'Study of cells and their functions' },
      { id: 2, title: 'Physical Science', description: 'Learn about matter and energy' },
      { id: 3, title: 'Earth Science', description: 'Explore Earth\'s systems' },
      { id: 4, title: 'Life Science', description: 'Study of living organisms' },
    ],
    'English': [
      { id: 1, title: 'Literature', description: 'Analyze stories and poems' },
      { id: 2, title: 'Writing', description: 'Develop essay writing skills' },
      { id: 3, title: 'Grammar', description: 'Advanced grammar concepts' },
      { id: 4, title: 'Vocabulary', description: 'Expand your word knowledge' },
    ],
  },
  'High': {
    'Mathematics': [
      { id: 1, title: 'Advanced Algebra', description: 'Complex algebraic concepts' },
      { id: 2, title: 'Calculus', description: 'Introduction to calculus' },
      { id: 3, title: 'Trigonometry', description: 'Study of triangles and angles' },
      { id: 4, title: 'Statistics', description: 'Advanced statistical analysis' },
    ],
    'Physics': [
      { id: 1, title: 'Mechanics', description: 'Study of motion and forces' },
      { id: 2, title: 'Electricity', description: 'Understanding electrical concepts' },
      { id: 3, title: 'Waves', description: 'Learn about wave phenomena' },
      { id: 4, title: 'Modern Physics', description: 'Introduction to quantum concepts' },
    ],
    'Chemistry': [
      { id: 1, title: 'Atomic Structure', description: 'Study of atoms and elements' },
      { id: 2, title: 'Chemical Bonding', description: 'Understanding molecular bonds' },
      { id: 3, title: 'Organic Chemistry', description: 'Study of carbon compounds' },
      { id: 4, title: 'Reactions', description: 'Chemical reaction types' },
    ],
  },
};

export default function SubjectScreen() {
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const colors = themes[theme];
  const userGroup = params.group as keyof typeof syllabusData;
  const subjectName = params.name as string;
  const syllabus = syllabusData[userGroup][subjectName];
  const progressWidth = useSharedValue('0%');

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  useEffect(() => {
    progressWidth.value = withSpring('0%');
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
  }));

  if (!fontsLoaded) {
    return null;
  }

  if (!syllabus) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>Subject Not Found</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.errorText, { color: colors.secondaryText }]}>
            This subject is not available for your learning group.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View 
        style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}
        entering={FadeInUp.duration(500)}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>{subjectName}</Text>
      </Animated.View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}>
        {syllabus.map((item, index) => (
          <AnimatedPressable
            key={item.id}
            style={[styles.topicCard, { backgroundColor: colors.card }]}
            entering={Platform.OS !== 'web' ? SlideInRight.delay(index * 100).springify() : undefined}
            layout={Platform.OS !== 'web' ? Layout.springify() : undefined}
            onPress={() => router.push({
              pathname: '/lesson',
              params: { 
                title: item.title,
                group: userGroup
              }
            })}>
            <Animated.View 
              style={styles.topicContent}
              entering={Platform.OS !== 'web' ? FadeInRight.delay(index * 150) : undefined}>
              <Text style={[styles.topicTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.topicDescription, { color: colors.secondaryText }]}>{item.description}</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <Animated.View 
                    style={[styles.progressFill, progressStyle, { backgroundColor: colors.primary }]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.secondaryText }]}>0%</Text>
              </View>
            </Animated.View>
            <ChevronRight size={20} color={colors.secondaryText} />
          </AnimatedPressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 60 : 50,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    marginTop: 24,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: width - 32,
    maxWidth: 600,
    alignSelf: 'center',
  },
  topicContent: {
    flex: 1,
    marginRight: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    width: 35,
  },
});