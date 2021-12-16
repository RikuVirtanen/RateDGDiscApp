import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../components/Camera';
import AddDiscScreen from "../screens/AddDiscScreen";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const [isSignedIn, setIsSignedIn] = useState('');

    useEffect(() => {
        db.transaction(tx => {
            // tx.executeSql('DROP TABLE IF EXISTS user', []);
            tx.executeSql(
                'create table if not exists signed_in ' +
                '(id integer primary key not null, signedIn boolean not null);');
        }, null, updateList);
    }, []);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select signedIn from signed_in;', [], (_, { rows }) => 
                setIsSignedIn(rows._array)
            );
        });
    }

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Add" component={AddDiscScreen} />
                <Stack.Screen name="TakePicture" component={CameraScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}