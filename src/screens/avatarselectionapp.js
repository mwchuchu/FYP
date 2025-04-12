import React, {useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarSelection from './avatar-selection';

const AvatarScreen = () => {
  const [avatarSelected, setAvatarSelected] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarSelected = avatarUrl => {
    setAvatar({type: 'image', url: avatarUrl});
    setAvatarSelected(true);
  };

  const handleSkip = defaultAvatar => {
    setAvatar(defaultAvatar);
    setAvatarSelected(true);
  };

  const handleGoBack = () => {
    setAvatarSelected(false);
    setAvatar(null);
  };

  const substring = 'face-';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.profileContainer}>
          {!avatarSelected ? (
            <AvatarSelection
              onAvatarSelected={handleAvatarSelected}
              onSkip={handleSkip}
            />
          ) : (
            <View style={styles.profileContainer}>
              <Text style={styles.title}>Your Profile</Text>
              {avatar.type === 'image' ? (
                <>
                  <Image
                    source={{uri: avatar.url}}
                    style={styles.avatar}
                    accessibilityLabel="Selected avatar"
                  />
                  <Text style={styles.profileText}>
                    Avatar successfully set!
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.avatar}>
                    <MaterialCommunityIcons
                      name={avatar.name}
                      size={160}
                      color="#4A628A"
                      accessibilityLabel="Default avatar"
                    />
                  </View>
                  <Text style={styles.profileText}>
                    {avatar.name.replace(substring, 'Default ')} avatar
                    successfully set!
                  </Text>
                </>
              )}
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleGoBack}
                accessibilityRole="button"
                accessibilityLabel="Go back to avatar selection">
                <Text style={styles.backButtonText}>Change Avatar</Text>
              </TouchableOpacity>
            </View>
          )}
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
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4A628A',
  },
  avatar: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 6,
    borderColor: '#4A628A',
    backgroundColor: '#7AB2D3',
  },
  profileText: {
    marginTop: 20,
    fontSize: 20,
    color: '#78AAAF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#7AB2D3',
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A628A',
    fontWeight: 'bold',
  },
});

export default AvatarScreen;
