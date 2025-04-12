import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ConfirmationScreen = ({route}) => {
  const {email} = route.params; // Access the email parameter passed from ForgetPassScreen
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#4A628A" />
      </TouchableOpacity>

      <Text style={styles.title}>Confirmation</Text>
      <Text style={styles.message}>
        A password reset link has been sent to {email}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A628A',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    color: '#78AAAF',
  },
});

export default ConfirmationScreen;
