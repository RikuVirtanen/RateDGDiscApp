import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import CameraIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {

    const [camera, setCamera] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const TakePicture = async () => {
        if (camera) {
            const options = {quality: 0.5, base64: true, skipProcessing: false}
            try {
                let photo = await camera.takePictureAsync(options);
                navigation.navigate("Add", {image: photo.uri});
            } catch(err) {
                console.log(err);
            }   
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 0.25}}>

</View>
            <Camera
                ref={ ref => setCamera(ref)}
                style={styles.camera} 
                type={Camera.Constants.Type.back}
                ratio={'1.1'}
            >
                <View style={styles.buttonContainer}>
                    
                </View>
            </Camera>
            <View style={ styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => TakePicture()}    
                >
                    <CameraIcon name="camera" size={50} color="white" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    buttonContainer: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});