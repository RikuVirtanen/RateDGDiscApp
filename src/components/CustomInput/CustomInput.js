import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ value, setValue, placeholder, secure }) {
    return (
        <View style={ styles.container } >
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={ styles.input } 
                secureTextEntry={secure}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        minWidth: 160,
        height: 60
    }
})