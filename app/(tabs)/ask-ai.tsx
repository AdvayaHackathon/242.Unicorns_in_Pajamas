import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, ChevronLeft, Plus, Mic } from 'lucide-react-native';
import { useTheme, themes } from '@/context/ThemeContext';
import Constants from 'expo-constants';
import Voice, { SpeechResultsEvent } from '@react-native-community/voice';

type MessageRole = 'user' | 'assistant' | 'system';

type ChatMessage = {
  role: MessageRole;
  content: string;
};

type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
  messages: ChatMessage[];
  language?: string;
  languageConfirmed?: boolean;
};

const DEFAULT_SYSTEM_PROMPT = (language: string = 'English') => `
You are a friendly AI tutor named Coco. Introduce yourself as Coco 🎓📚
Respond in ${language} unless the user requests otherwise.

Guidelines:
1. Only answer educational questions (Math, Science, History, etc.)
2. For inappropriate questions, respond: "⚠ That's not appropriate. Let's keep it educational!"
3. Use emojis to make responses engaging
4. Keep explanations clear and student-friendly
5. answer general knowledge questions
6. If the user asks for help with a specific subject, provide a brief overview and ask if they need more details.
`;

const { width } = Dimensions.get('window');

export default function AskAIScreen() {
  const { theme } = useTheme();
  const colors = {
    ...themes[theme] || themes.light,
    sidebarBackground: themes[theme]?.card || themes.light?.card
  };
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(width > 768);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  const createNewChat = useCallback((): Chat => {
    return {
      id: Date.now().toString(),
      title: 'New Chat',
      lastMessage: '',
      timestamp: Date.now(),
      messages: [
        { 
          role: 'assistant', 
          content: "Hello! 👋 I'm your AI study buddy. What language would you prefer to chat in? (e.g., English, Spanish, French, etc.) 🌍" 
        }
      ],
      languageConfirmed: false
    };
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      const newChat = createNewChat();
      setChats([newChat]);
      setCurrentChatId(newChat.id);
    }
  }, [chats.length, createNewChat]);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
      const spokenText = event.value?.[0] || '';
      setMessage((prev) => prev + spokenText);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const simulateTyping = async (text: string, delay = 30) => {
    return new Promise<void>(resolve => {
      let i = 0;
      const chatIndex = chats.findIndex(chat => chat.id === currentChatId);
      if (chatIndex === -1) return resolve();

      const updatedChats = [...chats];
      updatedChats[chatIndex].messages = [
        ...updatedChats[chatIndex].messages, 
        { role: 'assistant', content: '' }
      ];
      setChats(updatedChats);
      setIsTyping(true);

      const interval = setInterval(() => {
        setChats(prevChats => {
          const newChats = [...prevChats];
          const chatIdx = newChats.findIndex(chat => chat.id === currentChatId);
          if (chatIdx !== -1 && newChats[chatIdx].messages.length > 0) {
            const lastMsgIndex = newChats[chatIdx].messages.length - 1;
            newChats[chatIdx].messages[lastMsgIndex].content = text.substring(0, i + 1);
            
            if (i === text.length - 1) {
              newChats[chatIdx].lastMessage = text.length > 30 ? 
                text.substring(0, 30) + '...' : text;
              newChats[chatIdx].timestamp = Date.now();
            }
          }
          return newChats;
        });
        
        scrollViewRef.current?.scrollToEnd({ animated: true });
        
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setIsTyping(false);
          resolve();
        }
      }, delay);
    });
  };

  const filteredChats = chats.filter(chat => chat !== undefined);

  if (!fontsLoaded) return null;

  const currentChat = filteredChats.find(chat => chat.id === currentChatId) || filteredChats[0];

  const startNewChat = () => {
    const newChat = createNewChat();
    setChats([newChat, ...filteredChats]);
    setCurrentChatId(newChat.id);
    if (width <= 768) {
      setShowSidebar(false);
    }
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    if (width <= 768) {
      setShowSidebar(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isTyping || !currentChatId) return;

    const userMessage = message.trim();
    setMessage('');

    setChats(prevChats => {
      const chatIndex = prevChats.findIndex(chat => chat.id === currentChatId);
      if (chatIndex === -1) return prevChats;

      const updatedChats = [...prevChats];
      updatedChats[chatIndex].messages = [
        ...updatedChats[chatIndex].messages,
        { role: 'user', content: userMessage }
      ];
      updatedChats[chatIndex].lastMessage = userMessage.length > 30 ? 
        userMessage.substring(0, 30) + '...' : userMessage;
      updatedChats[chatIndex].timestamp = Date.now();
      
      if (updatedChats[chatIndex].title === 'New Chat') {
        updatedChats[chatIndex].title = userMessage.length > 20 ? 
          userMessage.substring(0, 20) + '...' : userMessage;
      }
      
      return updatedChats;
    });

    try {
      const chatIndex = filteredChats.findIndex(chat => chat.id === currentChatId);
      if (chatIndex === -1) return;

      const currentChat = filteredChats[chatIndex];
      
      if (!currentChat.languageConfirmed) {
        const language = userMessage;
        
        setChats(prevChats => {
          const newChats = [...prevChats];
          const chatIdx = newChats.findIndex(chat => chat.id === currentChatId);
          if (chatIdx !== -1) {
            newChats[chatIdx].language = language;
            newChats[chatIdx].languageConfirmed = true;
          }
          return newChats;
        });
        
        await simulateTyping(`Great! I'll communicate with you in ${language}. How can I help you today? 😊`);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Constants.expoConfig?.extra?.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: DEFAULT_SYSTEM_PROMPT(currentChat.language || 'English') 
            },
            ...currentChat.messages
              .filter(msg => msg.role !== 'system')
              .map(msg => ({
                role: msg.role,
                content: msg.content,
              })),
            { role: 'user', content: userMessage },
          ],
        }),
      });

      const data = await response.json();
      let botReply = data.choices?.[0]?.message?.content?.trim() || 
                    "⚠ Sorry, I couldn't generate a response. Please try again.";
      
      if (!botReply || botReply === 'undefined') {
        botReply = "⚠ Oops! I didn't get that. Could you ask again?";
      }

      await simulateTyping(botReply);
    } catch (error) {
      console.error('Error:', error);
      await simulateTyping("⚠ Oops! Something went wrong. Please check your connection and try again.");
    }
  };

  const disabledColor = '#cccccc';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showSidebar && (
        <View style={[styles.sidebar, { backgroundColor: colors.sidebarBackground }]}>
          <View style={styles.sidebarHeader}>
            <Text style={[styles.sidebarTitle, { color: colors.text }]}>Recent Chats</Text>
            <TouchableOpacity 
              style={styles.newChatButton}
              onPress={startNewChat}
            >
              <Plus size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.chatItem,
                  item.id === currentChatId && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => selectChat(item.id)}
              >
                <Text 
                  style={[
                    styles.chatTitle,
                    { color: item.id === currentChatId ? colors.primary : colors.text }
                  ]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text 
                  style={[styles.chatPreview, { color: colors.secondaryText }]}
                  numberOfLines={1}
                >
                  {item.lastMessage || 'New chat'}
                </Text>
                {item.language && (
                  <Text 
                    style={[styles.chatPreview, { color: colors.secondaryText, fontSize: 12 }]}
                    numberOfLines={1}
                  >
                    {item.language}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <View style={[
        styles.chatArea, 
        { 
          display: 'flex',
          marginLeft: showSidebar && width > 768 ? 280 : 0 
        }
      ]}>
        {width <= 768 && !showSidebar && (
          <View style={[styles.header, { backgroundColor: colors.background }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setShowSidebar(true)}
            >
              <ChevronLeft size={24} color={colors.primary} />
            </TouchableOpacity>
            <View>
              <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                {currentChat?.title || 'New Chat'}
              </Text>
              {currentChat?.language && (
                <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                  {currentChat.language}
                </Text>
              )}
            </View>
          </View>
        )}

        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {currentChat?.messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.role === 'user' ? styles.userMessageContainer : null,
              ]}
            >
              <View
                style={[
                  msg.role === 'user' ? styles.userMessage : styles.botMessage,
                  { backgroundColor: colors.card },
                ]}
              >
                {msg.role === 'assistant' && (
                  <MessageSquare size={20} color={colors.primary} style={styles.messageIcon} />
                )}
                <Text style={[styles.messageText, { color: colors.text }]}>{msg.content}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={styles.micButton}
            onPress={isListening ? stopListening : startListening}
          >
            <Mic size={20} color={isListening ? colors.primary : '#ccc'} />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.card, 
                color: colors.text,
                opacity: isTyping ? 0.7 : 1
              }
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder={
              currentChat?.messages.length === 1 ? 
              "Type your preferred language..." : 
              "Type your question... ✍"
            }
            placeholderTextColor={colors.secondaryText}
            editable={!isTyping}
            multiline
            onSubmitEditing={sendMessage} // Added onSubmitEditing
            returnKeyType="send"         // Added returnKeyType
          />
          <Pressable 
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: message.trim() && !isTyping ? colors.primary : disabledColor,
                opacity: pressed ? 0.7 : 1,
              }
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || isTyping}
          >
            <Send size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingTop: 60,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  newChatButton: {
    padding: 8,
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    marginBottom: 4,
  },
  chatPreview: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  chatArea: {
    flex: 1,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  userMessage: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    borderTopRightRadius: 2,
  },
  botMessage: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    flexShrink: 1,
  },
  messageIcon: {
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginRight: 8,
    minHeight: 48,
  },
  sendButton: {
    padding: 12,
    borderRadius: 24,
  },
  micButton: {
    padding: 12,
  },
});