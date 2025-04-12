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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = () => {
    console.log('Signing in...');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

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
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
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

            <View style={styles.rememberForgotContainer}>
              <View style={styles.rememberMeContainer}>
                <CheckBox
                  value={!!rememberMe}
                  onValueChange={newValue => setRememberMe(newValue)}
                  tintColors={{true: '#4A628A', false: '#4A628A'}}
                  style={styles.checkbox}
                />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPass')}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign-In Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  signUpText: {
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
    shadowOffset: {width: 5, height: 5},
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 5,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#4A628A',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#78AAAF',
    fontWeight: 'bold',
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

export default SignInScreen;
