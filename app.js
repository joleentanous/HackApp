import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [pathImage, setPathImage] = useState(null);

    const fetchPathImage = async () => {
        try {
            const response = await axios.get(`http://your-ip-address:3000/path-image`, {
                params: {
                    origin: origin,
                    destination: destination
                },
                responseType: 'arraybuffer'
            });
            const imageBlob = new Blob([response.data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setPathImage(imageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Origin:</Text>
            <TextInput
                style={styles.input}
                value={origin}
                onChangeText={setOrigin}
                placeholder="Enter origin"
            />
            <Text>Destination:</Text>
            <TextInput
                style={styles.input}
                value={destination}
                onChangeText={setDestination}
                placeholder="Enter destination"
            />
            <Button title="Get Path Image" onPress={fetchPathImage} />
            {pathImage && <Image source={{ uri: pathImage }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 400,
        marginTop: 16,
    },
});
