import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <View style={styles.container}>
        <View style={styles.header3}></View>
        <View style={styles.header2}></View>
      <View style={styles.header}>
       
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.settingsBox}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="volume-high" size={24} color="white" />
            <Text style={styles.settingText}>Sound Effects</Text>
          </View>
          <Switch
            value={sound}
            onValueChange={setSound}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={sound ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="music" size={24} color="white" />
            <Text style={styles.settingText}>Background Music</Text>
          </View>
          <Switch
            value={music}
            onValueChange={setMusic}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={music ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="bell" size={24} color="white" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={notifications ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="translate" size={24} color="white" />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.languageText}>{language}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
       <View style={styles.copyrightContainer}>
          <View style={styles.copyrightLine} />
          <View style={styles.copyrightContent}>
            <MaterialCommunityIcons  name="copyright" size={16} color="#7AB2D3" />
            <Text style={styles.copyrightText}>Mind Morph, Inc.</Text>
          </View>
          <View style={styles.homeIconContainer}>
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <MaterialCommunityIcons name="home" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.copyrightYear}>2025</Text>
          </View>
        </View>
        <View style={styles.bottomPadding} />
    </View>
  );
};
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header2: {
    position: 'absolute',
    height: height * 0.27, // 25% of screen height
    width: '98%',
    backgroundColor: '#9CCAE5',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    alignSelf: 'center',
    top: 160,
  },
  header3: {
    top: 160,
    position: 'absolute',
    height: height * 0.28, // 25% of screen height
    width: '95%',
    backgroundColor: '#CFE3F2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'center',
  },
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  settingsBox: {
    backgroundColor: '#7AB2D3',
    borderRadius: 18,
    padding: 20,
},
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  languageText: {
    color: 'white',
    fontSize: 16,
  },

  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7AB2D3',
    marginLeft: 15,
  },
  copyrightContainer: {
    position: 'relative',
    marginTop: 70,
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

export default SettingsScreen;