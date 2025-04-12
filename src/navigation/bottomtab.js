import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../screens/settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarSelection from '../screens/avatar-selection';
import {useTheme} from '../context/ThemeContext';


import HomeScreen from '../screens/home';
import HistoryScreen from '../screens/history';
import LeaderBoardScreen from '../screens/leaderboard';
import NewTabScreen from '../screens/newtab';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

function CustomTabBar({state, descriptors, navigation}) {
  const tabAnimations = useRef(state.routes.map(() => new Animated.Value(0))).current;
  const addButtonAnimation = useRef(new Animated.Value(0)).current;
  const [trayVisible, setTrayVisible] = useState(false);
  const trayAnimation = useRef(new Animated.Value(0)).current;
  const { isDarkMode, setIsDarkMode } = useTheme();
  // Remove the local isDarkMode state
  // const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleNightModePress = () => {
    closeTray();
    setIsDarkMode(!isDarkMode);
  };
  // Add profile menu state
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const profileMenuAnimation = useRef(new Animated.Value(0)).current;
  
  const iconRotationAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trayVisible) {
      Animated.timing(trayAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Animate rotation for plus to cross
      Animated.timing(iconRotationAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(trayAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Animate rotation back from cross to plus
      Animated.timing(iconRotationAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [trayVisible]);

  // Add profile menu animation effect
  useEffect(() => {
    if (profileMenuVisible) {
      Animated.timing(profileMenuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(profileMenuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [profileMenuVisible]);

  const closeTray = () => {
    setTrayVisible(false);
  };

  const openTray = () => {
    setTrayVisible(true);
  };

  // Add profile menu toggle functions
  const openProfileMenu = () => {
    setProfileMenuVisible(true);
  };

  const closeProfileMenu = () => {
    setProfileMenuVisible(false);
  };

  const handleSettingsPress = () => {
    closeTray();
    navigation.navigate('SettingsScreen');
  };

  const handleQuickQuizPress = () => {
    closeTray();
    alert('Quick Quiz Selected');
  };



  // Add menu item renderer
  // Update the renderMenuItem function
  const renderMenuItem = (iconName, label, onPress = () => {}) => {
    return (
      <TouchableOpacity 
        style={[styles.menuItem]} 
        onPress={() => {
          closeProfileMenu();
          if (onPress) onPress();
        }}
        activeOpacity={0.6}
      >
        <FontAwesome5 name={iconName} size={20} color="#7AB2D3" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const beforeAddTabs = state.routes.slice(0, 2);
  const afterAddTabs = state.routes.slice(2);
  afterAddTabs.splice(0, 1);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={{width: '100%'}}>
        <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
          {/* Tabs before the add button */}
          {beforeAddTabs.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;

            const tabScale = tabAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.2],
            });

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.navItem}>
                <Animated.View style={{transform: [{scale: tabScale}]}}>
                  <Ionicons
                    name={options.iconName}
                    size={24}
                    color={isFocused ? 'white' : 'rgba(255,255,255,0.7)'}
                  />
                </Animated.View>
                {isFocused && (
                  <Animated.View
                    style={[
                      styles.tabIndicator,
                      {opacity: tabAnimations[index]},
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}

          <View style={styles.addButtonSpace} />

          {afterAddTabs.map((route, index) => {
            // Adjust the actualIndex to account for hidden screens
            const actualIndex = index + beforeAddTabs.length + 1;
            
            const {options} = descriptors[route.key];
            const isFocused = state.index === actualIndex;
          
            const tabScale = tabAnimations[actualIndex].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.2],
            });

            const onPress = () => {
              // Special handling for Profile tab
              if (route.name === 'Profile') {
                openProfileMenu();
                return;
              }
              
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.navItem}>
                <Animated.View style={{transform: [{scale: tabScale}]}}>
                  <Ionicons
                    name={options.iconName}
                    size={24}
                    color={isFocused ? 'white' : 'rgba(255,255,255,0.7)'}
                  />
                </Animated.View>
                {isFocused && (
                  <Animated.View
                    style={[
                      styles.tabIndicator,
                      {opacity: tabAnimations[actualIndex]},
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Animated.View
          style={[
            styles.addButtonContainer,
            {
              transform: [
                {
                  scale: addButtonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity
            style={[styles.addButton, isDarkMode && styles.darkAddButton]}
            onPress={trayVisible ? closeTray : openTray}>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: iconRotationAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '135deg'],
                    }),
                  },
                ],
              }}>
              <Ionicons name="add" size={32} color="white" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Improved Tray Implementation */}
        {trayVisible && (
          <TouchableWithoutFeedback onPress={closeTray}>
            <View style={styles.overlay} pointerEvents="box-none">
              <View style={styles.trayPositioner} pointerEvents="box-none">
                <Animated.View
                  style={[
                    styles.trayContainer,
                    isDarkMode && styles.darkTrayContainer,
                    {
                      transform: [
                        {
                          scaleX: trayAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1],
                          }),
                        },
                        {
                          scaleY: trayAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1],
                          }),
                        },
                      ],
                      opacity: trayAnimation,
                    },
                  ]}
                  pointerEvents="box-none">
                  <TouchableOpacity
                    style={[styles.trayItem, styles.trayItemLeft]}
                    onPress={handleSettingsPress}>
                    <View
                      style={[
                        styles.trayIconContainer,
                        isDarkMode && styles.darkTrayIconContainer,
                      ]}>
                      <MaterialCommunityIcons
                        name="cog"
                        size={28}
                        color={isDarkMode ? '#90CAF9' : '#FF6B6B'}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.trayItem, styles.trayItemCenter]}
                    onPress={handleQuickQuizPress}>
                    <View
                      style={[
                        styles.trayIconContainer,
                        isDarkMode && styles.darkTrayIconContainer,
                      ]}>
                      <MaterialCommunityIcons
                        name="lightbulb-on"
                        size={28}
                        color={isDarkMode ? '#FFD54F' : '#FF9500'}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.trayItem, styles.trayItemRight]}
                    onPress={handleNightModePress}>
                    <View
                      style={[
                        styles.trayIconContainer,
                        isDarkMode && styles.darkTrayIconContainer,
                      ]}>
                      <MaterialCommunityIcons
                        name={isDarkMode ? 'weather-night' : 'theme-light-dark'}
                        size={28}
                        color={isDarkMode ? '#CE93D8' : '#8E44AD'}
                      />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* Profile Menu Overlay */}
        {profileMenuVisible && (
          <TouchableWithoutFeedback onPress={closeProfileMenu}>
            <View style={styles.profileOverlay}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <Animated.View 
                  style={[
                    styles.sideMenu,
                    {
                      transform: [
                        {
                          scale: profileMenuAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1],
                          }),
                        },
                        {
                          translateY: profileMenuAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                      opacity: profileMenuAnimation,
                    },
                  ]}
                >
                  <View style={styles.menuHeader}>
                    <TouchableOpacity style={styles.avatarContainer} onPress={() => alert('Change Avatar')}>
                      // In the profile menu section
                      <Image
                        source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png/seed=1' }}
                        style={styles.menuAvatar}
                      />
                      <View style={styles.editAvatarButton}>
                        <MaterialCommunityIcons name="pencil-circle" size={12} color="#7AB2D3"   onPress={() => navigation.navigate('Avatar')}/>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.usernameContainer}>
                      <Text style={[styles.menuUsername, { color: '#7AB2D3' }]}>Shaharuzzaman</Text>
                      <TouchableOpacity onPress={() => alert('Edit Username')} style={styles.editButton}>
                        <FontAwesome5 name="pen" size={12} color="#7AB2D3" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <View style={styles.menuDivider} />
                  
                  {renderMenuItem('home', 'Home', () => navigation.navigate('Home'))}
                  {renderMenuItem('history', 'History', () => navigation.navigate('History'))}
                  {renderMenuItem('trophy', 'Leaderboard', () => navigation.navigate('Leaderboard'))}
                  {renderMenuItem('cog', 'Setting', () => navigation.navigate('Settings'))}  // Updated this line
                  <View style={styles.menuDivider} />
                  {renderMenuItem('power-off', 'Log Out')}
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}

// Simple component for the Profile tab
const ProfileScreen = () => {
  return <View style={{ flex: 1 }}></View>;
};

const BottomTab = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        tabBar={props => (
          <CustomTabBar {...props} />
        )}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{iconName: 'home'}}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{iconName: 'time-sharp'}}
        />
        <Tab.Screen
          name="Add"
          component={NewTabScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderBoardScreen}
          options={{iconName: 'trophy-sharp'}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{iconName: 'person-sharp'}}
        />
       
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
  },
  navItem: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  addButtonSpace: {
    width: 60,
  },
  addButtonContainer: {
    position: 'absolute',
    top: -30,
    left: width / 2 - 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  addButton: {
    backgroundColor: '#7AB2D3',
    width: 80,
    height: 80,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  trayPositioner: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trayContainer: {
    width: 300,
    height: 150,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: 'hidden',
    paddingTop: 10,
  },
  trayItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  trayItemLeft: {
    marginTop: 30,
  },
  trayItemCenter: {
    marginTop: 5,
  },
  trayItemRight: {
    marginTop: 30,
  },
  trayIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7AB2D3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // Dark mode styles
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkBottomNav: {
    backgroundColor: '#333333',
  },
  darkAddButton: {
    backgroundColor: '#555555',
    borderColor: '#333333',
  },
  darkTrayContainer: {
    backgroundColor: 'transparent',
  },
  darkTrayIconContainer: {
    backgroundColor: '#222222',
    borderColor: '#444444',
  },
  
  // Profile menu styles
  profileOverlay: {
    position: 'absolute',
    top: -height, // This ensures it covers the full screen
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Profile menu styles
   menuAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 25,
    borderWidth: 4,
    borderColor: '#7AB2D3',
    backgroundColor: '#f5f5f5',
    marginTop: -50, // This makes it appear outside the container
    alignSelf:'center',
  },
  
  sideMenu: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 250,
    height: 'auto',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 10000,
    elevation: 10000,
  },
  menuItemText: {
    color: '#7AB2D3',
    fontSize: 15,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 51,
    bottom: 31,
    borderColor:'#7AB2D3',
    backgroundColor: 'white',
    borderWidth: 2,
    width: 25,
    height: 25,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7AB2D3',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(122, 178, 211, 0.2)',
    marginVertical: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: {
    width: 25,
    textAlign: 'center',
    marginRight: 15,
  },

    usernameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
 
});

export default BottomTab;

