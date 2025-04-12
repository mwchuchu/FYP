import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Remove the SVG car component and use a View-based car instead
const CarView = (props) => {
  return (
    <View style={styles.carBody}>
      <View style={styles.carTop} />
      <View style={styles.carWindow} />
      <View style={styles.carFront} />
      <View style={styles.carWheel1} />
      <View style={styles.carWheel2} />
    </View>
  );
};

const NewTabScreen = () => {
  const navigation = useNavigation();
  const carPosition = useRef(new Animated.Value(0)).current;
  const bouncePosition = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.5)).current;
  const carRef = useRef(null);
  const [isMoving, setIsMoving] = useState(true);
  const [trayVisible, setTrayVisible] = useState(false);
  const trayAnimation = useRef(new Animated.Value(0)).current;

  // Animation for car
  useEffect(() => {
    if (isMoving) {
      // Car movement animation
      Animated.loop(
        Animated.timing(carPosition, {
          toValue: width,
          duration: 3000, // Faster speed
          useNativeDriver: true,
        })
      ).start();
      
      // Bouncing animation to simulate road bumps
      Animated.loop(
        Animated.sequence([
          Animated.timing(bouncePosition, {
            toValue: 2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bouncePosition, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Scale animation to simulate 3D perspective
      Animated.loop(
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      carPosition.stopAnimation();
      bouncePosition.stopAnimation();
      scaleValue.stopAnimation();
    }
  }, [isMoving]);

  // Animation for tray
  useEffect(() => {
    Animated.timing(trayAnimation, {
      toValue: trayVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [trayVisible]);

  const toggleMoving = () => {
    setIsMoving(!isMoving);
  };

  const toggleTray = () => {
    setTrayVisible(!trayVisible);
  };

  const handleSettingsPress = () => {
    setTrayVisible(false);
    navigation.navigate('Settings');
  };

  const handleQuickQuizPress = () => {
    setTrayVisible(false);
    // Navigate to quick quiz or implement quiz functionality
    alert('Quick Quiz Selected');
  };

  const handleNightModePress = () => {
    setTrayVisible(false);
    // Toggle night mode
    alert('Night Mode Toggled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3D Racing Animation</Text>
      
      {/* 3D Track */}
      <View style={styles.scene3D}>
        {/* Sky background */}
        <View style={styles.sky} />
        
        {/* Sun with 3D glow */}
        <View style={styles.sun}>
          <View style={styles.sunGlow} />
        </View>
        
        {/* Mountains in background */}
        <View style={styles.mountains}>
          <View style={styles.mountain1} />
          <View style={styles.mountain2} />
          <View style={styles.mountain3} />
        </View>
        
        {/* 3D Road with perspective */}
        <View style={styles.roadContainer}>
          <View style={styles.roadPerspective} />
          
          {/* Road markings with perspective */}
          <View style={[styles.roadLine, {bottom: 35, width: 20}]} />
          <View style={[styles.roadLine, {bottom: 35, left: '20%', width: 30}]} />
          <View style={[styles.roadLine, {bottom: 35, left: '40%', width: 40}]} />
          <View style={[styles.roadLine, {bottom: 35, left: '60%', width: 50}]} />
          <View style={[styles.roadLine, {bottom: 35, left: '80%', width: 60}]} />
        </View>
        
        {/* Car with 3D effects - replaced SVG with View-based car */}
        <Animated.View
          ref={carRef}
          style={[
            styles.car,
            {
              transform: [
                { translateX: carPosition },
                { translateY: bouncePosition },
                { scale: Animated.add(0.5, 
                  Animated.multiply(scaleValue, 
                    Animated.divide(carPosition, new Animated.Value(width))
                  )
                )},
              ],
              zIndex: 10,
            },
          ]}
        >
          <CarView />
          <Animated.View style={styles.shadow} />
        </Animated.View>
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleMoving}>
          <Text style={styles.buttonText}>
            {isMoving ? "Stop Car" : "Start Car"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Plus Button */}
      <TouchableOpacity 
        style={styles.plusButton}
        onPress={toggleTray}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Tray Overlay */}
      {trayVisible && (
        <View style={styles.overlay}>
          <TouchableOpacity 
            style={styles.overlayBackground}
            activeOpacity={1}
            onPress={toggleTray}
          />
          
          <Animated.View 
            style={[
              styles.trayContainer,
              {
                transform: [
                  { 
                    translateY: trayAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [200, 0]
                    })
                  }
                ],
                opacity: trayAnimation
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.trayItem}
              onPress={handleSettingsPress}
            >
              <View style={styles.trayIconContainer}>
                <MaterialCommunityIcons name="cog" size={28} color="#7AB2D3" />
              </View>
              <Text style={styles.trayText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.trayItem}
              onPress={handleQuickQuizPress}
            >
              <View style={styles.trayIconContainer}>
                <MaterialCommunityIcons name="lightbulb-on" size={28} color="#FF9500" />
              </View>
              <Text style={styles.trayText}>Quick Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.trayItem}
              onPress={handleNightModePress}
            >
              <View style={styles.trayIconContainer}>
                <MaterialCommunityIcons name="theme-light-dark" size={28} color="#8E44AD" />
              </View>
              <Text style={styles.trayText}>Night Mode</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#003366',
  },
  scene3D: {
    width: '100%',
    height: 250,
    position: 'relative',
    marginBottom: 40,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    perspective: 1000,
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#87CEEB',
  },
  sun: {
    position: 'absolute',
    top: 30,
    right: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  sunGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  mountains: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 100,
  },
  mountain1: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: 150,
    height: 80,
    backgroundColor: '#6B8E23',
    borderRadius: 75,
    transform: [{ scaleX: 3 }],
  },
  mountain2: {
    position: 'absolute',
    bottom: 0,
    right: '5%',
    width: 120,
    height: 60,
    backgroundColor: '#556B2F',
    borderRadius: 60,
    transform: [{ scaleX: 2.5 }],
  },
  mountain3: {
    position: 'absolute',
    bottom: 0,
    left: '40%',
    width: 180,
    height: 90,
    backgroundColor: '#808000',
    borderRadius: 90,
    transform: [{ scaleX: 2 }],
  },
  roadContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    overflow: 'hidden',
  },
  roadPerspective: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#333333',
    transform: [{ perspective: 500 }, { rotateX: '30deg' }],
    borderTopWidth: 2,
    borderTopColor: '#777',
  },
  roadLine: {
    position: 'absolute',
    height: 5,
    backgroundColor: 'yellow',
    zIndex: 5,
  },
  car: {
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  carBody: {
    width: 80,
    height: 30,
    backgroundColor: '#FF3333',
    borderRadius: 8,
    position: 'relative',
    zIndex: 20,
  },
  carTop: {
    position: 'absolute',
    top: -15,
    left: 15,
    width: 40,
    height: 15,
    backgroundColor: '#FF3333',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 21,
  },
  carWindow: {
    position: 'absolute',
    top: -12,
    left: 20,
    width: 30,
    height: 10,
    backgroundColor: '#87CEFA',
    borderRadius: 4,
    zIndex: 22,
  },
  carFront: {
    position: 'absolute',
    right: -5,
    top: 5,
    width: 10,
    height: 20,
    backgroundColor: '#FF3333',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    zIndex: 21,
  },
  carWheel1: {
    position: 'absolute',
    bottom: -8,
    left: 15,
    width: 15,
    height: 15,
    backgroundColor: '#333',
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: '#777',
    zIndex: 23,
  },
  carWheel2: {
    position: 'absolute',
    bottom: -8,
    right: 15,
    width: 15,
    height: 15,
    backgroundColor: '#333',
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: '#777',
    zIndex: 23,
  },
  shadow: {
    position: 'absolute',
    bottom: -15,
    left: 25,
    width: 40,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    transform: [{ scaleX: 2 }],
    zIndex: 19,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF3333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // New styles for plus button and tray
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7AB2D3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  trayContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  trayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trayIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default NewTabScreen;