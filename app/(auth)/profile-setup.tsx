import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { CircleUser as UserCircle } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '@/context/UserContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

export default function ProfileSetupScreen() {
  const params = useLocalSearchParams();
  const { setUserName } = useUser();
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleComplete = () => {
    if (name.trim()) {
      setUserName(name.trim());
      router.push({
        pathname: '/dashboard',
        params: { 
          name, 
          grade: params.grade, 
          group: params.group,
          language 
        },
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <UserCircle size={64} color="#6366f1" style={styles.icon} />
      <Text style={styles.title}>Almost there! 🎉</Text>
      <Text style={styles.subtitle}>Let's set up your learning profile</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value="test@student.com"
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preferred Language</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={language}
              onValueChange={setLanguage}
              style={styles.picker}>
              {languages.map((lang) => (
                <Picker.Item 
                  key={lang.code} 
                  label={lang.name} 
                  value={lang.code} 
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Grade</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value={params.grade as string}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Learning Group</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value={params.group as string}
            editable={false}
          />
        </View>

        <Pressable
          style={[styles.button, !name.trim() && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={!name.trim()}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    alignItems: 'center',
    minHeight: '100%',
  },
  icon: {
    marginTop: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#4b5563',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#1f2937',
  },
  inputDisabled: {
    backgroundColor: '#e5e7eb',
    color: '#6b7280',
  },
  pickerContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});