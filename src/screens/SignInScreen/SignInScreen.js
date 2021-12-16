import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, View, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo.png'
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../../Navigation';

export default function SignInScreen() {

    const [username, setUsername] = useState('');
    // const [validPassword, setValidPassword] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    // const getData = async (name) => {
    //     try {
    //         const value = await AsyncStorage.getItem(name);
    //         if (value != null) {
    //             return JSON.parse(value);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const signIn = async () => {
    //     try {
    //         await AsyncStorage.setItem('isSignedIn', 'true'); 
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const onSignInPressed = async () => {
        navigation.navigate('Home');
        // const user = await getData(username);
        // setValidPassword(user.password);
        // if (password == validPassword) {
        //     // console.log(signIn());
        //     navigation.navigate('Home'); 
        // } else {
        //     Alert.alert("Warning!", "Invalid username or password");
        // }
        
    }

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.root }>
                <Image 
                    source={ Logo } 
                    style={ [styles.logo, {height: height * 0.3}] } 
                    resizeMode='contain' 
                />

                <CustomInput 
                    placeholder="Username" 
                    value={username} 
                    setValue={setUsername} 
                />
                <CustomInput 
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword} 
                    secure
                />

                <CustomButton 
                    text="Sign in" 
                    onPress={ onSignInPressed }
                />

                <CustomButton 
                    text="Forgot password?" 
                    onPress={ onForgotPassword } 
                    type="TERTIARY" 
                />

                <SocialSignInButtons />

                <CustomButton 
                    text="Don't have an account? Create one" 
                    onPress={ onSignUpPressed } 
                    type="TERTIARY" 
                />

            </View> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },  
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    }
})