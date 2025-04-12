import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { LogIn, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    if (email === 'test@student.com' && password === 'password123') {
      router.push('/grade-selection');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LogIn size={64} color="#6366f1" style={styles.icon} />
        <Text style={styles.title}>Welcome Back! 👋</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              placeholder="Enter your email"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
              />
              <Pressable 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye size={20} color="#6b7280" />
                ) : (
                  <EyeOff size={20} color="#6b7280" />
                )}
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Pressable onPress={handleSignup}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#4b5563',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#374151',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#1f2937',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48, // Make room for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#4b5563',
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#6366f1',
  },
});