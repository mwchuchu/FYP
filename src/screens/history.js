import React from "react";
import { useColorScheme } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import {fonts} from '../theme/fonts';

const HistoryItem = ({ item, isDarkMode }) => (
  <TouchableOpacity style={[styles.historyCard, isDarkMode && styles.historyCardDark]}>
    <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
      <MaterialCommunityIcons name={item.icon} size={24} color="white" />
    </View>
    <View style={styles.textContainer}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.detailLabelDark]}>Type:</Text>
          <Text style={[styles.detailValue, isDarkMode && styles.detailValueDark]}>{item.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.detailLabelDark]}>Level:</Text>
          <Text style={[styles.detailValue, isDarkMode && styles.detailValueDark]}>{item.level}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.detailLabelDark]}>Score:</Text>
          <Text style={[styles.detailValue, isDarkMode && styles.detailValueDark]}>{item.score}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.detailLabelDark]}>Points:</Text>
          <Text style={[styles.detailValue, isDarkMode && styles.detailValueDark]}>{item.points}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const HistoryScreen = () => {
  const { isDarkMode } = useTheme();
  const historyData = [
    {
      title: "Marketing Strategy",
      type: "Quiz",
      level: 7,
      score: "75/100",
      points: 750,
      icon: "briefcase-outline"
    },
    {
      title: "Chemical Reaction",
      type: "Short Question",
      level: 4,
      score: "80/100",
      points: 400,
      icon: "flask-outline"
    },
    {
      title: "Electronics Circuit",
      type: "Quiz",
      level: 3,
      score: "60/100",
      points: 600,
      icon: "circuit-outline"
    },
    {
      title: "Radio Technology",
      type: "Short Question",
      level: 8,
      score: "90/100",
      points: 900,
      icon: "radio"
    },
    {
      title: "Radio Technology",
      type: "Short Question",
      level: 8,
      score: "90/100",
      points: 900,
      icon: "radio"
    }
  ];

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>History</Text>
      </View>
      <ScrollView 
        style={[styles.scrollView, isDarkMode && styles.scrollViewDark]} 
        showsVerticalScrollIndicator={false}
      >
        {historyData.map((item, index) => (
          <HistoryItem key={index} item={item} isDarkMode={isDarkMode} />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7AB2D3',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    fontFamily: fonts.bold,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    marginBottom:35,

  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'flex-start',
    shadowColor: '#7AB2D3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#7AB2D3',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
    fontFamily: fonts.bold,
  },
  detailsContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
    width: 60,
  },
  detailValue: {
    fontSize: 15,
    color: '#00B4FF',
    fontWeight: '600',
  },
  
  // Dark mode styles
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  scrollViewDark: {
    backgroundColor: '#2d2d2d',
  },
  historyCardDark: {
    backgroundColor: '#333333',
    shadowColor: '#000',
  },
  iconContainerDark: {
    backgroundColor: '#003366',
  },
  titleDark: {
    color: '#ffffff',
  },
  headerTitleDark: {
    color: '#ffffff',
  },
  detailLabelDark: {
    color: '#999999',
  },
  detailValueDark: {
    color: '#7AB2D3',
  },
});

export default HistoryScreen;