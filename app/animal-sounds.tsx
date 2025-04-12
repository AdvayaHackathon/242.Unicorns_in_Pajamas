import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Volume2 } from 'lucide-react-native';
import { Audio } from 'expo-av';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  FadeInDown,
  BounceIn,
  useSharedValue
} from 'react-native-reanimated';
import { useTheme, themes } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - (CARD_MARGIN * 6)) / 2; // Two cards per row with margins
const IMAGE_HEIGHT = 302; // 8cm at 96 DPI

const animals = [
  {
    id: 1,
    name: 'Lion',
    emoji: '🦁',
    sound: 'https://assets.mixkit.co/active_storage/sfx/2136/2136-preview.mp3',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=60',
    fact: 'Lions are called the King of the Jungle!'
  },
  {
    id: 2,
    name: 'Elephant',
    emoji: '🐘',
    sound: 'https://assets.mixkit.co/active_storage/sfx/1731/1731-preview.mp3',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop&q=60',
    fact: 'Elephants never forget their friends!'
  },
  {
    id: 3,
    name: 'Monkey',
    emoji: '🐒',
    sound: 'https://assets.mixkit.co/active_storage/sfx/2137/2137-preview.mp3',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&auto=format&fit=crop&q=60',
    fact: 'Monkeys love to play and swing!'
  },
  {
    id: 4,
    name: 'Dog',
    emoji: '🐕',
    sound: 'https://assets.mixkit.co/active_storage/sfx/1364/1364-preview.mp3',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=60',
    fact: 'Dogs are our best friends!'
  },
  {
    id: 5,
    name: 'Cat',
    emoji: '🐱',
    sound: 'https://assets.mixkit.co/active_storage/sfx/2138/2138-preview.mp3',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=60',
    fact: 'Cats purr when they are happy!'
  }
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimalSoundsScreen() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [activeAnimal, setActiveAnimal] = useState<number | null>(null);
  const scale = useSharedValue(1);

  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  if (!fontsLoaded) {
    return null;
  }

  const playSound = async (animalId: number, soundUrl: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      setActiveAnimal(animalId);
      scale.value = withSequence(
        withSpring(1.2),
        withSpring(1)
      );

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: soundUrl },
        { shouldPlay: true }
      );

      setSound(newSound);

      if (Platform.OS !== 'web') {
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setActiveAnimal(null);
          }
        });
      } else {
        setTimeout(() => {
          setActiveAnimal(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      setActiveAnimal(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable style={styles.backButton} onPress={() => router.replace("/(tabs)")}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Animal Sounds</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          Tap on the animals to hear their sounds! 🎵
        </Text>

        <View style={styles.animalsGrid}>
          {animals.map((animal, index) => (
            <Animated.View
              key={animal.id}
              entering={FadeInDown.delay(index * 200)}
              style={[
                styles.animalCard,
                { backgroundColor: colors.card }
              ]}
            >
              <AnimatedPressable
                style={[
                  styles.animalContent,
                  activeAnimal === animal.id && animatedStyle
                ]}
                onPress={() => playSound(animal.id, animal.sound)}
              >
                <Image
                  source={{ uri: animal.image }}
                  style={styles.animalImage}
                  resizeMode="cover"
                />
                <View style={styles.animalInfo}>
                  <Text style={[styles.animalName, { color: colors.text }]}>
                    {animal.name} {animal.emoji}
                  </Text>
                  <Animated.View
                    entering={activeAnimal === animal.id ? BounceIn : undefined}
                    style={[
                      styles.soundButton,
                      { 
                        backgroundColor: activeAnimal === animal.id 
                          ? colors.primary 
                          : colors.card 
                      }
                    ]}
                  >
                    <Volume2 
                      size={16} 
                      color={activeAnimal === animal.id ? '#fff' : colors.primary} 
                    />
                  </Animated.View>
                </View>
              </AnimatedPressable>
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
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  animalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: CARD_MARGIN * 2,
  },
  animalCard: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  animalContent: {
    width: '100%',
  },
  animalImage: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  animalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  animalName: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  soundButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});