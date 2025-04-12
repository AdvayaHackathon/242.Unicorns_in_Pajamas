import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function GroupsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
        animation: Platform.OS === 'ios' ? 'default' : 'fade'
      }}
    />
  );
}