import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  alignSelf,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuizStartScreen = ({navigation, route}) => {
  const {isDarkMode} = useTheme();
  const {topic, questionCount, duration, questionType} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  // Sample questions - Replace with your actual questions
  const questions = [
    {
      question:
        'The information to be communicated in a data communication system is known as',
      options: ['Medium', 'Transmission', 'Message', 'Protocol'],
      correctAnswer: 2,
    },
    {
      question:
        'The information to be communicated in a data communication system is known as',
      options: ['Medium', 'Transmission', 'Message', 'Protocol'],
      correctAnswer: 2,
    },
    {
      question:
        'The information to be communicated in a data communication system is known as',
      options: ['Medium', 'Transmission', 'Message', 'Protocol'],
      correctAnswer: 2,
    },
    {
      question:
        'The information to be communicated in a data communication system is known as',
      options: ['Medium', 'Transmission', 'Message', 'Protocol'],
      correctAnswer: 2,
    },
    {
      question: 'What the most top rated dailogue of zeeshan',
      options: [
        'Na kar phat jaye gii',
        'Is main meri izzat hai',
        'Ajeeb aurat hai',
        'Pehn!',
      ],
      correctAnswer: 2,
    },
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

  const [answersTrack, setAnswersTrack] = useState(
    Array(questions.length).fill(null),
  );

  // Update handleAnswer function
  // Add new state for points
  const [points, setPoints] = useState(0);
  
  // Update the handleAnswer function to calculate points
  const handleAnswer = index => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    const newAnswersTrack = [...answersTrack];
    newAnswersTrack[currentQuestion] = isCorrect;
    setAnswersTrack(newAnswersTrack);
  
    if (isCorrect) {
      const newScore = score + 10;
      setScore(newScore);
      setPoints(newScore * 10); // Calculate points
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
  };

  // Update the timer effect to show timeout notification
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

  // Update handleFinish to include points
  const handleFinish = () => {
    navigation.navigate('QuizResult', {
      score,
      points,
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
    });
  };

  // Update progress bar JSX
  <View style={styles.progressBar}>
    {[...Array(questions.length)].map((_, index) => (
      <View
        key={index}
        style={[
          styles.progressDot,
          index < currentQuestion &&
            answersTrack[index] !== null && {
              backgroundColor: answersTrack[index] ? '#4CAF50' : '#FF5252',
            },
          index === currentQuestion && styles.progressDotActive,
        ]}
      />
    ))}
  </View>;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      handleFinish();
    }
  };



  return (
    // In the return statement, update the header and timer position
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}
        </Text>
        <View style={styles.progressBar}>
          {[...Array(questions.length)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < currentQuestion &&
                  answersTrack[index] !== null && {
                    backgroundColor: answersTrack[index]
                      ? '#4CAF50'
                      : '#FF5252',
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

        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
              selectedAnswer !== null &&
                index === questions[currentQuestion].correctAnswer &&
                styles.correctOption,
              selectedAnswer === index &&
                index !== questions[currentQuestion].correctAnswer &&
                styles.incorrectOption,
            ]}
            onPress={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}>
            <Text style={styles.optionText}>{option}</Text>
            {selectedAnswer === index &&
              index === questions[currentQuestion].correctAnswer && (
                <Icon name="check" size={20} color="#fff" style={styles.icon} />
              )}
            {selectedAnswer === index &&
              index !== questions[currentQuestion].correctAnswer && (
                <Icon name="times" size={20} color="#fff" style={styles.icon} />
              )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>

        {selectedAnswer !== null && (
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
    height: 170, // Reduced height
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
    top: 140, // Adjust this value to position the timer
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
    marginTop: 30, // Add margin to account for timer overlay
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
    width: '100%', // Ensure full width
    alignSelf: 'center', // Center the progress bar
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
  optionButton: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 5,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#7AB2D3',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FF5252',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
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
});

export default QuizStartScreen;
