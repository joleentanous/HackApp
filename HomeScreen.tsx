import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Directions', { startPoint, endPoint });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter start point"
        value={startPoint}
        onChangeText={setStartPoint}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter end point"
        value={endPoint}
        onChangeText={setEndPoint}
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default HomeScreen;
