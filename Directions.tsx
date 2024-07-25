// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// interface NavigationStep {
//   instructions: string;
//   distance: string;
//   duration: string;
//   imageUrl: string;
// }

// interface DirectionsProps {
//   apiKey: string;
//   startPoint: string;
//   endPoint: string;
// }

// const Directions: React.FC<DirectionsProps> = ({ apiKey, startPoint, endPoint }) => {
//   const [navigationSteps, setNavigationSteps] = useState<NavigationStep[]>([]);

//   useEffect(() => {
//     buildNavigationImagesWithDetails(startPoint, endPoint, apiKey).then((steps) => {
//       setNavigationSteps(steps);
//     });
//   }, [startPoint, endPoint, apiKey]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {navigationSteps.length > 0 ? (
//         navigationSteps.map((step, idx) => (
//           <View key={idx} style={styles.stepContainer}>
//             <Image source={{ uri: step.imageUrl }} style={styles.image} />
//             <Text>Step {idx + 1}: {step.instructions}</Text>
//             <Text>Distance: {step.distance}, Duration: {step.duration}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </ScrollView>
//   );
// };

// const buildNavigationImagesWithDetails = async (start: string, end: string, apiKey: string): Promise<NavigationStep[]> => {
//   const steps = await getDirections(start, end, apiKey);
//   if (!steps) {
//     return [];
//   }

//   const navigationSteps = await Promise.all(steps.map(async (step: any) => {
//     const lat = step.end_location.lat;
//     const lng = step.end_location.lng;
//     const location = `${lat},${lng}`;
//     const imageUrl = getStreetViewImage(location, apiKey);
//     const instructions = cleanHtmlTags(step.html_instructions);
//     const distance = step.distance.text;
//     const duration = step.duration.text;

//     return {
//       instructions,
//       distance,
//       duration,
//       imageUrl,
//     };
//   }));

//   return navigationSteps;
// };

// const getDirections = async (start: string, end: string, apiKey: string): Promise<any[]> => {
//   const directionsEndpoint = 'https://maps.googleapis.com/maps/api/directions/json';
//   const url = `${directionsEndpoint}?origin=${start}&destination=${end}&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!data.routes || data.routes.length === 0) {
//       return [];
//     }

//     return data.routes[0].legs[0].steps;
//   } catch (error) {
//     console.error('Error fetching directions:', error);
//     return [];
//   }
// };

// const getStreetViewImage = (location: string, apiKey: string): string => {
//   const streetViewEndpoint = 'https://maps.googleapis.com/maps/api/streetview';
//   return `${streetViewEndpoint}?location=${location}&size=600x300&key=${apiKey}`;
// };

// const cleanHtmlTags = (text: string): string => {
//   return text.replace(/<.*?>/g, '');
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   stepContainer: {
//     marginBottom: 20,
//   },
//   image: {
//     width: 600,
//     height: 300,
//     marginBottom: 10,
//   },
// });

// export default Directions;


import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

interface NavigationStep {
  instructions: string;
  distance: string;
  duration: string;
  imageUrl: string;
}

interface DirectionsScreenProps {
  route: RouteProp<{ params: { startPoint: string; endPoint: string } }, 'params'>;
}

const DirectionsScreen: React.FC<DirectionsScreenProps> = () => {
  const route = useRoute<DirectionsScreenProps['route']>();
  const { startPoint, endPoint } = route.params;
  const [navigationSteps, setNavigationSteps] = useState<NavigationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    buildNavigationImagesWithDetails(startPoint, endPoint, 'YOUR_GOOGLE_MAPS_API_KEY').then((steps) => {
      setNavigationSteps(steps);
      setCurrentStepIndex(0);
    });
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (navigationSteps.length > 0 && currentStepIndex < navigationSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, navigationSteps]);

  if (navigationSteps.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentStep = navigationSteps[currentStepIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.stepContainer}>
        <Image source={{ uri: currentStep.imageUrl }} style={styles.image} />
        <Text>Step {currentStepIndex + 1}: {currentStep.instructions}</Text>
        <Text>Distance: {currentStep.distance}, Duration: {currentStep.duration}</Text>
      </View>
    </ScrollView>
  );
};

const buildNavigationImagesWithDetails = async (start: string, end: string, apiKey: string): Promise<NavigationStep[]> => {
  const steps = await getDirections(start, end, apiKey);
  if (!steps) {
    return [];
  }

  const navigationSteps = await Promise.all(steps.map(async (step: any) => {
    const lat = step.end_location.lat;
    const lng = step.end_location.lng;
    const location = `${lat},${lng}`;
    const imageUrl = getStreetViewImage(location, apiKey);
    const instructions = cleanHtmlTags(step.html_instructions);
    const distance = step.distance.text;
    const duration = step.duration.text;

    return {
      instructions,
      distance,
      duration,
      imageUrl,
    };
  }));

  return navigationSteps;
};

const getDirections = async (start: string, end: string, apiKey: string): Promise<any[]> => {
  const directionsEndpoint = 'https://maps.googleapis.com/maps/api/directions/json';
  const url = `${directionsEndpoint}?origin=${start}&destination=${end}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      return [];
    }

    return data.routes[0].legs[0].steps;
  } catch (error) {
    console.error('Error fetching directions:', error);
    return [];
  }
};

const getStreetViewImage = (location: string, apiKey: string): string => {
  const streetViewEndpoint = 'https://maps.googleapis.com/maps/api/streetview';
  return `${streetViewEndpoint}?location=${location}&size=600x300&key=${apiKey}`;
};

const cleanHtmlTags = (text: string): string => {
  return text.replace(/<.*?>/g, '');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  stepContainer: {
    marginBottom: 20,
  },
  image: {
    width: 600,
    height: 300,
    marginBottom: 10,
  },
});

export default DirectionsScreen;
