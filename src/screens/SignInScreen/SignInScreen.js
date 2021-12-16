import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, View, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo.png'
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

const db = SQLite.openDatabase('users.db');

export default function SignInScreen() {

    const isFocused = useIsFocused();

    const [checkUser, setCheckUser] = useState(null);

    useEffect(() => {
        db.transaction(tx => {
            // tx.executeSql('DROP TABLE IF EXISTS user', []);
            tx.executeSql(
                'create table if not exists user ' +
                '(username text primary key not null, password text not null, email text not null);');
        }, null, updateList);
    }, [isFocused]);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from user where username (?);', [username], (_, { rows }) => 
                setCheckUser(rows._array)
            );
        });
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = async () => {
        updateList();
        if (checkUser === null) {
            Alert.alert("Warning!", "no users found");
        } else if (checkUser.password === null) {
            Alert.alert("Warning!", "Invalid password");
        } else if (!password === checkUser.password) {
            Alert.alert("Warning!", "Invalid username or password");
        }else {
            navigation.navigate('Home');
        }
        
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