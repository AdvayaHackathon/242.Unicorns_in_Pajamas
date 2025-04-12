import { View, Text, StyleSheet, ScrollView, Pressable, Switch, TextInput } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { ArrowLeft, Moon, Sun, Globe, LogOut } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useTheme, themes } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const grades = [
  'Nursery', 'LKG', 'UKG',
  '1st', '2nd', '3rd', '4th',
  '5th', '6th', '7th', '8th',
  '9th', '10th', '11th', '12th'
];

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { userName, setUserName } = useUser();
  const params = useLocalSearchParams();
  const [name, setName] = useState(userName);
  const [language, setLanguage] = useState('en');
  const [grade, setGrade] = useState(params.grade as string || '8th');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setLanguage(settings.language || 'en');
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    router.replace('/login');
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await AsyncStorage.setItem('userSettings', JSON.stringify({
        name,
        language,
        grade,
      }));
      setUserName(name); // Update the global user name
      // Add a small delay to show the saving state
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setIsSaving(false);
    }
  };

  const colors = themes[theme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile</Text>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Grade</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={grade}
                onValueChange={setGrade}
                style={[styles.picker, { color: colors.text }]}>
                {grades.map((g) => (
                  <Picker.Item 
                    key={g} 
                    label={g} 
                    value={g}
                    color={colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              {theme === 'light' ? (
                <Moon size={20} color={colors.text} />
              ) : (
                <Sun size={20} color={colors.text} />
              )}
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={theme === 'dark' ? colors.text : '#fff'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe size={20} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Language</Text>
            </View>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={language}
                onValueChange={setLanguage}
                style={[styles.picker, { color: colors.text }]}>
                {languages.map((lang) => (
                  <Picker.Item 
                    key={lang.code} 
                    label={lang.name} 
                    value={lang.code}
                    color={colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <Pressable 
          style={[
            styles.saveButton, 
            { backgroundColor: colors.primary },
            isSaving && { opacity: 0.7 }
          ]}
          onPress={handleSave}
          disabled={isSaving}>
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Text>
        </Pressable>

        <Pressable 
          style={[styles.logoutButton, { backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2' }]}
          onPress={handleLogout}>
          <LogOut size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out</Text>
        </Pressable>
      </ScrollView>

      {showLogoutConfirm && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Log Out</Text>
            <Text style={[styles.modalText, { color: colors.secondaryText }]}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.card }]}
                onPress={() => setShowLogoutConfirm(false)}>
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.danger }]}
                onPress={confirmLogout}>
                <Text style={styles.confirmButtonText}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
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
    paddingTop: 60,
    borderBottomWidth: 1,
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
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    marginBottom: 4,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  pickerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: 'transparent',
  },
  saveButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  confirmButton: {
    backgroundColor: '#ef4444',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});