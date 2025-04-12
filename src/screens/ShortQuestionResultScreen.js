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

const ShortQuestionResultScreen = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const { accuracyScore, totalQuestions, answersTrack } = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedAccuracy = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, accuracyScore],
  });

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return '#4CAF50';
    if (accuracy >= 60) return '#FFB946';
    return '#FF5252';
  };

  const getAccuracyText = (accuracy) => {
    if (accuracy >= 80) return 'EXCELLENT!';
    if (accuracy >= 60) return 'GOOD JOB!';
    return 'KEEP PRACTICING!';
  };

  const highAccuracyAnswers = answersTrack.filter(score => score >= 70).length;
  const lowAccuracyAnswers = answersTrack.filter(score => score < 70).length;

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
        <Text style={styles.title}>{getAccuracyText(accuracyScore)}</Text>

        <View style={styles.scoreContainer}>
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Accuracy Score</Text>
          </View>
          <Animated.Text style={[
            styles.score,
            { color: getAccuracyColor(accuracyScore) }
          ]}>
            {Math.round(animatedAccuracy.__getValue())}%
          </Animated.Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={[styles.statBox, styles.correctBox]}>
            <Text style={styles.statNumber}>{highAccuracyAnswers}</Text>
            <Text style={styles.statLabel}>High Accuracy</Text>
          </View>
          <View style={[styles.statBox, styles.incorrectBox]}>
            <Text style={styles.statNumber}>{lowAccuracyAnswers}</Text>
            <Text style={styles.statLabel}>Low Accuracy</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Detailed Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.challengeButton]}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    tintColor: '#FFB946',
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
    textAlign: 'center',
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

export default ShortQuestionResultScreen;