import React, {useRef, useState} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollViewComponent,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../context/ThemeContext';
import {fonts} from '../theme/fonts';

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  const categories = [
    {id: 1, name: 'Science', icon: 'rocket'},
    {id: 2, name: 'Geography', icon: 'globe-model'},
    {id: 3, name: 'Sports', icon: 'basketball'},
    {id: 4, name: 'Biology', icon: 'dna'},
    {id: 5, name: 'Movies & TV', icon: 'film'},
    {id: 6, name: 'Gaming', icon: 'gamepad-variant'},
    {id: 7, name: 'Finance', icon: 'currency-usd'},
    {id: 8, name: 'Art & Design', icon: 'palette'},
    {id: 9, name: 'AI & Tech', icon: 'robot'},
    {id: 10, name: 'Environment', icon: 'earth'},
    {id: 11, name: 'Health', icon: 'heart-pulse'},
    {id: 12, name: 'Music', icon: 'music'},
    {id: 13, name: 'Business', icon: 'briefcase'},
    {id: 14, name: 'History', icon: 'history'},
  ];

  // Initialize animatedValues with one Animated.Value for each category
  const animatedValues = useRef(
    categories.map(() => new Animated.Value(0)),
  ).current;

  // Update the handlePress function
  const handlePress = index => {
  // Reset all animations to 0
  animatedValues.forEach(value => value.setValue(0));

  // Animate the clicked category
  Animated.sequence([
    Animated.timing(animatedValues[index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start(() => {
    // After animation, navigate to CustomTopic with the category name
    navigation.navigate('CustomTopic', {
      presetTopic: categories[index].name
    });
  });
};
const getAnimatedStyle = index => {
    const animatedValue = animatedValues[index];
    return {
      transform: [
        {
          rotate: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '720deg'],
          }),
        },
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -10],
          }),
        },
      ],
    };
  };

// Update the TouchableOpacity in the categories mapping
{categories.map((category, index) => (
  <TouchableOpacity
    key={category.id}
    style={[styles.categoryItem, isDarkMode && styles.categoryItemDark]}
    onPress={() => handlePress(index)}>
    <Animated.View
      style={[styles.categoryIconContainer, getAnimatedStyle(index), isDarkMode && styles.categoryIconContainerDark]}>
      <MaterialCommunityIcons
        name={category.icon}
        size={45}
        color={isDarkMode ? '#90CAF9' : '#003366'}
        style={{...shadowstyle}}
      />
    </Animated.View>
    <Text style={[styles.categoryText, isDarkMode && styles.textDark]}>{category.name}</Text>
  </TouchableOpacity>
))}
  

  // Add these state variables after existing ones
  const [isCustomModalVisible, setCustomModalVisible] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [isTopicValid, setIsTopicValid] = useState(true);
  const [showQuizTypeSelection, setShowQuizTypeSelection] = useState(false);
  const navigation = useNavigation();

  // Add these functions before return statement
  const validateTopic = (topic) => {
    return topic.length >= 3 && /^[a-zA-Z0-9\s]+$/.test(topic);
  };

  const handleTopicSubmit = () => {
    if (validateTopic(customTopic)) {
      setIsTopicValid(true);
      setShowQuizTypeSelection(true);
    } else {
      setIsTopicValid(false);
    }
  };

  const handleQuizTypeSelection = (type) => {
    setCustomModalVisible(false);
    setShowQuizTypeSelection(false);
    setCustomTopic('');
    navigation.navigate('play', { type, topic: customTopic });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={[styles.container, isDarkMode && styles.containerDark]}>
      <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.containerDark]}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <View style={[styles.header, isDarkMode && styles.headerDark]}>
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeText, isDarkMode && styles.textDark]}>Welcome Back!</Text>
            <Text style={[styles.usernameText, isDarkMode && styles.textDark]}>Zeeshan</Text>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}>
          // In the HomeScreen component, update the Custom Topics card
          <TouchableOpacity 
            style={[styles.card, {backgroundColor: '#4E9FFF'}]}
            onPress={() => navigation.navigate('CustomTopic')}>
            <Text style={styles.cardTitle}>Custom</Text>
            <Text style={styles.cardSubtitle}>Topics</Text>
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, {backgroundColor: '#FF6B6B'}]}>
            <Text style={styles.cardTitle}>Favourite</Text>
            <Text style={styles.cardSubtitle}>Topics</Text>
            <View style={styles.arrowContainer}>
              <Ionicons name="heart" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, {backgroundColor: '#5BD858'}]}>
            <Text style={styles.cardTitle}>Trending</Text>
            <Text style={styles.cardSubtitle}>Topics</Text>
            <View style={styles.arrowContainer}>
              <Ionicons name="trending-up" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView contentContainerStyle={styles.categoriesGrid}>
          <View style={styles.categoriesHeader}>
            <Text style={[styles.categoriesTitle, isDarkMode && styles.textDark]}>Suggested Topics</Text>
          </View>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryItem, isDarkMode && styles.categoryItemDark]}
              onPress={() => handlePress(index)}>
              <Animated.View
                style={[styles.categoryIconContainer, getAnimatedStyle(index), isDarkMode && styles.categoryIconContainerDark]}>
                <MaterialCommunityIcons
                  name={category.icon}
                  size={45}
                  color={isDarkMode ? '#90CAF9' : '#003366'}
                  style={{...shadowstyle}}
                />
              </Animated.View>
              <Text style={[styles.categoryText, isDarkMode && styles.textDark]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const shadowstyle = {
  elevation: 1,
  shadowColor: '#003092',
  shadowOffset: {width: 0, height: 6},
  shadowOpacity: 0.7,
  shadowRadius: 1,
};
// Add these dark mode styles to your StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    height: 200,
    position: 'relative',
    backgroundColor: '#7AB2D3',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  menuButton: {
    padding: 6,
    backgroundColor: '#7AB2D3',
    width: 35,
    height: 35,
    elevation: 2,
  },
  welcomeSection: {
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1,
    top: 100,
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Nunito-Bold',
  },
  usernameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  horizontalScrollContent: {
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 100,
    height: 350,
  },
  card: {
    width: 140,
    height: 140,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
  },
  cardSubtitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 5,
  },

  categoriesHeader: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 60,
    width: '100%',
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#4E9FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15, // Increased horizontal padding
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '45%', // Decreased width to create more horizontal space
    backgroundColor: '#9CCAE5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 35, // Increased from 15 to create more vertical space
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 1,
    paddingTop: 40, // Increased padding to make room for the overlapping icon
    position: 'relative', // Added to position the icon container
    height: 90, // Increased height to accommodate the icon
  },

  categoryIconContainer: {
    width: 60, // Increased from 60
    height: 60, // Increased from 60
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: -35, // Adjusted to maintain proper positioning
    borderRadius: 35, // Adjusted to half of width/height
    backgroundColor: 'white',
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  categoryText: {
    fontSize: 15,
    color: '#003366',
    fontWeight: 'bold',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  headerDark: {
    backgroundColor: '#003366',
  },
  textDark: {
    color: '#ffffff',
  },
  categoryItemDark: {
    backgroundColor: '#333333',
    shadowColor: '#000000',
  },
  categoryIconContainerDark: {
    backgroundColor: '#2d2d2d',
    shadowColor: '#000000',
  },
});

export default HomeScreen;