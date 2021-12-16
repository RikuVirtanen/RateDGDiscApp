import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomButton({ onPress, text, icon, type = "PRIMARY", bgColor, fgColor, width }) {

    return (
        <Pressable 
            onPress={ onPress }
            style={[
                styles.container, 
                styles[`container_${type}`],
                width ? {width: width} : {},
                bgColor ? {backgroundColor: bgColor} : {}
            ]}
        >
            {text 
            ? 
                <Text 
                    style={[
                        styles.text, 
                        styles[`text_${type}`],
                        fgColor ? {color: fgColor} : {}
                    ]}
                >
                    {text}
                </Text>
            : null}
            {icon
            ? 
                <Icon
                    name={icon}
                    size={50}
                    color={bgColor}
                />
            : null}
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    container_TERTIARY: {

    },
    container_SIGNOUT: {
        width: '25%',
        backgroundColor: 'red',
    },
    container_SNAP: {
        width: '25%',
        backgroundColor: '#3B71F3'
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },

    text_SECONDARY: {
        color: '#3B71F3',
    },

    text_TERTIARY: {
        color: 'grey'
    },
    text_SIGNOUT: {
        color: 'white'
    },
})