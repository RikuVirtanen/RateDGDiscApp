import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import List from '../../components/List';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('discs.db');

export default function HomeScreen({ navigation }) {

    // const getItems = async () => {
    //     try {
    //         const keys = await AsyncStorage.getAllKeys();
    //         const result = await AsyncStorage.multiGet(keys);

    //         setDiscs(result);
            
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }

    const onAddDisc = () => {
        navigation.navigate("Add", {image: null})
    }

    const signoutPressed = async () => {
        // console.log('onSignoutPressed')
        // try {
        //     await AsyncStorage.setItem('isSignedIn', 'false');
        // } catch (err) {
        //     console.log(err);
        // }
        navigation.navigate('SignIn');
    }

    return (
        <View style={ styles.container }>
            <View style={{padding: 10, left: 120}}>
                <CustomButton 
                    text="Signout"
                    onPress={signoutPressed}
                    type="SIGNOUT"
                />
            </View>
            <CustomButton
                text="Add new disc"
                onPress={onAddDisc}
            />
            <List />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        width: '100%',
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