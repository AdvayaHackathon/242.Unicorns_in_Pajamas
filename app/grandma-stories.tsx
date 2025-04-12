// import { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Image } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
// import { ArrowLeft, Play, Pause, Volume2 } from 'lucide-react-native';
// import { Audio } from 'expo-av';
// import { useTheme, themes } from '@/context/ThemeContext';

// const stories = [
//   {
//     id: 1,
//     title: "The Magic Garden",
//     description: "In a quaint corner of the world lived an old grandmother who tended to a most extraordinary garden. Unlike other gardens, this one bloomed with flowers that glowed like starlight and bore fruits that tasted like dreams. Children from the village would gather around as she told tales of how each magical plant came to be, and how they held the power to make wishes come true for those pure of heart.",
//     image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2069&auto=format&fit=crop",
//     audio: {
//       english: "https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3",
//       spanish: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
//       french: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
//     }
//   },
//   {
//     id: 2,
//     title: "The Friendly Dragon",
//     description: "High up in the misty mountains lived a dragon unlike any other. Instead of hoarding gold or breathing fire at knights, this dragon spent his days baking cookies in his cave-kitchen and sharing them with anyone brave enough to visit. His specialty was cinnamon swirls that sparkled like his scales, and children would climb the mountain just to taste his legendary treats and hear his wonderful stories.",
//     image: "https://images.unsplash.com/photo-1599689018034-48e2ead82951?q=80&w=2070&auto=format&fit=crop",
//     audio: {
//       english: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
//       spanish: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3",
//       french: "https://assets.mixkit.co/music/preview/mixkit-raising-me-higher-34.mp3"
//     }
//   },
//   {
//     id: 3,
//     title: "The Starlight Adventure",
//     description: "Every night, when the moon rose high, a wise old owl named Professor Hoot would gather the woodland creatures for a magical astronomy lesson. With his special telescope made from dewdrops and moonbeams, he would show them constellations that told stories of ancient heroes and mythical beasts. One special night, they all got to ride on a shooting star and visit the constellations themselves.",
//     image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
//     audio: {
//       english: "https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-wild-134.mp3",
//       spanish: "https://assets.mixkit.co/music/preview/mixkit-forest-treasure-138.mp3",
//       french: "https://assets.mixkit.co/music/preview/mixkit-just-kidding-11.mp3"
//     }
//   }
// ];

// export default function GrandmaStoriesScreen() {
//   const { theme } = useTheme();
//   const colors = themes[theme];
//   const [selectedStory, setSelectedStory] = useState<number | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'spanish' | 'french'>('english');
//   const [sound, setSound] = useState<Audio.Sound | null>(null);

//   const [fontsLoaded] = useFonts({
//     'Nunito-Bold': Nunito_700Bold,
//     'Nunito-Regular': Nunito_400Regular,
//   });

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   const stopSound = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       await sound.unloadAsync();
//       setSound(null);
//       setIsPlaying(false);
//       setSelectedStory(null);
//     }
//   };

//   const playStory = async (storyId: number) => {
//     if (sound) {
//       await stopSound();
//     }

//     if (selectedStory === storyId && isPlaying) {
//       setIsPlaying(false);
//       return;
//     }

//     try {
//       const story = stories.find(s => s.id === storyId);
//       if (!story) return;

//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: story.audio[selectedLanguage] },
//         { shouldPlay: true }
//       );

//       setSound(newSound);
//       setSelectedStory(storyId);
//       setIsPlaying(true);

//       newSound.setOnPlaybackStatusUpdate((status) => {
//         if (status.isLoaded && status.didJustFinish) {
//           setIsPlaying(false);
//           setSelectedStory(null);
//         }
//       });
//     } catch (error) {
//       console.error('Error playing audio:', error);
//     }
//   };

//   const handleLanguageChange = async (lang: 'english' | 'spanish' | 'french') => {
//     await stopSound();
//     setSelectedLanguage(lang);
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <View style={[styles.header, { backgroundColor: colors.background }]}>
//         <Pressable style={styles.backButton} onPress={() => {
//           stopSound();
//           router.replace('/(tabs)');
//         }}>
//           <ArrowLeft size={24} color={colors.text} />
//         </Pressable>
//         <Text style={[styles.title, { color: colors.text }]}>Grandma's Stories</Text>
//       </View>

//       <View style={styles.languageSelector}>
//         {(['english', 'spanish', 'french'] as const).map((lang) => (
//           <Pressable
//             key={lang}
//             style={[
//               styles.languageButton,
//               { 
//                 backgroundColor: selectedLanguage === lang ? colors.primary : colors.card,
//               }
//             ]}
//             onPress={() => handleLanguageChange(lang)}>
//             <Text style={[
//               styles.languageText,
//               { color: selectedLanguage === lang ? '#fff' : colors.text }
//             ]}>
//               {lang.charAt(0).toUpperCase() + lang.slice(1)}
//             </Text>
//           </Pressable>
//         ))}
//       </View>

//       <ScrollView style={styles.content}>
//         {stories.map((story) => (
//           <View 
//             key={story.id} 
//             style={[
//               styles.storyCard,
//               { backgroundColor: colors.card }
//             ]}>
//             <Image
//               source={{ uri: story.image }}
//               style={styles.storyImage}
//               resizeMode="cover"
//             />
//             <View style={styles.storyContent}>
//               <Text style={[styles.storyTitle, { color: colors.text }]}>{story.title}</Text>
              
//               <View style={styles.audioContainer}>
//                 <Pressable
//                   style={[
//                     styles.audioButton,
//                     { backgroundColor: selectedStory === story.id && isPlaying ? colors.success : colors.primary }
//                   ]}
//                   onPress={() => playStory(story.id)}>
//                   {selectedStory === story.id && isPlaying ? (
//                     <Pause size={20} color="#fff" />
//                   ) : (
//                     <Play size={20} color="#fff" />
//                   )}
//                   <Volume2 size={16} color="#fff" style={styles.audioIcon} />
//                 </Pressable>
//                 <Text style={[styles.audioLanguage, { color: colors.secondaryText }]}>
//                   Listen in {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
//                 </Text>
//               </View>

//               <Text style={[styles.storyDescription, { color: colors.secondaryText }]}>
//                 {story.description}
//               </Text>
//             </View>
//           </View>
//         ))}
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
//     paddingTop: Platform.OS === 'web' ? 60 : 50,
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
//   languageSelector: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 12,
//     padding: 16,
//   },
//   languageButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   languageText: {
//     fontFamily: 'Nunito-Bold',
//     fontSize: 14,
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   storyCard: {
//     borderRadius: 16,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   storyImage: {
//     height: 200,
//     width: '100%',
//   },
//   storyContent: {
//     padding: 16,
//   },
//   storyTitle: {
//     fontSize: 24,
//     fontFamily: 'Nunito-Bold',
//     marginBottom: 12,
//   },
//   audioContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     gap: 12,
//   },
//   audioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//     gap: 4,
//   },
//   audioIcon: {
//     opacity: 0.8,
//   },
//   audioLanguage: {
//     fontSize: 14,
//     fontFamily: 'Nunito-Regular',
//   },
//   storyDescription: {
//     fontSize: 16,
//     fontFamily: 'Nunito-Regular',
//     lineHeight: 24,
//   },
// });



import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Play, Pause, Volume2 } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { useTheme, themes } from '@/context/ThemeContext';

const stories = [
  {
    id: 1,
    title: "The Magic Garden",
    description: "One sunny day, Grandma baked a yummy strawberry cupcake for her little dog, Coco. But oh no! The cupcake was missing! Grandma looked under the table… no cupcake. She looked in the basket… no cupcake. Then she saw Coco with pink frosting on his nose! “Coco!” Grandma laughed “Did you eat the cupcake?” Coco wagged his tail and gave her a big kiss. Grandma giggled “Next time, we’ll bake two!” The End.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2069&auto=format&fit=crop",
    audio: {
      english: require('@/assets/stories/story1.mp3'),
      Kannada: require('@/assets/stories/story1_kan.mp3'),
      Telugu: require('@/assets/stories/story1_telugu.mp3'),
    }
  },
  {
    id: 2,
    title: "Magical seeds",
    description: "One morning, Grandma gave Mia three special seeds. 'Plant them with love,' she winked, 'and see what grows!' Mia watered them daily. One week later: 🌻 First sprout grew into a sunflower with math problems on its leaves. 📖 Second sprout bloomed into a book that read stories aloud. 🍪 Third sprout—surprise! Grew fresh cookies! 'Magic?' Mia gasped. Grandma chuckled, 'No, child—just patience and care making ordinary things extraordinary!'",
    image: "https://images.unsplash.com/photo-1599689018034-48e2ead82951?q=80&w=2070&auto=format&fit=crop",
    audio: {
      english: require('@/assets/stories/story2.mp3'),
      Kannada: require('@/assets/stories/story2_kannada.mp3'),
      Telugu: require('@/assets/stories/story2_telugu.mp3')
    }
  }
  // {
  //   id: 3,
  //   title: "The Starlight Adventure",
  //   description: "Every night, when the moon rose high, a wise old owl named Professor Hoot would gather the woodland creatures for a magical astronomy lesson. With his special telescope made from dewdrops and moonbeams, he would show them constellations that told stories of ancient heroes and mythical beasts. One special night, they all got to ride on a shooting star and visit the constellations themselves.",
  //   image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
  //   audio: {
  //     english: "https://example.com/stories/starlight-adventure-en.mp3",
  //     Kannada: "https://example.com/stories/starlight-adventure-es.mp3",
  //     Telugu: "https://example.com/stories/starlight-adventure-fr.mp3"
  //   }
  // }
];

export default function GrandmaStoriesScreen() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'Kannada' | 'Telugu'>('english');
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  if (!fontsLoaded) {
    return null;
  }

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setSelectedStory(null);
    }
  };

  const playStory = async (storyId: number) => {
    if (sound) {
      await stopSound();
    }

    if (selectedStory === storyId && isPlaying) {
      setIsPlaying(false);
      return;
    }

    try {
      const story = stories.find(s => s.id === storyId);
      if (!story) return;

      const { sound: newSound } = await Audio.Sound.createAsync(
        story.audio[selectedLanguage],
        { shouldPlay: true }
      );

      setSound(newSound);
      setSelectedStory(storyId);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setSelectedStory(null);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleLanguageChange = async (lang: 'english' | 'Kannada' | 'Telugu') => {
      await stopSound();
      setSelectedLanguage(lang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable style={styles.backButton} onPress={() => {
          stopSound();
          router.replace('/(tabs)');
        }}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Grandma's Stories</Text>
      </View>

      <View style={styles.languageSelector}>
        {(['english', 'Kannada', 'Telugu'] as const).map((lang) => (
          <Pressable
            key={lang}
            style={[
              styles.languageButton,
              { 
                backgroundColor: selectedLanguage === lang ? colors.primary : colors.card,
              }
            ]}
            onPress={() => handleLanguageChange(lang)}>
            <Text style={[
              styles.languageText,
              { color: selectedLanguage === lang ? '#fff' : colors.text }
            ]}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {stories.map((story) => (
          <View 
            key={story.id} 
            style={[
              styles.storyCard,
              { backgroundColor: colors.card }
            ]}>
            <Image
              source={{ uri: story.image }}
              style={styles.storyImage}
              resizeMode="cover"
            />
            <View style={styles.storyContent}>
              <Text style={[styles.storyTitle, { color: colors.text }]}>{story.title}</Text>
              
              <View style={styles.audioContainer}>
                <Pressable
                  style={[
                    styles.audioButton,
                    { backgroundColor: selectedStory === story.id && isPlaying ? colors.success : colors.primary }
                  ]}
                  onPress={() => playStory(story.id)}>
                  {selectedStory === story.id && isPlaying ? (
                    <Pause size={20} color="#fff" />
                  ) : (
                    <Play size={20} color="#fff" />
                  )}
                  <Volume2 size={16} color="#fff" style={styles.audioIcon} />
                </Pressable>
                <Text style={[styles.audioLanguage, { color: colors.secondaryText }]}>
                  Listen in {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                </Text>
              </View>

              <Text style={[styles.storyDescription, { color: colors.secondaryText }]}>
                {story.description}
              </Text>
            </View>
          </View>
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
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  storyCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  storyImage: {
    height: 200,
    width: '100%',
  },
  storyContent: {
    padding: 16,
  },
  storyTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 12,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  audioIcon: {
    opacity: 0.8,
  },
  audioLanguage: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  storyDescription: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    lineHeight: 24,
  },
});