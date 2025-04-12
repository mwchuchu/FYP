import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const SplashScreen = ({onFinish}) => {
  useEffect(() => {
    setTimeout(() => {
      onFinish(); // Move to SignUpScreen after 3 seconds
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mind Morph</Text>
      <ActivityIndicator size="large" color="#4A628A" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B9E5E8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A628A',
    marginBottom: 20,
    fontFamily: 'Nunito Sans',
  },
});

export default SplashScreen;
