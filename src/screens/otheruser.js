import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Fix the animation variable names and update the icon
const OtherUserProfileScreen = ({ route }) => {
  const { user } = route.params;
  const avatarId = user?.userId || user?.id;
  const navigation = useNavigation();
  
  // Create animated values with correct names
  const quizpoints = useRef(new Animated.Value(0)).current;
  const sqpoints = useRef(new Animated.Value(0)).current;
  const overallpoints = useRef(new Animated.Value(0)).current;

  // Create a function to format numbers with commas
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  useEffect(() => {
    // Animate all numbers
    Animated.parallel([
      Animated.timing(quizpoints, {
        toValue: 7373025,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(sqpoints, {
        toValue: 1913,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(overallpoints, {
        toValue: user?.score || 5400,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: `https://api.dicebear.com/9.x/${avatarId}/png` }}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
          </View>  
        </View>

        {/* Badges Section - Updated to Top Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Topics</Text>
          <View style={styles.topicsContainer}>
            <View style={styles.topicItem}>
              <View style={styles.topicIconContainer}>
                <Icon name="code" size={24} color="#4562EA" />
              </View>
              <Text style={styles.topicName}>Programming</Text>
              <Text style={styles.topicLevel}>Level 5</Text>
            </View>
            
            <View style={styles.topicItem}>
              <View style={styles.topicIconContainer}>
                <Icon name="flask" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.topicName}>Science</Text>
              <Text style={styles.topicLevel}>Level 4</Text>
            </View>
            
            <View style={styles.topicItem}>
              <View style={styles.topicIconContainer}>
                <Icon name="calculator" size={24} color="#FFD700" />
              </View>
              <Text style={styles.topicName}>Mathematics</Text>
              <Text style={styles.topicLevel}>Level 3</Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Icon name="list-alt" size={24} color="#888" />
              <Text style={styles.statTitle}>Quiz Points</Text>
              <Animated.Text style={styles.statValue}>
                {quizpoints.interpolate({
                  inputRange: [0, 7373025],
                  outputRange: [0, 7373025],
                }).interpolate({
                  inputRange: [0, 7373025],
                  outputRange: ['0', '7373025']
                })}
              </Animated.Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="pencil" size={24} color="#888" />
              <Text style={styles.statTitle}>SQ Points</Text>
              <Animated.Text style={styles.statValue}>
                {sqpoints.interpolate({
                  inputRange: [0, 1913],
                  outputRange: [0, 1913],
                }).interpolate({
                  inputRange: [0, 1913],
                  outputRange: ['0', '1913']
                })}
              </Animated.Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="star" size={24} color="#888" />
              <Text style={styles.statTitle}>Total Score</Text>
              <Animated.Text style={styles.statValue}>
                {overallpoints.interpolate({
                  inputRange: [0, user?.score || 5400],
                  outputRange: [0, user?.score || 5400],
                }).interpolate({
                  inputRange: [0, user?.score || 5400],
                  outputRange: ['0', (user?.score || 5400).toString()]
                })}
              </Animated.Text>
            </View>
          </View>
        </View>
        
        {/* Copyright Footer - Added */}
        <View style={styles.copyrightContainer}>
          <View style={styles.copyrightLine} />
          <View style={styles.copyrightContent}>
            <Icon name="copyright" size={16} color="#7AB2D3" />
            <Text style={styles.copyrightText}>Mind Morph, Inc.</Text>
          </View>
          <View style={styles.homeIconContainer}>
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Icon name="home" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.copyrightYear}>2025</Text>
          </View>
        </View>
        
        {/* Add padding at the bottom to ensure content is visible above the tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollView: {
    paddingBottom: 80, // Add padding to ensure content is visible above tab bar
  },
  profileCard: {
    backgroundColor: '#7AB2D3',
    borderRadius: 20,
    margin: 16,
    padding: 20,
    elevation: 4,
    shadowColor: 'rgba(0, 78, 134, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    padding: 4,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5A8CA6',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 16,
    marginTop: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7AB2D3',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badge: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F3FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  statTitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7AB2D3',
    marginTop: 4,
  },
  // New styles for the topics section
  topicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  topicItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
  },
  topicIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F3FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    marginBottom: 8,
    shadowColor: 'rgba(0, 78, 134, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  topicName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 4,
  },
  topicLevel: {
    fontSize: 11,
    color: '#7AB2D3',
    fontWeight: 'bold',
    backgroundColor: '#F0F3FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  // New styles for copyright footer
  copyrightContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  copyrightLine: {
    height: 1,
    backgroundColor: 'rgba(122, 178, 211, 0.3)',
    width: '80%',
    marginBottom: 15,
  },
  copyrightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  copyrightText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7AB2D3',
    letterSpacing: 0.5,
  },
  homeIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    homeButton: {
      backgroundColor: '#7AB2D3',
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      shadowColor: 'rgba(0, 78, 134, 0.3)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    copyrightYear: {
      fontSize: 14,
      color: '#888',
      fontWeight: '500',
    },
  bottomPadding: {
    height: 20,
  },
});

export default OtherUserProfileScreen;