import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuizResultScreen = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const { score, points, totalQuestions, correctAnswers, incorrectAnswers } = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // Replace the score container section
  <View style={styles.scoreContainer}>
    <View style={styles.ribbon}>
      <Text style={styles.ribbonText}>Your Score</Text>
    </View>
    <Animated.Text style={styles.score}>
      {points}
    </Animated.Text>
  </View>

  const animatedPoints = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, points],
  });

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="times" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Image 
          source={{ 
            uri: 'https://cdn-icons-png.flaticon.com/512/2415/2415292.png'
          }}
          style={styles.thumbsUp}
        />
        <Text style={styles.title}>GREAT JOB</Text>

        <View style={styles.scoreContainer}>
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Your Score</Text>
          </View>
          <Animated.Text style={styles.score}>
            {Math.round(animatedPoints.__getValue())}
          </Animated.Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Question</Text>
          </View>
          <View style={[styles.statBox, styles.correctBox]}>
            <Text style={styles.statNumber}>{correctAnswers}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={[styles.statBox, styles.incorrectBox]}>
            <Text style={styles.statNumber}>{incorrectAnswers}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.challengeButton]}>
          <Text style={styles.buttonText}>Challenge Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Update these specific styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4052B5',
  },
  containerDark: {
    backgroundColor: '#2A3670',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  thumbsUp: {
    width: 120,
    height: 120,
    marginBottom: 20,
    tintColor: '#FFB946', // This will give the image a golden color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  scoreContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    width: '80%',
    elevation: 5,
  },
  ribbon: {
    backgroundColor: '#FFB946',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    transform: [{ translateY: -25 }],
  },
  ribbonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4052B5',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  statBox: {
    backgroundColor: '#FFB946',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  correctBox: {
    backgroundColor: '#4CAF50',
  },
  incorrectBox: {
    backgroundColor: '#FF5252',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#00BCD4',
    width: '80%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  challengeButton: {
    backgroundColor: '#4052B5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizResultScreen;