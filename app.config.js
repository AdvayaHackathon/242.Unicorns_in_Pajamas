import 'dotenv/config';

export default {
  expo: {
    name: 'AskAIApp',
    slug: 'AskAIApp',
    version: '1.0.0',
    extra: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
    
    "android": {
      "permissions": ["RECORD_AUDIO"],
      "package": "com.anonymous.AskAIApp"
    },
    "ios": {
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app needs access to your microphone to recognize your voice."
      }
    }
  },
};