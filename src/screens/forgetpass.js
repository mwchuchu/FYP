import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ForgetPassScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRecoverPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);

      // Navigate to ConfirmationScreen after the API call is successful
      navigation.navigate('ConfirmationScreen', {email}); // Pass email as a parameter if needed
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#4A628A" />
        </TouchableOpacity>

        <View style={styles.header3}></View>
        <View style={styles.header2}></View>
        <View style={styles.header}>
          <Text style={styles.logo}>Mind Morph</Text>
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              Forgot your password? Don't worry!
            </Text>
          </View>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              accessibilityLabel="Email input"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRecoverPassword}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Recover password button">
            {loading ? (
              <ActivityIndicator color="#4A628A" />
            ) : (
              <Text style={styles.buttonText}>Recover Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    backgroundColor: '#7AB2D3',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#00879E',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  header2: {
    position: 'absolute',
    height: 213,
    width: '95%',
    backgroundColor: '#9CCAE5',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    alignSelf: 'center',
  },
  header3: {
    position: 'absolute',
    height: 225,
    width: '90%',
    backgroundColor: '#CFE3F2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'center',
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#B9E5E8',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginTop: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  form: {
    padding: 20,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    elevation: 15,
    shadowColor: '#7AB2D3',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  icon: {
    marginRight: 10,
    color: '#7AB2D3',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 15,
    shadowColor: '#003092',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#4A628A',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
