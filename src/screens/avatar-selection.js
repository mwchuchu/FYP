import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AvatarSelection = ({onAvatarSelected, onSkip}) => {
  const [gender, setGender] = useState('male'); // Default gender
  const [currentIndex, setCurrentIndex] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);

  // DiceBear avatar styles with appropriate options
  const avatarStyles = {
    male: [
      {
        style: 'avataaars-neutral',
        options: 'topChance=100&hairColor=black,brown,auburn,red,blonde',
      },
      {style: 'bottts', options: 'radius=50'},
      {
        style: 'micah',
        options: 'radius=50',
      },
      {
        style: 'adventurer-neutral',
        options:
          'hairColor=black,brown,red,blonde&skinColor=f2d3b1,ecad80,bf9169,9e5622',
      },
      {style: 'pixel-art', options: 'mood=happy&gender=male'},
      {
        style: 'personas',
        options: 'felix',
      },
      {
        style: 'miniavs',
        options: 'aneka&bodyColor=3633e0,e05a33,ff4dd8',
      },
      {
        style: 'pixel-art-neutral',
        options: 'felix',
      },
      {
        style: 'fun-emoji',
        options: 'felix',
      },
      {
        style: 'big-ears',
        options: 'aneka',
      },
    ],
    female: [
      {
        style: 'open-peeps',
        options: 'facialHair=chin,full,full2&head=bun,long,bangs2',
      },
      {
        style: 'lorelei-neutral',
        options: 'eyebrows=variant01,variant05,variant03,variant13',
      },
      {style: 'lorelei', options: 'radius=50'},
      {
        style: 'notionists',
        options: 'gesture=hand,handPhone,ok&hair=variant02,variant08,variant39',
      },
      {
        style: 'adventurer',
        options:
          'hairProbability=100&skinColor=f2d3b1,ecad80,bf9169&gender=female',
      },
      {
        style: 'personas',
        options: 'hair=long&hairColorRandom=0&skinColor=0e0e0e,f2d3b1,d29985',
      },
      {
        style: 'miniavs',
        options: 'felix&bodyColor=3633e0,e05a33,ff4dd8',
      },
      {
        style: 'thumbs',
        options: 'felix&bodyColor=3633e0,e05a33,ff4dd8',
      },
      {
        style: 'fun-emoji',
        options: 'aneka&eyes=cute,glasses,love',
      },
      {
        style: 'big-smile',
        options: 'felix&hair=bangs,froBun,braids',
      },
    ],
  };

  // Predefined seeds for consistent avatars
  const predefinedSeeds = {
    male: [
      'john',
      'alex',
      'miguel',
      'robert',
      'james',
      'david',
      'michael',
      'chris',
      'ethan',
      'daniel',
      'jason',
      'matthew',
      'sam',
      'kevin',
      'william',
      'carlos',
      'ryan',
      'noah',
    ],
    female: [
      'emma',
      'olivia',
      'sarah',
      'amber',
      'jennifer',
      'mia',
      'sophia',
      'isabella',
      'ava',
      'diana',
      'rachel',
      'jessica',
      'natalie',
      'ashley',
      'samantha',
      'olivia',
      'lily',
      'zoe',
    ],
  };

  // Generate avatar URLs
  useEffect(() => {
    setLoading(true);
    const newAvatars = [];
    const selectedStyles = avatarStyles[gender];

    // Generate avatars for each style with predefined seeds
    selectedStyles.forEach((styleObj, styleIndex) => {
      // Use 3 seeds per style
      for (let i = 0; i < 3; i++) {
        const seedIndex = styleIndex * 3 + i;
        const seed =
          predefinedSeeds[gender][seedIndex % predefinedSeeds[gender].length];

        // Construct the URL with proper options
        const url = `https://api.dicebear.com/9.x/${styleObj.style}/png?seed=${seed}&${styleObj.options}`;
        newAvatars.push({url, style: styleObj.style, seed});
      }
    });

    setAvatars(newAvatars);
    setCurrentIndex(0);
    setLoading(false);
  }, [gender]);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % avatars.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + avatars.length) % avatars.length,
    );
  };

  const handleSelect = () => {
    if (avatars.length > 0) {
      onAvatarSelected(avatars[currentIndex].url);
    }
  };

  const handleSkip = () => {
    // Provide default avatar based on gender
    const defaultAvatar =
      gender === 'male'
        ? {type: 'icon', name: 'face-man'}
        : {type: 'icon', name: 'face-woman'};
    onSkip(defaultAvatar);
  };

  const toggleGender = () => {
    setGender(prevGender => (prevGender === 'male' ? 'female' : 'male'));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading avatars...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>Choose Your Avatar</Text>

          <TouchableOpacity style={styles.genderToggle} onPress={toggleGender}>
            <Text style={styles.genderText}>
              {gender === 'male' ? 'Male' : 'Female'}
              <MaterialCommunityIcons
                name={gender === 'male' ? 'gender-male' : 'gender-female'}
                size={30}
                color="#7A2BC3"
              />
            </Text>
            <Text style={styles.toggleText}>Toggle Gender</Text>
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color="#4A628A"
              />
            </TouchableOpacity>

            {avatars.length > 0 && (
              <View style={styles.avatarWrapper}>
                <Image
                  source={{uri: avatars[currentIndex].url}}
                  style={styles.avatar}
                  resizeMode="cover"
                />
                <Text style={styles.avatarStyle}>
                  {avatars[currentIndex].style} • {avatars[currentIndex].seed}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={30}
                color="#4A628A"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.counter}>
            Avatar {currentIndex + 1} of {avatars.length}
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSelect}>
              <Text style={styles.buttonText}>Select this avatar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#4A628A',
  },
  genderToggle: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 25,
    padding: 15,
    backgroundColor: '#7AB2D3',
    borderRadius: 10,
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    borderWidth: 6,
    borderColor: '#4A628A',
    backgroundColor: '#7AB2D3',
  },
  avatarStyle: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  navButton: {
    padding: 6,
  },
  counter: {
    fontSize: 14,
    color: '#78AAAF',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
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
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#78AAAF',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 20,
    color: '#4A628A',
  },
});

export default AvatarSelection;
