// Update the handlePress function in HomeScreen.js
const handlePress = index => {
  // First handle the animation
  animatedValues.forEach(value => value.setValue(0));
  Animated.sequence([
    Animated.timing(animatedValues[index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start(() => {
    // After animation, navigate to CustomTopic with the category name
    navigation.navigate('CustomTopic', {
      presetTopic: categories[index].name
    });
  });
};