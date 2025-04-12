import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  BackHandler, // Move BackHandler import here
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
// Add FontAwesome icon import at the top
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

// Add these imports at the top
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CustomTopicScreen = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const presetTopic = route.params?.presetTopic || '';
  const [customTopic, setCustomTopic] = useState(presetTopic);
  const [showQuizTypeSelection, setShowQuizTypeSelection] = useState(!!presetTopic,false);
  
  const [isTopicValid, setIsTopicValid] = useState(true);
  const [isChecking, setIsChecking] = useState(false);  // Keep only this one

  // Add the useFocusEffect here
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        if (showQuizTypeSelection) {
          setShowQuizTypeSelection(false);
          return true;
        }
        return false;
      });

      return () => subscription.remove();
    }, [showQuizTypeSelection])
  );

  // Remove the duplicate isChecking declaration that was here
  
  const WORDS_API_KEY = '2f3d5b8416msh7c9c657225fb7d4p1e1da1jsn8bf2876d4fff';
  const WORDS_API_HOST = 'wordsapi.p.rapidapi.com';
  
  // Update the validateTopic function
  const validateTopic = async (topic) => {
    const words = topic.trim().split(/\s+/);
    const commonTerms = ['ai', 'vr', 'ar', 'ml', 'ui', 'ux', '3d', '2d', 'hr', 'pr', 'ios', 'api'];
  
    try {
      const results = await Promise.all(
        words.map(async (word) => {
          const lowercaseWord = word.toLowerCase();
          
          if (commonTerms.includes(lowercaseWord) || /^\d+$/.test(word)) {
            return true;
          }
  
          try {
            const response = await axios.get(`https://wordsapi.p.rapidapi.com/words/${word}`, {
              headers: {
                'X-RapidAPI-Key': WORDS_API_KEY,
                'X-RapidAPI-Host': WORDS_API_HOST
              }
            });
            
            // WordsAPI returns more detailed information
            return response.status === 200 && response.data.results && response.data.results.length > 0;
          } catch (error) {
            // Fallback to proper noun check or secondary dictionary
            if (/^[A-Z][a-z]{1,}$/.test(word)) {
              return true;
            }
            
            // Try the free dictionary API as backup
            try {
              const backupResponse = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
              );
              return backupResponse.status === 200;
            } catch {
              return false;
            }
          }
        })
      );
  
      const isValid = (
        words.length > 0 &&
        words.length <= 5 &&
        words.every(word => word.length >= 2) &&
        results.every(result => result) &&
        /^[a-zA-Z0-9\s]+$/.test(topic)
      );
  
      return isValid;
    } catch (error) {
      console.error('Error validating topic:', error);
      return false;
    }
  };

  const handleTopicSubmit = async () => {
    setIsChecking(true);
    const isValid = await validateTopic(customTopic);
    setIsChecking(false);
    if (isValid) {
      setIsTopicValid(true);
      setShowQuizTypeSelection(true);
    } else {
      setIsTopicValid(false);
    }
  };
    const handleQuizPress = () => {
      navigation.navigate('Play', {
        topic: customTopic,
        questionType: 'Quiz', // Specific type for quiz
      });
    };

    const handleShortQuestionPress = () => {
      navigation.navigate('Play', {
        topic: customTopic,
        questionType: 'Short Question', // Specific type for short questions
      });
    };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, isDarkMode && styles.containerDark]}>
      
      <View style={styles.header3}></View>
      <View style={styles.header2}></View>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <Text style={[styles.headerText, isDarkMode && styles.textDark]}>Topic</Text>
      </View>

      <View style={[styles.content, isDarkMode && styles.contentDark]}>
        {!showQuizTypeSelection ? (
          <>
            <Text style={[styles.title, isDarkMode && styles.textDark]}>
              Enter Custom Topic
            </Text>
            <View style={[styles.inputContainer, isDarkMode && styles.inputContainerDark]}>
              <Icon name="book" size={20} style={styles.icon} />
              <TextInput
                style={[
                  styles.input,
                  isDarkMode && styles.inputDark,
                  !isTopicValid && styles.invalidInput,
                ]}
                placeholder="Enter topic name"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                value={customTopic}
                onChangeText={(text) => {
                  setCustomTopic(text);
                  setIsTopicValid(true);
                }}
              />
            </View>
            
            <TouchableOpacity
              style={[styles.button, isDarkMode && styles.buttonDark]}
              onPress={handleTopicSubmit}>
              <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Continue</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
          
            <Text style={[styles.title, isDarkMode && styles.textDark]}>
              What do you want to play?
            </Text>
            <TouchableOpacity
              style={[styles.quizTypeButton, isDarkMode && styles.quizTypeButtonDark]}
              onPress={handleQuizPress}>
              <Text style={[styles.buttonText, isDarkMode && styles.textDark]}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quizTypeButton, isDarkMode && styles.quizTypeButtonDark]}
              onPress={handleShortQuestionPress}>
              <Text style={[styles.buttonText, isDarkMode && styles.textDark]}>
                Short Questions
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Add Copyright Footer */}
      <View style={styles.copyrightContainer}>
        <View style={styles.copyrightContent}>
          <Icon name="copyright" size={16} color="#FFFFFF" />
          <Text style={styles.copyrightText}>  Mind Morph, Inc.</Text>
        </View>
        <View style={styles.homeIconContainer}>
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="home" size={18} color="#7AB2D3" />
          </TouchableOpacity>
          <Text style={styles.copyrightYear}>2025</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between', // This will push content apart
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#7AB2D3',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#00879E',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
    width: '100%',
  },
  header2: {
    position: 'absolute',
    height: 163,
    width: '95%',
    backgroundColor: '#9CCAE5',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    alignSelf: 'center',
  },
  header3: {
    position: 'absolute',
    height: 175,
    width: '90%',
    backgroundColor: '#CFE3F2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    margin: 20,
    backgroundColor: '#FFFFFF', // Changed to white
    padding: 20,
    borderRadius: 15,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  contentDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
  // Add these styles

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  icon: {
    marginRight: 10,
    color: '#7AB2D3',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  inputDark: {
    backgroundColor: '#444',
    borderColor: '#666',
    color: '#fff',
  },
  invalidInput: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 15,
  },
  // Update button styles to match SignInScreen
  button: {
    width: '100%',
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 15,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#4A628A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonDark: {
    backgroundColor: '#003366',
  },

  // Update quiz type button styles
  quizTypeButton: {
    width: '100%',
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    elevation: 15,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  quizTypeButtonDark: {
    backgroundColor: '#003366',
  },
  quizTypeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    margin: 20,
    backgroundColor: '#FFFFFF', // Changed to white
    padding: 20,
    borderRadius: 15,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  contentDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  icon: {
    marginRight: 10,
    color: '#7AB2D3',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  inputDark: {
    backgroundColor: '#444',
    borderColor: '#666',
    color: '#fff',
  },
  invalidInput: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 15,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between', // This will push content apart
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#7AB2D3',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#00879E',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
    width: '100%',
  },
  header2: {
    position: 'absolute',
    height: 163,
    width: '95%',
    backgroundColor: '#9CCAE5',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    alignSelf: 'center',
  },
  header3: {
    position: 'absolute',
    height: 175,
    width: '90%',
    backgroundColor: '#CFE3F2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    margin: 20,
    backgroundColor: '#FFFFFF', // Changed to white
    padding: 20,
    borderRadius: 15,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  contentDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
  // Add these styles

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  icon: {
    marginRight: 10,
    color: '#7AB2D3',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  inputDark: {
    backgroundColor: '#444',
    borderColor: '#666',
    color: '#fff',
  },
  invalidInput: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 15,
  },
  // Update button styles to match SignInScreen
  button: {
    width: '100%',
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 15,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#4A628A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonDark: {
    backgroundColor: '#003366',
  },

  // Copyright styles
  copyrightContainer: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#7AB2D3', // Match the header color
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 25,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  copyrightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  copyrightText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  homeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    elevation: 8,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  copyrightYear: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

  export default CustomTopicScreen;