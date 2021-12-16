import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import List from '../../components/List';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';

export default function HomeScreen({ navigation }) {

    const [discs, setDiscs] = useState({});

    const getItems = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);

            setDiscs(result);
            
        } catch (err) {
            console.log(err);
        }
    }

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }

    const onAddDisc = () => {
        navigation.navigate("Add", {image: null})
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getItems();
            console.log(discs)
        })
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={ styles.container }>
            <Button title="Don't press me" onPress={clearAsyncStorage}>
                <Text>Clear Async Storage</Text>
            </Button>
            <CustomButton
                text="Add new disc"
                onPress={onAddDisc}
            />
            {discs ? <List discs={discs} /> : <Text>No discs added</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        display: 'flex',
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },  
    signout: {
        color: 'red',
        marginVertical: 10,
        left: 320,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
});