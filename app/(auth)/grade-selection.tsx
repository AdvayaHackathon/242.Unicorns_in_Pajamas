import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { GraduationCap } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

const grades = [
  'Nursery', 'LKG', 'UKG',
  '1st', '2nd', '3rd', '4th',
  '5th', '6th', '7th', '8th',
  '9th', '10th', '11th', '12th'
];

export default function GradeSelectionScreen() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getLearningGroup = (grade: string) => {
    if (['Nursery', 'LKG', 'UKG'].includes(grade)) return 'Pre-Primary';
    if (['1st', '2nd', '3rd', '4th'].includes(grade)) return 'Primary';
    if (['5th', '6th', '7th', '8th'].includes(grade)) return 'Middle';
    return 'High';
  };

  const handleContinue = () => {
    if (selectedGrade) {
      router.push({
        pathname: '/profile-setup',
        params: {
          grade: selectedGrade,
          group: getLearningGroup(selectedGrade),
        },
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconContainer}>
        <GraduationCap size={64} color="#6366f1" />
      </View>
      <Text style={styles.title}>What grade are you in? 📚</Text>
      <Text style={styles.subtitle}>Let's find the perfect learning path for you</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedGrade}
          onValueChange={(itemValue) => setSelectedGrade(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select your grade" value="" />
          {grades.map((grade) => (
            <Picker.Item 
              key={grade} 
              label={grade} 
              value={grade} 
            />
          ))}
        </Picker>
      </View>
      {selectedGrade && (
        <View style={styles.groupContainer}>
          <Text style={styles.groupText}>
            You'll be learning in {getLearningGroup(selectedGrade)} School
          </Text>
        </View>
      )}
      <Pressable    
        style={[styles.button, !selectedGrade && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selectedGrade}>
        <Text style={[styles.buttonText, !selectedGrade && { color: '#6b7280' }]}>
          Confirm and Continue
        </Text>
      </Pressable>
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
  iconContainer: {
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
  pickerContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginBottom: 24,
  },
  picker: {
    width: '100%',
    padding: 16,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#1f2937',
  },
  groupContainer: {
    backgroundColor: '#e0e7ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
  },
  groupText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#4338ca',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
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