import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Briefcase, GraduationCap, DollarSign, Clock, Building2, ChevronRight, Star, Trophy } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';
import Animated, { 
  FadeInDown, 
  FadeInRight, 
  withSpring, 
  withSequence, 
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const careerPaths = [
  {
    id: 1,
    field: "Technology & Computer Science",
    careers: [
      {
        title: "Software Engineer",
        description: "Design and develop software applications and systems",
        salary: "$70,000 - $150,000+",
        education: "Bachelor's in Computer Science",
        duration: "4 years",
        skills: ["Programming", "Problem Solving", "Algorithms", "Software Design"],
        companies: ["Google", "Microsoft", "Apple", "Amazon"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data sets to help guide business decisions",
        salary: "$80,000 - $160,000+",
        education: "Master's in Data Science/Statistics",
        duration: "5-6 years",
        skills: ["Statistics", "Machine Learning", "Python", "Data Analysis"],
        companies: ["Facebook", "Netflix", "IBM", "Twitter"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
      }
    ]
  },
  {
    id: 2,
    field: "Healthcare & Medicine",
    careers: [
      {
        title: "Medical Doctor",
        description: "Diagnose and treat patients in various medical specialties",
        salary: "$200,000 - $400,000+",
        education: "MD (Medical Doctor)",
        duration: "8+ years",
        skills: ["Clinical Skills", "Patient Care", "Medical Knowledge", "Communication"],
        companies: ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60"
      },
      {
        title: "Biomedical Engineer",
        description: "Design and develop medical equipment and devices",
        salary: "$65,000 - $130,000+",
        education: "Bachelor's/Master's in Biomedical Engineering",
        duration: "4-6 years",
        skills: ["Engineering", "Biology", "Medical Device Design", "Problem Solving"],
        companies: ["Medtronic", "Johnson & Johnson", "Siemens Healthineers"],
        image: "https://images.unsplash.com/photo-1581093458791-9f3c3900b7e0?w=800&auto=format&fit=crop&q=60"
      }
    ]
  },
  {
    id: 3,
    field: "Business & Finance",
    careers: [
      {
        title: "Investment Banker",
        description: "Assist organizations with financial transactions and strategies",
        salary: "$85,000 - $200,000+",
        education: "Bachelor's in Finance/Economics",
        duration: "4 years",
        skills: ["Financial Analysis", "Negotiation", "Market Research", "Modeling"],
        companies: ["Goldman Sachs", "Morgan Stanley", "JP Morgan"],
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60"
      },
      {
        title: "Management Consultant",
        description: "Help organizations improve performance and operations",
        salary: "$75,000 - $170,000+",
        education: "Bachelor's/MBA",
        duration: "4-6 years",
        skills: ["Problem Solving", "Analytics", "Strategy", "Communication"],
        companies: ["McKinsey", "BCG", "Bain & Company"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
      }
    ]
  }
];

const CareerQuiz = ({ career, onComplete }) => {
  const { theme } = useTheme();
  const colors = themes[theme];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const scale = useSharedValue(1);
  
  const questions = [
    {
      text: `What education level is required for a ${career.title}?`,
      options: [
        "High School Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD"
      ],
      correct: career.education.includes("Bachelor") ? 1 : 
               career.education.includes("Master") ? 2 :
               career.education.includes("PhD") ? 3 : 0
    },
    {
      text: `Which skill is NOT typically required for a ${career.title}?`,
      options: [
        ...career.skills.slice(0, 3),
        "Foreign Language"
      ],
      correct: 3
    },
    {
      text: `What is the typical starting salary for a ${career.title}?`,
      options: [
        "$30,000 - $50,000",
        "$50,000 - $70,000",
        "$70,000 - $90,000",
        "$90,000+"
      ],
      correct: parseInt(career.salary.match(/\d+/)[0]) > 80 ? 3 : 2
    }
  ];

  const handleAnswer = (index) => {
    scale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );

    if (index === questions[currentQuestion].correct) {
      setScore(s => s + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      onComplete(score + (index === questions[currentQuestion].correct ? 1 : 0));
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View 
      entering={FadeInDown}
      style={[styles.quizContainer, { backgroundColor: colors.card }]}
    >
      <Text style={[styles.quizTitle, { color: colors.text }]}>
        Career Knowledge Quiz
      </Text>
      <Text style={[styles.quizProgress, { color: colors.secondaryText }]}>
        Question {currentQuestion + 1} of {questions.length}
      </Text>
      
      <Text style={[styles.questionText, { color: colors.text }]}>
        {questions[currentQuestion].text}
      </Text>

      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(index * 100)}
            style={animatedStyle}
          >
            <Pressable
              style={[styles.optionButton, { backgroundColor: colors.primary }]}
              onPress={() => handleAnswer(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};

const CareerGameResult = ({ score, career, onClose }) => {
  const { theme } = useTheme();
  const colors = themes[theme];
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    rotation.value = withSpring(720);
    scale.value = withSpring(1);
  }, []);

  const trophyStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ]
  }));

  return (
    <Animated.View 
      entering={FadeInDown}
      style={[styles.resultContainer, { backgroundColor: colors.card }]}
    >
      <Animated.View style={[styles.trophyContainer, trophyStyle]}>
        <Trophy size={64} color={colors.primary} />
      </Animated.View>

      <Text style={[styles.resultTitle, { color: colors.text }]}>
        {score === 3 ? 'Perfect Score! 🎉' :
         score === 2 ? 'Great Job! 🌟' :
         'Good Try! 👍'}
      </Text>

      <Text style={[styles.resultText, { color: colors.secondaryText }]}>
        You got {score} out of 3 questions correct about being a {career.title}!
      </Text>

      <View style={styles.starsContainer}>
        {[...Array(3)].map((_, i) => (
          <Star
            key={i}
            size={32}
            color={i < score ? colors.primary : colors.border}
            fill={i < score ? colors.primary : 'none'}
          />
        ))}
      </View>

      <Pressable
        style={[styles.closeButton, { backgroundColor: colors.primary }]}
        onPress={onClose}
      >
        <Text style={styles.closeButtonText}>Continue Exploring</Text>
      </Pressable>
    </Animated.View>
  );
};

export default function CareerPathsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<any | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleBack = () => {
    if (selectedCareer) {
      setSelectedCareer(null);
    } else if (selectedField) {
      setSelectedField(null);
    } else {
      router.back();
    }
  };

  const renderCareerDetail = (career: any) => (
    <Animated.View 
      entering={FadeInRight}
      style={[styles.careerDetail, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: career.image }} style={styles.careerImage} />
      
      <View style={styles.detailContent}>
        <Text style={[styles.careerTitle, { color: colors.text }]}>{career.title}</Text>
        <Text style={[styles.description, { color: colors.secondaryText }]}>
          {career.description}
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <DollarSign size={20} color={colors.primary} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Salary Range</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{career.salary}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <GraduationCap size={20} color={colors.primary} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Education</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{career.education}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Clock size={20} color={colors.primary} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Duration</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{career.duration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Skills</Text>
          <View style={styles.skillsGrid}>
            {career.skills.map((skill: string, index: number) => (
              <View 
                key={index}
                style={[styles.skillChip, { backgroundColor: colors.primary + '20' }]}
              >
                <Text style={[styles.skillText, { color: colors.primary }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Companies</Text>
          <View style={styles.companiesGrid}>
            {career.companies.map((company: string, index: number) => (
              <View 
                key={index}
                style={[styles.companyItem, { backgroundColor: colors.card }]}
              >
                <Building2 size={20} color={colors.text} />
                <Text style={[styles.companyName, { color: colors.text }]}>{company}</Text>
              </View>
            ))}
          </View>
        </View>

        {!showQuiz && !quizScore && (
          <Pressable
            style={[styles.quizButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowQuiz(true)}
          >
            <GraduationCap size={24} color="#fff" />
            <Text style={styles.quizButtonText}>Take Career Quiz</Text>
          </Pressable>
        )}

        {showQuiz && (
          <CareerQuiz
            career={selectedCareer}
            onComplete={(score) => {
              setShowQuiz(false);
              setQuizScore(score);
            }}
          />
        )}

        {quizScore !== null && !showQuiz && (
          <CareerGameResult
            score={quizScore}
            career={selectedCareer}
            onClose={() => setQuizScore(null)}
          />
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>
          {selectedCareer ? selectedCareer.title :
           selectedField ? selectedField :
           'Career Paths'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {!selectedField && (
          <View style={styles.fieldsGrid}>
            {careerPaths.map((field, index) => (
              <Animated.View
                key={field.id}
                entering={FadeInDown.delay(index * 100)}
                style={[styles.fieldCard, { backgroundColor: colors.card }]}
              >
                <Pressable 
                  style={styles.fieldContent}
                  onPress={() => setSelectedField(field.field)}
                >
                  <View style={styles.fieldHeader}>
                    <Briefcase size={24} color={colors.primary} />
                    <Text style={[styles.fieldTitle, { color: colors.text }]}>
                      {field.field}
                    </Text>
                  </View>
                  <Text style={[styles.fieldDescription, { color: colors.secondaryText }]}>
                    {field.careers.length} career paths available
                  </Text>
                  <ChevronRight size={20} color={colors.secondaryText} />
                </Pressable>
              </Animated.View>
            ))}
          </View>
        )}

        {selectedField && !selectedCareer && (
          <View style={styles.careersList}>
            {careerPaths
              .find(f => f.field === selectedField)
              ?.careers.map((career, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInDown.delay(index * 100)}
                  style={[styles.careerCard, { backgroundColor: colors.card }]}
                >
                  <Pressable 
                    style={styles.careerContent}
                    onPress={() => setSelectedCareer(career)}
                  >
                    <Image source={{ uri: career.image }} style={styles.careerPreviewImage} />
                    <View style={styles.careerInfo}>
                      <Text style={[styles.careerTitle, { color: colors.text }]}>
                        {career.title}
                      </Text>
                      <Text style={[styles.careerDescription, { color: colors.secondaryText }]}>
                        {career.description}
                      </Text>
                      <View style={styles.careerMeta}>
                        <View style={styles.metaItem}>
                          <DollarSign size={16} color={colors.primary} />
                          <Text style={[styles.metaText, { color: colors.secondaryText }]}>
                            {career.salary}
                          </Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Clock size={16} color={colors.primary} />
                          <Text style={[styles.metaText, { color: colors.secondaryText }]}>
                            {career.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <ChevronRight size={20} color={colors.secondaryText} />
                  </Pressable>
                </Animated.View>
              ))}
          </View>
        )}

        {selectedCareer && renderCareerDetail(selectedCareer)}
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
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  fieldsGrid: {
    padding: 16,
    gap: 16,
  },
  fieldCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fieldContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  fieldDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    marginRight: 12,
  },
  careersList: {
    padding: 16,
    gap: 16,
  },
  careerCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  careerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  careerPreviewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  careerInfo: {
    flex: 1,
    marginRight: 12,
  },
  careerTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    marginBottom: 4,
  },
  careerDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    marginBottom: 8,
  },
  careerMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
  },
  careerDetail: {
    borderRadius: 24,
    margin: 16,
    overflow: 'hidden',
  },
  careerImage: {
    width: '100%',
    height: 200,
  },
  detailContent: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: width > 768 ? (width - 120) / 3 : (width - 80) / 2,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginBottom: 12,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  companiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  quizContainer: {
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  quizTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  quizProgress: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  resultContainer: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  trophyContainer: {
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});