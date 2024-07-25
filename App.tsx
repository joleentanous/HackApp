// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Directions from "./Directions"

// export default function App() {
//   const apiKey = 'AIzaSyCwL25yvXya8mVFU5jLHsrAz6-AgDOIWbU';
//   const startPoint = 'קניון עזריאלי';
//   const endPoint = 'קניון איילון';
//   // var showDirectios = false;
//   // var showSelectionPage = true;
//   return (
//     <View style={styles.container}>
//         <Directions apiKey={apiKey} startPoint={startPoint} endPoint={endPoint} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DirectionsScreen from './DirectionsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Directions" component={DirectionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
