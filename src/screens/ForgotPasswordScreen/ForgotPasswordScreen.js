import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {

    const [username, setUsername] = useState('');

    const navigation = useNavigation();

    const onSendPressed = () => {
        navigation.navigate('NewPassword');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ styles.root }>
                <Text style={ styles.title } >Reset your password</Text>

                <CustomInput 
                    placeholder="Username" 
                    value={username} 
                    setValue={setUsername} 
                />

                <CustomButton 
                    text="Send" 
                    onPress={ onSendPressed }
                />

                <CustomButton 
                    text="Back to Sign in" 
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