import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Plus, Image as ImageIcon, X, ArrowLeft } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

interface Note {
  id: string;
  title: string;
  content: string;
  images: string[];
  timestamp: Date;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', images: [] as string[] });
  
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': Nunito_700Bold,
    'Nunito-Regular': Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setNewNote({
        ...newNote,
        images: [...newNote.images, result.assets[0].uri],
      });
    }
  };

  const handleSaveNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        images: newNote.images,
        timestamp: new Date(),
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', images: [] });
      setShowNewNote(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleRemoveImage = (index: number) => {
    setNewNote({
      ...newNote,
      images: newNote.images.filter((_, i) => i !== index),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </Pressable>
        <Text style={styles.title}>My Notes</Text>
      </View>

      <ScrollView style={styles.content}>
        {!showNewNote ? (
          <>
            <Pressable
              style={styles.addButton}
              onPress={() => setShowNewNote(true)}>
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Create New Note</Text>
            </Pressable>

            {notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteNote(note.id)}>
                  <X size={16} color="#ef4444" />
                </Pressable>
                
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
                
                {note.images.length > 0 && (
                  <ScrollView horizontal style={styles.imageScroll}>
                    {note.images.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image }}
                        style={styles.noteImage}
                      />
                    ))}
                  </ScrollView>
                )}
                
                <Text style={styles.timestamp}>
                  {note.timestamp.toLocaleDateString()}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.newNoteContainer}>
            <TextInput
              style={styles.titleInput}
              value={newNote.title}
              onChangeText={(text) => setNewNote({ ...newNote, title: text })}
              placeholder="Note Title"
              placeholderTextColor="#94a3b8"
            />
            
            <TextInput
              style={styles.contentInput}
              value={newNote.content}
              onChangeText={(text) => setNewNote({ ...newNote, content: text })}
              placeholder="Write your note here..."
              placeholderTextColor="#94a3b8"
              multiline
            />

            {newNote.images.length > 0 && (
              <ScrollView horizontal style={styles.imageScroll}>
                {newNote.images.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Pressable
                      style={styles.removeImageButton}
                      onPress={() => handleRemoveImage(index)}>
                      <X size={16} color="#fff" />
                    </Pressable>
                    <Image source={{ uri: image }} style={styles.noteImage} />
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles.actionButtons}>
              <Pressable style={styles.addImageButton} onPress={handleAddImage}>
                <ImageIcon size={20} color="#fff" />
                <Text style={styles.buttonText}>Add Image</Text>
              </Pressable>
              
              <Pressable
                style={[styles.saveButton, (!newNote.title || !newNote.content) && styles.buttonDisabled]}
                onPress={handleSaveNote}
                disabled={!newNote.title || !newNote.content}>
                <Text style={styles.buttonText}>Save Note</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  noteCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  noteTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#4b5563',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#6b7280',
  },
  deleteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
    zIndex: 1,
  },
  newNoteContainer: {
    gap: 16,
  },
  titleInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#1f2937',
  },
  contentInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#1f2937',
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addImageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  imageScroll: {
    marginVertical: 12,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  noteImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
});