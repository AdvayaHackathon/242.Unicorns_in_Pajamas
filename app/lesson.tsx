// import { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
// import { ArrowLeft, Upload, Send, Image as ImageIcon } from 'lucide-react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useTheme, themes } from '@/context/ThemeContext';

// const lessonContent = {
//   // Pre-Primary Content
//   'Numbers and Counting': {
//     group: 'Pre-Primary',
//     introduction: "Let's explore the magical world of numbers! We'll learn to count objects, recognize numbers, and understand basic counting concepts through fun activities.",
//     activity: {
//       title: "Counting Adventure",
//       description: "Find different objects around you (toys, crayons, or blocks) and practice counting them. Take a photo of your counting arrangement!",
//       questions: [
//         "How many objects did you count?",
//         "Can you group them by color?",
//         "Which group has the most items?",
//         "Can you count backward from that number?"
//       ]
//     }
//   },
//   'My Body': {
//     group: 'Pre-Primary',
//     introduction: "Today we'll learn about the amazing parts of our body! We'll discover what each part does and how they help us every day.",
//     activity: {
//       title: "Body Parts Discovery",
//       description: "Point to different parts of your body and take photos showing what each part can do (like hands clapping or feet jumping).",
//       questions: [
//         "What body parts did you show in your photo?",
//         "What can you do with these body parts?",
//         "Why are these body parts important?",
//         "What other body parts work together with these?"
//       ]
//     }
//   },

//   // Primary Content
//   'Addition and Subtraction': {
//     group: 'Primary',
//     introduction: "We'll master the basics of adding and subtracting numbers. Learn how these operations work in real-life situations and solve practical problems.",
//     activity: {
//       title: "Real-World Math",
//       description: "Create your own math story using objects around you. Take photos showing addition or subtraction in action!",
//       questions: [
//         "What numbers did you use in your story?",
//         "How did you show the operation?",
//         "What was the result?",
//         "Can you create another problem with the same numbers?"
//       ]
//     }
//   },

//   // Middle School Content
//   'Algebra Basics': {
//     group: 'Middle',
//     introduction: "In this chapter, we'll explore the fundamental concepts of algebra, including variables, expressions, and equations. We'll learn how algebra helps us solve real-world problems.",
//     activity: {
//       title: "Algebraic Expression Challenge",
//       description: "Create visual representations of algebraic expressions using objects or drawings. For example, show how 2x + 3 looks with real items.",
//       questions: [
//         "What expression did you represent?",
//         "How did you show the variables?",
//         "What do the numbers represent?",
//         "Can you write an equation using your expression?"
//       ]
//     }
//   },
//   'Cell Biology': {
//     group: 'Middle',
//     introduction: "Discover the fascinating world of cells - the building blocks of life. We'll explore cell structures, functions, and how they work together in living organisms.",
//     activity: {
//       title: "Cell Model Creation",
//       description: "Create and photograph a model of a cell using household items. Label each part and explain its function.",
//       questions: [
//         "What cell parts did you include?",
//         "How did you represent each organelle?",
//         "What is the function of each part?",
//         "How do these parts work together?"
//       ]
//     }
//   },

//   // High School Content
//   'Advanced Algebra': {
//     group: 'High',
//     introduction: "This advanced course covers complex algebraic concepts, including quadratic equations, functions, and their applications in real-world scenarios.",
//     activity: {
//       title: "Function Visualization",
//       description: "Create and photograph graphs of different functions, showing how they transform and relate to real-world situations.",
//       questions: [
//         "What type of function did you graph?",
//         "How does changing parameters affect the graph?",
//         "What real-world scenario does this represent?",
//         "Can you predict other points on the graph?"
//       ]
//     }
//   },
//   'Molecular Biology': {
//     group: 'High',
//     introduction: "Explore the molecular basis of life, including DNA structure, protein synthesis, and genetic processes that govern cellular function.",
//     activity: {
//       title: "DNA Model Construction",
//       description: "Build and photograph a model of DNA using available materials, showing the double helix structure and base pairing.",
//       questions: [
//         "How did you represent the DNA structure?",
//         "What materials did you use for different parts?",
//         "Can you explain base pairing rules?",
//         "How does this structure enable DNA replication?"
//       ]
//     }
//   }
// };

// export default function LessonScreen() {
//   const params = useLocalSearchParams();
//   const { theme } = useTheme();
//   const colors = themes[theme];
//   const [image, setImage] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<string[]>([]);
//   const [submitted, setSubmitted] = useState(false);

//   const lessonTitle = params.title as string;
//   const userGroup = params.group as string;
//   const lesson = lessonContent[lessonTitle as keyof typeof lessonContent];

//   const [fontsLoaded] = useFonts({
//     'Nunito-Bold': Nunito_700Bold,
//     'Nunito-Regular': Nunito_400Regular,
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

//   // Check if lesson exists and belongs to user's group
//   if (!lesson || lesson.group !== userGroup) {
//     return (
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         <View style={[styles.header, { backgroundColor: colors.background }]}>
//           <Pressable style={styles.backButton} onPress={() => router.back()}>
//             <ArrowLeft size={24} color={colors.text} />
//           </Pressable>
//           <Text style={[styles.title, { color: colors.text }]}>Lesson Not Found</Text>
//         </View>
//         <View style={[styles.section, { backgroundColor: colors.card }]}>
//           <Text style={[styles.text, { color: colors.secondaryText }]}>
//             Sorry, the lesson "{lessonTitle}" is not available for your learning group.
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets[0].uri) {
//       setImage(result.assets[0].uri);
//       setSubmitted(false);
//     }
//   };

//   const handleSubmit = () => {
//     if (answers.length === lesson.activity.questions.length && image) {
//       setSubmitted(true);
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <View style={[styles.header, { backgroundColor: colors.background }]}>
//         <Pressable style={styles.backButton} onPress={() => router.back()}>
//           <ArrowLeft size={24} color={colors.text} />
//         </Pressable>
//         <Text style={[styles.title, { color: colors.text }]}>{lessonTitle}</Text>
//       </View>

//       <ScrollView style={styles.content}>
//         <View style={[styles.section, { backgroundColor: colors.card }]}>
//           <Text style={[styles.sectionTitle, { color: colors.text }]}>Introduction</Text>
//           <Text style={[styles.text, { color: colors.secondaryText }]}>{lesson.introduction}</Text>
//         </View>

//         <View style={[styles.section, { backgroundColor: colors.card }]}>
//           <Text style={[styles.sectionTitle, { color: colors.text }]}>{lesson.activity.title}</Text>
//           <Text style={[styles.text, { color: colors.secondaryText }]}>{lesson.activity.description}</Text>

          
//         </View>

        
//           <View style={[styles.section, { backgroundColor: colors.card }]}>
//             <Text style={[styles.sectionTitle, { color: colors.text }]}>Questions</Text>
//             {lesson.activity.questions.map((question, index) => (
//               <View key={index} style={styles.questionContainer}>
//                 <Text style={[styles.question, { color: colors.text }]}>{question}</Text>
//                 <TextInput
//                   style={[styles.input, { 
//                     backgroundColor: colors.background,
//                     color: colors.text,
//                     borderColor: colors.border
//                   }]}
//                   value={answers[index] || ''}
//                   onChangeText={(text) => {
//                     const newAnswers = [...answers];
//                     newAnswers[index] = text;
//                     setAnswers(newAnswers);
//                   }}
//                   placeholder="Type your answer..."
//                   placeholderTextColor={colors.secondaryText}
//                   multiline
//                 />
//               </View>
//             ))}

//             <Pressable 
//               style={[
//                 styles.submitButton, 
//                 { backgroundColor: colors.primary },
//                 submitted && { backgroundColor: colors.success }
//               ]} 
//               onPress={handleSubmit}>
//               <Send size={20} color="#fff" />
//               <Text style={styles.buttonText}>
//                 {submitted ? 'Submitted!' : 'Submit Answers'}
//               </Text>
//             </Pressable>
//           </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: 'Nunito-Bold',
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   section: {
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontFamily: 'Nunito-Bold',
//     marginBottom: 12,
//   },
//   text: {
//     fontSize: 16,
//     fontFamily: 'Nunito-Regular',
//     lineHeight: 24,
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 16,
//     gap: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: 'Nunito-Bold',
//   },
//   uploadedImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   questionContainer: {
//     marginBottom: 16,
//   },
//   question: {
//     fontSize: 16,
//     fontFamily: 'Nunito-Bold',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     fontFamily: 'Nunito-Regular',
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   submitButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 24,
//     gap: 8,
//   },
// });

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Upload, Send, Image as ImageIcon, Volume2, ChevronDown, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme, themes } from '@/context/ThemeContext';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import * as Speech from 'expo-speech';
import Modal from 'react-native-modal';

type Lesson = {
  introduction: string;
  video: string;
  activity: {
    title: string;
    description: string;
    questions: string[];
  };
};

type TranslatedContent = {
  introduction?: string;
  activityTitle?: string;
  activityDescription?: string;
  questions?: string[];
}

// Available language options for text-to-speech
const languageOptions = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'ml-IN', name: 'Malayalam' },
  { code: 'kn-IN', name: 'Kannada' },
];

const lessonContent = {
  'Numbers and Operations': {
    introduction: "In this chapter, we'll explore the fundamental concepts of numbers and basic arithmetic operations. We'll learn how these concepts apply to real-world situations and develop problem-solving skills.",
    video: "https://example.com/math-operations-video.mp4",
    activity: {
      title: "Real-World Math Challenge",
      description: "Watch the video about multiplication and division strategies. Then take a photo of any group of objects (fruits, toys, etc.) and arrange them to demonstrate addition or multiplication. For example, arrange 3 groups of 4 apples to show 3 × 4 = 12.",
      questions: [
        "How many objects did you use in total?",
        "What mathematical operation does your arrangement demonstrate?",
        "Can you write an equation that represents your arrangement?",
        "How would you explain this concept to a friend?",
        "Based on the video, which strategy would work best to solve your equation mentally?",
        "If you were to rearrange your objects to show division instead, how would you do it?"
      ]
    }
  },
  'Algebra Basics': {
    introduction: "Welcome to the exciting world of algebra where letters and numbers come together to solve puzzles! In this chapter, we'll discover how variables and equations help us solve real-world problems and find unknown values.",
    video: "https://example.com/algebra-fun-video.mp4",
    activity: {
      title: "Algebra Scavenger Hunt",
      description: "Watch the video about how algebra is all around us. Then, find and take photos of real-life situations that can be represented by algebraic equations. For example, a seesaw at the park demonstrates balance equations, or different-sized packages show proportional relationships.",
      questions: [
        "What real-life situation did you capture in your photo?",
        "Write an algebraic equation that represents this situation, using variables for unknown quantities.",
        "Explain what each variable in your equation represents in the real world.",
        "If you could measure or count the quantities in your photo, what would the solution to your equation be?",
        "How could you modify your real-life situation to create a different equation?",
        "In the video, they showed how algebra helps solve puzzles. How could you turn your situation into a fun puzzle for a friend to solve?"
      ]
    }
  },
  'Geometry': {
    introduction: "Geometry isn't just shapes on paper – it's the architecture of the world around us! In this chapter, we'll explore how angles, shapes, and spatial relationships create the structures we see every day.",
    video: "https://example.com/geometry-everywhere-video.mp4",
    activity: {
      title: "Geometry Detective",
      description: "After watching the video about geometric shapes and patterns in our world, become a geometry detective! Take photos of interesting geometric shapes, patterns, or symmetry you find in your environment. Look for circles, triangles, parallel lines, or interesting angles in buildings, nature, or everyday objects.",
      questions: [
        "What geometric shapes or patterns did you discover in your photo?",
        "Identify at least three geometric properties or concepts visible in your image (like parallel lines, right angles, symmetry, etc.).",
        "If you could measure parts of your image, what calculations could you perform? (Area, perimeter, angles, etc.)",
        "How does the geometry in your photo serve a practical purpose or create visual appeal?",
        "In the video, they discussed how geometric principles help engineers and architects. How might these principles apply to your photo?",
        "Design a simple geometry puzzle based on your photo that challenges someone to find or calculate something specific."
      ]
    }
  },
  'Physical Science': {
    introduction: "This chapter explores the fundamental properties of matter and energy. We'll investigate how different materials interact and learn about basic physics concepts through hands-on experiments.",
    video: "https://example.com/states-of-matter-video.mp4",
    activity: {
      title: "States of Matter Investigation",
      description: "Watch the video about the states of matter and phase transitions. Then find examples of different states of matter in your surroundings (solid, liquid, gas) and take photos. For example, an ice cube melting into water shows the transition between states.",
      questions: [
        "What states of matter are shown in your photo?",
        "What caused the change in state (if applicable)?",
        "Can you describe the molecular arrangement in each state?",
        "Where else might you observe similar changes?",
        "In the video, they discussed temperature affecting state changes. What temperature changes would affect your example?",
        "Can you explain how energy is involved in the state transitions you observed, as shown in the video?"
      ]
    }
  },
  'Reading Comprehension': {
    introduction: "In this chapter, we'll develop critical reading skills by analyzing texts, identifying main ideas, and understanding context clues. We'll learn strategies to better comprehend and interpret written material.",
    video: "https://example.com/visual-storytelling-video.mp4",
    activity: {
      title: "Visual Story Analysis",
      description: "Watch the video about visual storytelling elements. Then take a photo of an interesting scene (from a book, magazine, or your surroundings) and analyze its story elements. What story does this image tell?",
      questions: [
        "What's the main subject or focus of your image?",
        "What emotions or mood does the image convey?",
        "What details support your interpretation?",
        "How would you continue this story?",
        "Based on the video, which visual storytelling technique is most prominent in your image?",
        "How could you change one element in your image to create a different mood, as discussed in the video?"
      ]
    }
  },
  'Statistics': {
    introduction: "In this chapter, we'll explore the fundamental concepts of statistics, including data collection, analysis, and interpretation. We'll learn how to represent data visually and draw meaningful conclusions.",
    video: "https://example.com/data-visualization-video.mp4",
    activity: {
      title: "Real-World Data Collection",
      description: "Watch the video about effective data visualization methods. Then take photos of real-world data examples (charts, graphs, or collect your own data) and analyze the patterns. For example, track and graph daily temperatures or survey classmates on a topic.",
      questions: [
        "What type of data did you collect or observe?",
        "How is the data represented (graph type, chart, etc.)?",
        "What patterns or trends can you identify?",
        "What conclusions can you draw from this data?",
        "According to the video, is this the most effective way to visualize this type of data? Why or why not?",
        "How could you improve the data visualization based on the principles shown in the video?"
      ]
    }
  }
};

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const colors = themes[theme];
  const [image, setImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [videoStatus, setVideoStatus] = useState({});
  const [solutionImage, setSolutionImage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<TranslatedContent>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [speakingType, setSpeakingType] = useState<string | null>(null);

  const lessonTitle = params.title as string;
  const lesson: Lesson = lessonContent[lessonTitle as keyof typeof lessonContent];

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  useEffect(() => {
    // Clean up TTS on unmount
    return () => {
      Speech.stop();
    };
  }, []);

  // Effect to translate content when language changes
  useEffect(() => {
    if (selectedLanguage.code !== 'en-US') {
      translateAllContent();
    } else {
      // Reset translations when switching back to English
      setTranslatedContent({});
    }
  }, [selectedLanguage]);

  if (!fontsLoaded) {
    return null;
  }

  if (!lesson) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <Pressable style={styles.backButton} onPress={() => router.replace('/(tabs)')}>
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>Lesson Not Found</Text>
        </View>
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.text, { color: colors.secondaryText }]}>
            Sorry, the lesson "{lessonTitle}" is not available.
          </Text>
        </View>
      </View>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      setSubmitted(false);
    }
  };

  const pickSolutionImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setSolutionImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (answers.length === lesson.activity.questions.length && image) {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleVideoStatusUpdate = (status: AVPlaybackStatus) => {
    setVideoStatus(status);
  };

  const isAlgebraOrGeometry = lessonTitle === 'Algebra Adventures' || lessonTitle === 'Geometry in Action';

  // Translate all content elements of the lesson
  const translateAllContent = async () => {
    if (selectedLanguage.code === 'en-US') return;
    
    setIsTranslating(true);
    try {
      // In a real app, you would batch these together for efficiency
      const translatedIntro = await translateText(lesson.introduction, selectedLanguage.code);
      const translatedTitle = await translateText(lesson.activity.title, selectedLanguage.code);
      const translatedDesc = await translateText(lesson.activity.description, selectedLanguage.code);
      
      // Translate each question
      const translatedQuestions = await Promise.all(
        lesson.activity.questions.map(q => translateText(q, selectedLanguage.code))
      );
      
      setTranslatedContent({
        introduction: Array.isArray(translatedIntro) ? translatedIntro.join(' ') : translatedIntro,
        activityTitle: Array.isArray(translatedTitle) ? translatedTitle.join(' ') : translatedTitle,
        activityDescription: Array.isArray(translatedDesc) ? translatedDesc.join(' ') : translatedDesc,
        questions: translatedQuestions.flat()
      });
      
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Function to translate text to selected language
  const translateText = async (text: string, targetLanguageCode: string) => {
    // In a real app, you would use a translation API here
    // This is a mock implementation since we can't make actual API calls
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, we'll return the original text with a prefix
    // In a real app, this would be the translated text
    return `[${selectedLanguage.name}] ${text}`;
  };

  // Function to get the text content to speak based on type
  const getTextToSpeak = (type: string) => {
    switch (type) {
      case 'introduction':
        return translatedContent.introduction || lesson.introduction;
      case 'activity':
        const title = translatedContent.activityTitle || lesson.activity.title;
        const desc = translatedContent.activityDescription || lesson.activity.description;
        return `${title}. ${desc}`;
      case 'questions':
        const questions = translatedContent.questions || lesson.activity.questions;
        return questions.join('. ');
      case 'all':
        const intro = translatedContent.introduction || lesson.introduction;
        const actTitle = translatedContent.activityTitle || lesson.activity.title;
        const actDesc = translatedContent.activityDescription || lesson.activity.description;
        const allQuestions = translatedContent.questions || lesson.activity.questions;
        
        return `${intro}. ${actTitle}. ${actDesc}. Questions: ${allQuestions.join('. ')}`;
      default:
        return '';
    }
  };

  // Generic function to speak any text content
  const speakContent = (type: string) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setSpeakingType(null);
      return;
    }

    const textToSpeak = getTextToSpeak(type);
    if (!textToSpeak) return;
    
    setIsSpeaking(true);
    setSpeakingType(type);
    
    Speech.speak(textToSpeak, {
      language: selectedLanguage.code,
      onDone: () => {
        setIsSpeaking(false);
        setSpeakingType(null);
      },
      onError: () => {
        setIsSpeaking(false);
        setSpeakingType(null);
      },
      pitch: 1.0,
      rate: 0.9,
    });
  };

  const stopSpeaking = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setSpeakingType(null);
    }
  };

  // Change language and translate all content
  const changeLanguage = (language: typeof languageOptions[0]) => {
    stopSpeaking();
    setSelectedLanguage(language);
    setShowLanguageModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>{lessonTitle}</Text>
        
        {/* Global language control in header */}
        <View style={styles.headerLanguageControl}>
          <Pressable 
            style={[styles.languageButton, { backgroundColor: colors.primary }]} 
            onPress={() => setShowLanguageModal(true)}>
            <Text style={styles.smallButtonText}>{selectedLanguage.name}</Text>
            <ChevronDown size={16} color="#fff" />
          </Pressable>
          
          {/* Global TTS button */}
          <Pressable 
            style={[
              styles.audioButton, 
              { backgroundColor: isSpeaking && speakingType === 'all' ? colors.danger : colors.success }
            ]} 
            onPress={() => speakContent('all')}
            disabled={isTranslating}>
            <Volume2 size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.titleWithActions}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Introduction</Text>
            <Pressable 
              style={[
                styles.audioButton, 
                { backgroundColor: isSpeaking && speakingType === 'introduction' ? colors.danger : colors.success }
              ]} 
              onPress={() => speakContent('introduction')}
              disabled={isTranslating}>
              <Volume2 size={20} color="#fff" />
            </Pressable>
          </View>
          
          {isTranslating ? (
            <Text style={[styles.text, { color: colors.secondaryText, fontStyle: 'italic' }]}>
              Translating to {selectedLanguage.name}...
            </Text>
          ) : (
            <Text style={[styles.text, { color: colors.secondaryText }]}>
              {translatedContent.introduction || lesson.introduction}
            </Text>
          )}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Video Lesson</Text>
          <Text style={[styles.text, { color: colors.secondaryText, marginBottom: 10 }]}>
            Watch this video to learn key concepts for this activity.
          </Text>
          <Video
            source={{ uri: lesson.video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.COVER}
            shouldPlay={false}
            useNativeControls
            style={styles.video}
            onPlaybackStatusUpdate={handleVideoStatusUpdate}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.titleWithActions}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {translatedContent.activityTitle || lesson.activity.title}
            </Text>
            <Pressable 
              style={[
                styles.audioButton, 
                { backgroundColor: isSpeaking && speakingType === 'activity' ? colors.danger : colors.success }
              ]} 
              onPress={() => speakContent('activity')}
              disabled={isTranslating}>
              <Volume2 size={20} color="#fff" />
            </Pressable>
          </View>

          {isTranslating ? (
            <Text style={[styles.text, { color: colors.secondaryText, fontStyle: 'italic' }]}>
              Translating to {selectedLanguage.name}...
            </Text>
          ) : (
            <Text style={[styles.text, { color: colors.secondaryText }]}>
              {translatedContent.activityDescription || lesson.activity.description}
            </Text>
          )}

          
        </View>

        {isAlgebraOrGeometry && (
          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Solution Work</Text>
            <Text style={[styles.text, { color: colors.secondaryText }]}>
              Upload a photo of your written work showing how you solved the problem or created your equations.
              You can include diagrams, calculations, or any working that shows your mathematical thinking!
            </Text>

            <Pressable 
              style={[styles.uploadButton, { backgroundColor: colors.primary, marginTop: 16 }]} 
              onPress={pickSolutionImage}>
              {solutionImage ? (
                <ImageIcon size={24} color="#fff" />
              ) : (
                <Upload size={24} color="#fff" />
              )}
              <Text style={styles.buttonText}>
                {solutionImage ? 'Change Solution Image' : 'Upload Solution Work'}
              </Text>
            </Pressable>

            {solutionImage && (
              <Image source={{ uri: solutionImage }} style={styles.uploadedImage} />
            )}
          </View>
        )}

        
          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <View style={styles.titleWithActions}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Questions</Text>
              <Pressable 
                style={[
                  styles.audioButton, 
                  { backgroundColor: isSpeaking && speakingType === 'questions' ? colors.danger : colors.success }
                ]} 
                onPress={() => speakContent('questions')}
                disabled={isTranslating}>
                <Volume2 size={20} color="#fff" />
              </Pressable>
            </View>
            
            {lesson.activity.questions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={[styles.question, { color: colors.text }]}>
                  {translatedContent.questions ? translatedContent.questions[index] : question}
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border
                  }]}
                  value={answers[index] || ''}
                  onChangeText={(text) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = text;
                    setAnswers(newAnswers);
                  }}
                  placeholder="Type your answer..."
                  placeholderTextColor={colors.secondaryText}
                  multiline
                />
              </View>
            ))}

            <Pressable 
              style={[
                styles.submitButton, 
                { backgroundColor: colors.primary },
                submitted && { backgroundColor: colors.success }
              ]} 
              onPress={handleSubmit}>
              <Send size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {submitted ? 'Submitted!' : 'Submit Answers'}
              </Text>
            </Pressable>
          </View>
       
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        isVisible={showLanguageModal}
        onBackdropPress={() => setShowLanguageModal(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Language</Text>
            <Pressable onPress={() => setShowLanguageModal(false)}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          <ScrollView style={styles.languageList}>
            {languageOptions.map((language) => (
              <Pressable
                key={language.code}
                style={[
                  styles.languageOption,
                  selectedLanguage.code === language.code && { backgroundColor: colors.primary }
                ]}
                onPress={() => changeLanguage(language)}>
                <Text 
                  style={[
                    styles.languageText, 
                    { color: colors.text },
                    selectedLanguage.code === language.code && { fontWeight: 'bold', color: colors.primary }
                  ]}>
                  {language.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
    flex: 1,
  },
  headerLanguageControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    marginBottom: 12,
    flex: 1,
  },
  titleWithActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  audioButton: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    lineHeight: 24,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  languageList: {
    marginBottom: 20,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  languageText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  }
});