import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Animated,
  Modal,
  scaleAnim,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {createAvatar} from '@dicebear/core';
import {avataaars, croodles} from '@dicebear/collection';
import { useTheme } from '../context/ThemeContext';
const LeaderboardScreen = () => {
  // Dummy data for the leaderboard
    const { isDarkMode } = useTheme();

  const topUsers = [
    {id: 1, name: 'Liza Carter', score: 8832, userId: 'adventurer'}, //yeah sab kuch baad main mita dena hai
    {id: 2, name: 'Dutton', score: 5620, userId: 'micah'}, //hum user avatar uskay link say fetch karein gay jo usnay select kiyya hoga
    {id: 3, name: 'Dutton', score: 5230, userId: 'bottts'},
  ];

  const otherUsers = [
    {id: 4, name: 'Kyle Hawkins', score: 5230, userId: 'avataaars-neutral'}, //yeah sab kuch baad main mita dena hai
    {id: 5, name: 'Adam Smith', score: 4568, userId: 'croodles'},
    {id: 6, name: 'Michel Hopkins', score: 3454, userId: 'dylan'},
    {id: 7, name: 'Ahmed Sharif', score: 2368, userId: 'pixel-art'},
    {id: 8, name: 'Ahmed Sharif', score: 2368, userId: 'pixel-art'},
    {id: 9, name: 'Ahmed Sharif', score: 2368, userId: 'pixel-art'},
    {id: 10, name: 'Ahmed Sharif', score: 2368, userId: 'pixel-art'},
  ];
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Global');
  // Remove modalVisible and selectedUser states as we'll navigate instead

  // Create animation values for each user
  const createAnimationRefs = users => {
    const refs = {};
    users.forEach(user => {
      refs[user.id] = useRef(new Animated.Value(1)).current;

    });
    return refs;
  };

  const topUsersAnims = createAnimationRefs(topUsers);
  const otherUsersAnims = createAnimationRefs(otherUsers);

  // Animation function for avatar press
  const animatePress = (userId, anim) => {
    Animated.sequence([
      Animated.spring(anim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to profile after animation completes
      navigation.navigate('otheruser', {userId});
    });
  };

  // Handle avatar press
  // Update the handleAvatarPress function
  const handleAvatarPress = user => {
    const anim = user.id <= 3 ? topUsersAnims[user.id] : otherUsersAnims[user.id];
    Animated.sequence([
      Animated.spring(anim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to OtherUserProfile instead of Profile
      navigation.navigate('otheruser', {
        user: {
          id: user.id,
          name: user.name,
          score: user.score,
          userId: user.userId
        }
      });
    });
  };


  const tabs = ['Quiz', 'Short Questions'];

  // Function to generate DiceBear avatar URL
  const getAvatarUrl = userId => {
    return `https://api.dicebear.com/9.x/${userId}/png`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top 3 Users */}
      <View style={styles.topThreeContainer}>
        {/* Second Place */}
        <View style={[styles.topUserContainer, styles.secondPlaceContainer]}>
          <TouchableOpacity
            onPress={() => handleAvatarPress(topUsers[1])}
            activeOpacity={0.8}>
            <Animated.View
              style={[
                styles.avatarContainer,
                styles.secondPlaceAvatar,
                {transform: [{scale: topUsersAnims[2]}]},
              ]}>
              <Image
                source={{uri: getAvatarUrl(topUsers[1].userId)}}
                style={styles.avatar}
              />
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.userName}>{topUsers[1].name}</Text>
          <View style={[styles.scoreContainer, styles.secondPlaceScore]}>
            <Text style={styles.score}>{topUsers[1].score}</Text>
          </View>
        </View>

        {/* First Place */}
        <View style={[styles.topUserContainer, styles.firstPlaceContainer]}>
          <TouchableOpacity
            onPress={() => handleAvatarPress(topUsers[0])}
            activeOpacity={0.8}>
            <Animated.View
              style={[
                styles.avatarContainer,
                styles.firstPlaceAvatar,
                {transform: [{scale: topUsersAnims[1]}]},
              ]}>
              <Image
                source={{uri: getAvatarUrl(topUsers[0].userId)}}
                style={styles.avatar}
              />
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.userName}>{topUsers[0].name}</Text>
          <View style={[styles.scoreContainer, styles.firstPlaceScore]}>
            <Text style={styles.score}>{topUsers[0].score}</Text>
          </View>
        </View>

        {/* Third Place */}
        <View style={[styles.topUserContainer, styles.thirdPlaceContainer]}>
          <TouchableOpacity
            onPress={() => handleAvatarPress(topUsers[2])}
            activeOpacity={0.8}>
            <Animated.View
              style={[
                styles.avatarContainer,
                styles.thirdPlaceAvatar,
                {transform: [{scale: topUsersAnims[3]}]},
              ]}>
              <Image
                source={{uri: getAvatarUrl(topUsers[2].userId)}}
                style={styles.avatar}
              />
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.userName}>{topUsers[2].name}</Text>
          <View style={[styles.scoreContainer, styles.thirdPlaceScore]}>
            <Text style={styles.score}>{topUsers[2].score}</Text>
          </View>
        </View>
      </View>

      {/* Other Users List */}
      <ScrollView
        contentContainerStyle={styles.otherUsersContainer}
        showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {otherUsers.map(user => (
            <View key={user.id} style={styles.userRow}>
              <Text style={styles.userRank}>{user.id}</Text>
              <TouchableOpacity
                onPress={() => handleAvatarPress(user)}
                activeOpacity={0.8}>
                <Animated.View
                  style={[
                    styles.userRowAvatarContainer,
                    {transform: [{scale: otherUsersAnims[user.id]}]},
                  ]}>
                  <Image
                    source={{uri: getAvatarUrl(user.userId)}}
                    style={styles.avatar}
                  />
                </Animated.View>
              </TouchableOpacity>
              <Text style={styles.userRowName}>{user.name}</Text>
              <Text style={styles.userRowScore}>{user.score}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7AB2D3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#4562EA',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#00B4FF',
  },
  tabText: {
    color: 'white',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 180,
  },
  topUserContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative',
  },
  firstPlaceContainer: {
    height: 180,
  },
  secondPlaceContainer: {
    height: 160,
  },
  thirdPlaceContainer: {
    height: 150,
  },
  medalCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  firstPlace: {
    backgroundColor: '#FFD700',
    right: 8,
  },
  secondPlace: {
    backgroundColor: '#FFA500',
    right: 8,
  },
  thirdPlace: {
    backgroundColor: '#CD7F32',
    right: 8,
  },
  medalNumber: {
    fontWeight: 'bold',
    color: 'white',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  firstPlaceAvatar: {
    backgroundColor: '#4CAF50',
  },
  secondPlaceAvatar: {
    backgroundColor: '#FFA500',
  },
  thirdPlaceAvatar: {
    backgroundColor: '#2196F3',
  },
  userName: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  scoreContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  firstPlaceScore: {
    backgroundColor: '#4CAF50',
  },
  secondPlaceScore: {
    backgroundColor: '#FFA500',
  },
  thirdPlaceScore: {
    backgroundColor: '#2196F3',
  },
  score: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  otherUsersContainer: {
    flex: 1,
    height:800,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    margin: 10,
    marginBottom:35,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  userRank: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  userRowAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userRowName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#003366',
  },
  userRowScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B4FF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalScore: {
    fontSize: 18,
    color: '#00B4FF',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4562EA',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
