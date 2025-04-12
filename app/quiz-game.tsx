import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Star, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

const quizData = {
  mathematics: {
    title: 'Mathematics Quiz',
    questions: [
      {
        question: 'What is the result of 8 × 7?',
        options: ['54', '56', '58', '60'],
        correctAnswer: '56'
      },
      {
        question: 'Which number is a prime number?',
        options: ['1', '4', '17', '21'],
        correctAnswer: '17'
      },
      {
        question: 'What is 25% of 80?',
        options: ['15', '20', '25', '30'],
        correctAnswer: '20'
      },
      {
        question: 'If x + 5 = 12, what is x?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7'
      },
      {
        question: 'What is the area of a square with sides of 6 units?',
        options: ['24', '30', '36', '42'],
        correctAnswer: '36'
      },
      {
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12'
      },
      {
        question: 'Solve: 3x - 7 = 14',
        options: ['5', '7', '8', '9'],
        correctAnswer: '7'
      },
      {
        question: 'What is the perimeter of a rectangle with length 8 and width 5?',
        options: ['13', '20', '26', '40'],
        correctAnswer: '26'
      },
      {
        question: 'What is 15% of 200?',
        options: ['20', '25', '30', '35'],
        correctAnswer: '30'
      },
      {
        question: 'If 2x + 3 = 15, what is x?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '6'
      }
    ]
  },
  science: {
    title: 'Science Quiz',
    questions: [
      {
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Fe', 'Cu'],
        correctAnswer: 'Au'
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars'
      },
      {
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswer: 'Skin'
      },
      {
        question: 'What is the process by which plants make their food?',
        options: ['Photosynthesis', 'Respiration', 'Digestion', 'Absorption'],
        correctAnswer: 'Photosynthesis'
      },
      {
        question: 'Which gas do plants absorb from the air?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 'Carbon Dioxide'
      },
      {
        question: 'What is the smallest unit of matter?',
        options: ['Cell', 'Atom', 'Molecule', 'Electron'],
        correctAnswer: 'Atom'
      },
      {
        question: 'Which force pulls objects towards the Earth\'s center?',
        options: ['Magnetic', 'Electric', 'Gravity', 'Nuclear'],
        correctAnswer: 'Gravity'
      },
      {
        question: 'What is the speed of light in kilometers per second?',
        options: ['200,000', '250,000', '300,000', '350,000'],
        correctAnswer: '300,000'
      },
      {
        question: 'Which blood type is known as the universal donor?',
        options: ['A+', 'B+', 'AB+', 'O-'],
        correctAnswer: 'O-'
      },
      {
        question: 'What is the chemical formula for water?',
        options: ['CO2', 'H2O', 'O2', 'N2'],
        correctAnswer: 'H2O'
      }
    ]
  }
};

export default function QuizGameScreen() {
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const colors = themes[theme];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizType = params.type as keyof typeof quizData;
  const quiz = quizData[quizType];

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getStars = (score: number) => {
    if (score >= 10) return 3;
    if (score >= 7) return 2;
    if (score >= 4) return 1;
    return 0;
  };

  const renderStars = (count: number) => {
    return Array(3).fill(0).map((_, index) => (
      <Star 
        key={index}
        size={32}
        color={index < count ? colors.primary : colors.border}
        fill={index < count ? colors.primary : 'none'}
      />
    ));
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const getOptionStyle = (option: string) => {
    if (!isAnswered) return { backgroundColor: colors.card };
    
    if (option === quiz.questions[currentQuestion].correctAnswer) {
      return { backgroundColor: colors.success };
    }
    
    if (option === selectedAnswer && option !== quiz.questions[currentQuestion].correctAnswer) {
      return { backgroundColor: colors.danger };
    }
    
    return { backgroundColor: colors.card };
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  const handleBack = () => {
    router.replace('/(tabs)/quiz');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>{quiz.title}</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        {!showResult ? (
          <>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <Animated.View 
                style={[
                  styles.progressFill,
                  { 
                    backgroundColor: colors.primary,
                    width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`
                  }
                ]}
              />
            </View>

            <Text style={[styles.questionCount, { color: colors.secondaryText }]}>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Text>

            <Text style={[styles.question, { color: colors.text }]}>
              {quiz.questions[currentQuestion].question}
            </Text>

            <View style={styles.options}>
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeInDown.delay(index * 100)}>
                  <Pressable
                    style={[
                      styles.option,
                      getOptionStyle(option),
                    ]}
                    onPress={() => handleAnswer(option)}
                    disabled={isAnswered}>
                    <Text style={[
                      styles.optionText,
                      { color: isAnswered && (
                        option === quiz.questions[currentQuestion].correctAnswer ||
                        option === selectedAnswer
                      ) ? '#fff' : colors.text }
                    ]}>
                      {option}
                    </Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.resultContainer}>
            <View style={[styles.scoreCard, { backgroundColor: colors.card }]}>
              {score > quiz.questions.length / 2 ? (
                <CheckCircle2 size={64} color={colors.success} />
              ) : (
                <XCircle size={64} color={colors.danger} />
              )}
              <Text style={[styles.scoreText, { color: colors.text }]}>
                Your Score: {score}/{quiz.questions.length}
              </Text>
              <View style={styles.starsContainer}>
                {renderStars(getStars(score))}
              </View>
              <Text style={[styles.starMessage, { color: colors.secondaryText }]}>
                {getStars(score) === 3 ? 'Perfect! All stars earned!' :
                 getStars(score) === 2 ? 'Great job! Almost there!' :
                 getStars(score) === 1 ? 'Good start! Keep practicing!' :
                 'Try again to earn stars!'}
              </Text>
            </View>

            <Pressable
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </Pressable>
          </View>
        )}
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
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  questionCount: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    marginBottom: 8,
  },
  question: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  resultContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  scoreCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    marginTop: 16,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  starMessage: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});