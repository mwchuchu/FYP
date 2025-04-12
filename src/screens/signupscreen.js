import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Slider} from '@miblanchard/react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = () => {
   console.log('Signing up! ');
    return;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={24} color="#4A628A" />
          </TouchableOpacity>

          <View style={styles.header3}></View>
          <View style={styles.header2}></View>
          <View style={styles.header}>
            <Text style={styles.logo}>Mind Morph</Text>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="envelope" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.ageRow}>
                <Icon name="hourglass-half" size={20} style={styles.icon} />
                <Text style={styles.sliderLabel}>Age: {age}</Text>
              </View>
              <Slider
                value={Number(age)} // Ensure age is a number
                minimumValue={1}
                maximumValue={100}
                step={1}
                onValueChange={value => {
                  setAge(
                    Array.isArray(value) ? Number(value[0]) : Number(value),
                  ); // Store age as a number
                }}
                minimumTrackTintColor="#7AB2D3"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#7AB2D3"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  ageRow: {
    flexDirection: 'row', // Ensures icon and text are in the same row
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 5, // Space between text and slider
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sliderLabel: {
    fontSize: 18,
    color: '#7AB2D3',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    color: 'white',
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
  },
  signInText: {
    fontWeight: 'bold',
    color: '#4A628A',
    fontSize: 20,
    marginLeft: 5,
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
  },
  icon: {
    marginRight: 10,
    color: '#7AB2D3',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#7AB2D3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4A628A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});

export default SignUpScreen;
