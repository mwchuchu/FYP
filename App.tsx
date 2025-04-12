import 'react-native-gesture-handler';
import React, {useState} from 'react';
import isDarkMode from 'react-native/Libraries/Utilities/Platform';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screens/splashscreen';
import SignInScreen from './src/screens/signinscreen';
import ForgetPassScreen from './src/screens/forgetpass';
import ConfirmationScreen from './src/screens/confirmationscreen';
import BottomTab from './src/navigation/bottomtab';
import AvatarScreen from './src/screens/avatarselectionapp';
import SignUpScreen from './src/screens/signupscreen';
import OtherUserProfileScreen from './src/screens/otheruser';
import SettingsScreen from './src/screens/settings';
import {ThemeProvider} from './src/context/ThemeContext';
import CustomTopicScreen from './src/screens/CustomTopicScreen';
import {useTheme} from './src/context/ThemeContext';
import PlayScreen from './src/screens/PlayScreen';
import QuizStartScreen from './src/screens/QuizStartScreen';
import QuizResultScreen from './src/screens/QuizResultScreen';
import ShortQuestionStartScreen from './src/screens/ShortQuestionStartScreen';  
import ShortQuestionResultScreen from './src/screens/ShortQuestionResultScreen';
import { fonts } from './src/theme/fonts';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <ThemeProvider>
      <SplashScreen onFinish={() => setIsLoading(false)} />
    </ThemeProvider>
  ) : (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#7AB2D3',
            },
            cardStyleInterpolator: ({current, layouts}) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}>
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="otheruser" component={OtherUserProfileScreen} />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{title: 'Sign Up'}}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Avatar" component={AvatarScreen} />
          <Stack.Screen
            name="CustomTopic"
            component={CustomTopicScreen}
            options={{
              title: 'Custom Topic',
              headerStyle: {
                backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
              },
              headerTintColor: isDarkMode ? '#fff' : '#000',
            }}
          />
          <Stack.Screen
            name="ForgetPass"
            component={ForgetPassScreen}
            options={{title: 'Forgot Password'}}
          />
          <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
            options={{title: 'Confirmation'}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
          <Stack.Screen
            name="Play"
            component={PlayScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuizStart"
            component={QuizStartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuizResult"
            component={QuizResultScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
          name='ShortQuestionStart'
          component={ShortQuestionStartScreen}
          options={{headerShown: false}}/>
          <Stack.Screen
          name='ShortQuestionResult'
          component={ShortQuestionResultScreen}
          options={{headerShown: false}}/>  
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
