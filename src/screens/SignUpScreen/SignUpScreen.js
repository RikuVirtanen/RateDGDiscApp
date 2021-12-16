import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

export default function SignUpScreen() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        db.transaction(tx => {
            // tx.executeSql('DROP TABLE IF EXISTS user', []);
            tx.executeSql(
                'create table if not exists user ' +
                '(username text primary key not null, password text not null, email text not null);');
        }, null, null);
    }, []);

    const onRegisterPressed = async () => {
        if (username.length == 0) {
            Alert.alert('Warning!', 'Please enter username');
        }
        else if (email.length == 0) {
            Alert.alert('Warning!', 'Please enter email');
        } else if (password.length == 0) {
            Alert.alert('Warning!', 'Please enter password');
        }
        else if (passwordRepeat.length == 0) {
            Alert.alert('Warning!', 'Please re-enter password');
        }
        else if (password != passwordRepeat) {
            Alert.alert('Warning!', "Passwords don't match");
        }
        else {
            try {
                db.transaction(tx => {
                    tx.executeSql('insert into user (username, password, email) values (?, ?, ?);',
                        [username, password, email]);
                    }, null, null
                );
                Alert.alert("Success!", "Thank you for registering");
                navigation.navigate('SignIn');
            } catch (err) {
                Alert.alert("User with this username already exists!");
            }
        }
    }

    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed");
    }

    const onPrivacyPolicyPressed = () => {
        console.warn("onPrivacyPolicyPressed");
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.root }>
                <Text style={ styles.title } >Create an account</Text>

                <CustomInput 
                    placeholder="Username" 
                    value={username} 
                    setValue={setUsername} 
                />

                <CustomInput 
                    placeholder="Email" 
                    value={email} 
                    setValue={setEmail} 
                />

                <CustomInput 
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword} 
                    secure
                />

                <CustomInput 
                    placeholder="Repeat Password" 
                    value={passwordRepeat} 
                    setValue={setPasswordRepeat} 
                    secure
                />

                <CustomButton 
                    text="Register" 
                    onPress={ onRegisterPressed }
                />

                <Text style={ styles.text }>
                    By registering, you confirm that you accept our {' '}
                    <Text style={ styles.link } onPress={ onTermsOfUsePressed } >Terms of Use</Text> and {' '}
                    <Text style={ styles.link } onPress={ onPrivacyPolicyPressed } >Privacy Policy</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton 
                    text="Have an account? Sign in" 
                    onPress={ onSignInPressed } 
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'grey',
        marginVertical: 10,
    },  
    link: {
        color: '#FDB075',
    }
})