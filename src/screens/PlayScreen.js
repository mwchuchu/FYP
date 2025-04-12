import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';

const PlayScreen = ({navigation, route}) => {
  const {isDarkMode} = useTheme();
  const {topic, questionType} = route.params;
  const [questionCount, setQuestionCount] = useState('15');
  const [duration, setDuration] = useState('5');
  const [isFocus, setIsFocus] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
    const [level, setLevel] = useState(1);

  const questionOptions = [
    {label: '10 Questions', value: '10'},
    {label: '15 Questions', value: '15'},
    {label: '20 Questions', value: '20'},
  ];

  const durationOptions = [
    {label: '5 Minutes', value: '5'},
    {label: '10 Minutes', value: '10'},
    {label: '15 Minutes', value: '15'},
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, isDarkMode && styles.containerDark]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={{marginBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header3}></View>
        <View style={styles.header2}></View>
        <View style={[styles.header, isDarkMode && styles.headerDark]}>
          <Text style={styles.headerText}>{questionType} Summary</Text>
        </View>

        <View style={[styles.content, isDarkMode && styles.contentDark]}>
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>
              Topic{' '}
            </Text>
            <View style={[styles.inputBox, isDarkMode && styles.inputBoxDark]}>
              <Text style={[styles.inputText, isDarkMode && styles.textDark]}>
                {topic}
              </Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>
              Question Type
            </Text>
            <View style={[styles.inputBox, isDarkMode && styles.inputBoxDark]}>
              <Text style={[styles.inputText, isDarkMode && styles.textDark]}>
                {questionType}
              </Text>
            </View>
          </View>
               <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>
              Level
            </Text>
            <View style={[styles.inputBox, isDarkMode && styles.inputBoxDark]}>
              <Text style={[styles.inputText, isDarkMode && styles.textDark]}>
                {questionType}
              </Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>
              Number of Questions
            </Text>
            <View style={[styles.inputBox, isDarkMode && styles.inputBoxDark]}>
              <Dropdown
                style={styles.dropdownStyle}
                placeholderStyle={[
                  styles.placeholderStyle,
                  isDarkMode && styles.textDark,
                ]}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  isDarkMode && styles.textDark,
                ]}
                data={questionOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Questions' : '...'}
                value={questionCount}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setQuestionCount(item.value);
                  setIsFocus(false);
                }}
                renderRightIcon={() => (
                  <Icon
                    name="chevron-down"
                    size={20}
                    style={styles.dropdownIcon}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>
              Quiz Duration
            </Text>
            <View style={[styles.inputBox, isDarkMode && styles.inputBoxDark]}>
              <Dropdown
                style={styles.dropdownStyle}
                placeholderStyle={[
                  styles.placeholderStyle,
                  isDarkMode && styles.textDark,
                ]}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  isDarkMode && styles.textDark,
                ]}
                data={durationOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Duration' : '...'}
                value={duration}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDuration(item.value);
                  setIsFocus(false);
                }}
                renderRightIcon={() => (
                  <Icon
                    name="chevron-down"
                    size={20}
                    style={styles.dropdownIcon}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>
              Add to Favorites
            </Text>
            <View style={[styles.inputBox, isDarkMode && styles.inputBoxDark]}>
              <Text style={[styles.inputText, isDarkMode && styles.textDark]}>
                {topic}
              </Text>
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={20}
                  color={isFavorite ? '#ff4d4d' : '#7AB2D3'}
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          // Update the navigation in the Play button press
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={() =>
              navigation.navigate(
                questionType === 'Quiz' ? 'QuizStart' : 'ShortQuestionStart',
                {
                  topic,
                  questionCount,
                  duration,
                  questionType,
                }
              )
            }>
            <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
              Play
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.copyrightContainer}>
        <View style={styles.copyrightContent}>
          <Icon name="copyright" size={16} color="#FFFFFF" />
          <Text style={styles.copyrightText}> Mind Morph, Inc.</Text>
        </View>
        <View style={styles.homeIconContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={18} color="#7AB2D3" />
          </TouchableOpacity>
          <Text style={styles.copyrightYear}>2025</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding at the bottom
  },
  favoriteIcon: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'space-between',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  dropdownIcon: {
    marginRight: 5,
    color: '#7AB2D3',
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
    margin: 20,
  },
  contentDark: {
    backgroundColor: '#333',
  },
  dropdownStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },

  copyrightContainer: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#7AB2D3',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    elevation: 25,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    height: 100, // Fixed height for footer
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
  contentDark: {
    backgroundColor: '#333',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  inputBoxDark: {
    backgroundColor: '#444',
    borderColor: '#666',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
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
  textDark: {
    color: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
});

export default PlayScreen;
