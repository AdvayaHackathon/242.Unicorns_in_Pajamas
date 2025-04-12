import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Play, Pause, ChevronRight, BookOpen } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';
import { Video } from 'expo-av';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const visualLessons = [
  {
    id: 1,
    title: "Understanding Photosynthesis",
    description: "Watch this interactive visualization to understand how plants convert sunlight into energy through photosynthesis. See the process step by step with detailed animations.",
    thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2072&auto=format&fit=crop",
    duration: "5:30",
    subject: "Biology",
    keyPoints: [
      "Light absorption by chlorophyll",
      "Water uptake through roots",
      "CO2 absorption through stomata",
      "Glucose production process",
      "Oxygen release as byproduct"
    ],
    relatedTopics: [
      "Cellular Respiration",
      "Plant Anatomy",
      "Energy Cycles"
    ]
  },
  {
    id: 2,
    title: "The Solar System in 3D",
    description: "Explore our solar system in an immersive 3D experience. Learn about planetary orbits, sizes, and interesting facts about each celestial body.",
    thumbnail: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?q=80&w=2070&auto=format&fit=crop",
    duration: "8:15",
    subject: "Astronomy",
    keyPoints: [
      "Planetary order and distances",
      "Orbital mechanics",
      "Planet compositions",
      "Scale comparisons",
      "Gravitational effects"
    ],
    relatedTopics: [
      "Gravity",
      "Space Exploration",
      "Celestial Mechanics"
    ]
  },
  {
    id: 3,
    title: "Chemical Reactions Visualized",
    description: "Watch chemical reactions come to life with molecular-level animations. Understand how atoms rearrange themselves during different types of reactions.",
    thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2070&auto=format&fit=crop",
    duration: "6:45",
    subject: "Chemistry",
    keyPoints: [
      "Bond breaking and formation",
      "Energy changes",
      "Reaction mechanisms",
      "Catalyst effects",
      "Equilibrium states"
    ],
    relatedTopics: [
      "Thermodynamics",
      "Reaction Kinetics",
      "Molecular Structure"
    ]
  },
  {
    id: 4,
    title: "DNA Structure and Replication",
    description: "Dive into the double helix structure of DNA and watch how it replicates. This visualization breaks down complex molecular processes into easy-to-understand steps.",
    thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
    duration: "7:20",
    subject: "Biology",
    keyPoints: [
      "Double helix structure",
      "Base pair rules",
      "DNA unwinding",
      "Leading strand synthesis",
      "Lagging strand synthesis"
    ],
    relatedTopics: [
      "Genetics",
      "Protein Synthesis",
      "Cell Division"
    ]
  },
  {
    id: 5,
    title: "Wave Properties and Behavior",
    description: "Explore the fascinating world of waves through interactive simulations. See how waves propagate, interfere, and transfer energy in various mediums.",
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop",
    duration: "6:15",
    subject: "Physics",
    keyPoints: [
      "Wave types and properties",
      "Interference patterns",
      "Diffraction phenomena",
      "Standing waves",
      "Energy transfer"
    ],
    relatedTopics: [
      "Sound",
      "Light",
      "Quantum Mechanics"
    ]
  }
];

export default function VisualLearningScreen() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<typeof visualLessons[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const subjects = Array.from(new Set(visualLessons.map(lesson => lesson.subject)));
  const filteredLessons = selectedSubject 
    ? visualLessons.filter(lesson => lesson.subject === selectedSubject)
    : visualLessons;

  const handleLessonSelect = (lesson: typeof visualLessons[0]) => {
    setSelectedLesson(lesson);
    setIsPlaying(false);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
      setIsPlaying(false);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Visual Learning</Text>
      </View>

      {!selectedLesson ? (
        <>
          <ScrollView style={styles.subjectFilter} horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={[
                styles.filterButton,
                { backgroundColor: !selectedSubject ? colors.primary : colors.card }
              ]}
              onPress={() => setSelectedSubject(null)}>
              <Text style={[
                styles.filterText,
                { color: !selectedSubject ? '#fff' : colors.text }
              ]}>All</Text>
            </Pressable>
            {subjects.map((subject) => (
              <Pressable
                key={subject}
                style={[
                  styles.filterButton,
                  { backgroundColor: selectedSubject === subject ? colors.primary : colors.card }
                ]}
                onPress={() => setSelectedSubject(subject)}>
                <Text style={[
                  styles.filterText,
                  { color: selectedSubject === subject ? '#fff' : colors.text }
                ]}>{subject}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView style={styles.content}>
            {filteredLessons.map((lesson, index) => (
              <Animated.View
                key={lesson.id}
                entering={FadeInUp.delay(index * 100)}
                style={[styles.lessonCard, { backgroundColor: colors.card }]}>
                <Pressable onPress={() => handleLessonSelect(lesson)}>
                  <View style={styles.thumbnailContainer}>
                    <Image
                      source={{ uri: lesson.thumbnail }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{lesson.duration}</Text>
                    </View>
                    <View style={styles.playButton}>
                      <Play size={24} color="#fff" fill="#fff" />
                    </View>
                  </View>
                  <View style={styles.lessonContent}>
                    <Text style={[styles.lessonTitle, { color: colors.text }]}>
                      {lesson.title}
                    </Text>
                    <Text style={[styles.lessonSubject, { color: colors.primary }]}>
                      {lesson.subject}
                    </Text>
                    <Text style={[styles.lessonDescription, { color: colors.secondaryText }]}>
                      {lesson.description}
                    </Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.content}>
          <Animated.View 
            entering={FadeInUp}
            style={[styles.videoCard, { backgroundColor: colors.card }]}>
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: selectedLesson.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <Pressable 
                style={[styles.playButton, { backgroundColor: colors.primary }]}
                onPress={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <Pause size={24} color="#fff" />
                ) : (
                  <Play size={24} color="#fff" fill="#fff" />
                )}
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInRight.delay(100)}
            style={[styles.lessonDetails, { backgroundColor: colors.card }]}>
            <Text style={[styles.detailsTitle, { color: colors.text }]}>
              Key Learning Points
            </Text>
            {selectedLesson.keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPoint}>
                <ChevronRight size={16} color={colors.primary} />
                <Text style={[styles.keyPointText, { color: colors.text }]}>
                  {point}
                </Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View 
            entering={FadeInRight.delay(200)}
            style={[styles.relatedTopics, { backgroundColor: colors.card }]}>
            <Text style={[styles.detailsTitle, { color: colors.text }]}>
              Related Topics
            </Text>
            <View style={styles.topicsList}>
              {selectedLesson.relatedTopics.map((topic, index) => (
                <Pressable 
                  key={index}
                  style={[styles.topicChip, { backgroundColor: colors.primary }]}>
                  <BookOpen size={16} color="#fff" />
                  <Text style={styles.topicText}>{topic}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      )}
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
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  subjectFilter: {
    padding: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lessonCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonContent: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    marginBottom: 4,
  },
  lessonSubject: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    lineHeight: 20,
  },
  videoCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  lessonDetails: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginBottom: 12,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  keyPointText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  relatedTopics: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  topicText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
});