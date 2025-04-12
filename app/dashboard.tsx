import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { BookOpen } from 'lucide-react-native';

export default function DashboardScreen() {
  const params = useLocalSearchParams();
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleStartLearning = () => {
    const grade = params.grade as string;
    let group = '';

    if (['Nursery', 'LKG', 'UKG'].includes(grade)) {
      router.replace('/(groups)/pre-primary');
    } else if (['1st', '2nd', '3rd', '4th'].includes(grade)) {
      router.replace('/(groups)/primary');
    } else if (['5th', '6th', '7th', '8th'].includes(grade)) {
      router.replace('/(groups)/middle');
    } else {
      router.replace('/(groups)/high');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome, {params.name}! 👋</Text>
        <Text style={styles.group}>
          You're in the {params.group} group
        </Text>

        <View style={styles.card}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?w=800&auto=format&fit=crop&q=60' }}
            style={styles.characterImage}
          />
          <Text style={styles.cardTitle}>Ready to begin?</Text>
          <Text style={styles.cardText}>
            Your personalized learning journey awaits. Start with your first lesson!
          </Text>
          <Pressable style={styles.button} onPress={handleStartLearning}>
            <Text style={styles.buttonText}>Start Learning</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  welcome: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  group: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#6b7280',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  characterImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 100,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});