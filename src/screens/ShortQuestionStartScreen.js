import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShortQuestionStartScreen = ({navigation, route}) => {
  const {isDarkMode} = useTheme();
  const {topic, questionCount, duration} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [userAnswer, setUserAnswer] = useState('');
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [answersTrack, setAnswersTrack] = useState([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Sample questions - Replace with your actual questions
  const questions = [
    {
      question: 'What is the main function of a computer CPU?',
      correctAnswer: 'process information',
    },
    {
      question: 'What does HTML stand for?',
      correctAnswer: 'hypertext markup language',
    },
    // Add more questions as needed
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateAccuracy = (userAns, correctAns) => {
    const userWords = userAns.toLowerCase().trim().split(/\s+/);
    const correctWords = correctAns.toLowerCase().trim().split(/\s+/);
    
    let matchedWords = 0;
    userWords.forEach(word => {
      if (correctWords.includes(word)) {
        matchedWords++;
      }
    });

    return (matchedWords / correctWords.length) * 100;
  };

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      const accuracy = calculateAccuracy(userAnswer, questions[currentQuestion].correctAnswer);
      const newAnswersTrack = [...answersTrack];
      newAnswersTrack[currentQuestion] = accuracy;
      setAnswersTrack(newAnswersTrack);
      setAccuracyScore((accuracyScore * currentQuestion + accuracy) / (currentQuestion + 1));
      setIsAnswerSubmitted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setIsAnswerSubmitted(false);
    } else {
      handleFinish();
    }
  };

  // Update the handleFinish function
  const handleFinish = () => {
    navigation.navigate('ShortQuestionResult', {
      accuracyScore: Math.round(accuracyScore),
      totalQuestions: questions.length,
      answersTrack,
    });
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
        <View style={styles.progressBar}>
          {[...Array(questions.length)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < currentQuestion && answersTrack[index] !== undefined && {
                  backgroundColor: answersTrack[index] >= 70 ? '#4CAF50' : '#FF5252',
                },
                index === currentQuestion && styles.progressDotActive,
                index > currentQuestion && {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <Icon name="clock-o" size={20} color="#fff" />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.question, isDarkMode && styles.textDark]}>
          {questions[currentQuestion].question}
        </Text>

        <View style={styles.answerContainer}>
          <TextInput
            style={[
              styles.answerInput,
              isDarkMode && styles.answerInputDark,
              isAnswerSubmitted && styles.disabledInput,
            ]}
            placeholder="Type your answer here..."
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            multiline
            value={userAnswer}
            onChangeText={setUserAnswer}
            editable={!isAnswerSubmitted}
          />
        </View>

        {!isAnswerSubmitted ? (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={!userAnswer.trim()}>
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.accuracyText}>
              Accuracy: {Math.round(answersTrack[currentQuestion])}%
            </Text>
            <Text style={styles.correctAnswerText}>
              Correct Answer: {questions[currentQuestion].correctAnswer}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.navigate('Play')}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>

        {isAnswerSubmitted && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#7AB2D3',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 170,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#00879E',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  timerContainer: {
    position: 'absolute',
    top: 140,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00879E',
    padding: 15,
    borderRadius: 22,
    width: 110,
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    marginTop: 30,
  },
  questionNumber: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  progressDot: {
    width: 15,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  exitButton: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  exitButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#7AB2D3',
    minWidth: 100,
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#fff',
  },
  // Additional styles for short question screen
  answerContainer: {
    marginVertical: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    backgroundColor: '#F8F8F8',
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  answerInputDark: {
    backgroundColor: '#444',
    borderColor: '#666',
    color: '#fff',
  },
  disabledInput: {
    opacity: 0.7,
  },
  submitButton: {
    backgroundColor: '#7AB2D3',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    elevation: 15,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  accuracyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ShortQuestionStartScreen;