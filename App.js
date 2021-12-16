import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigation from './src/Navigation';

export default function App() {

  const getIsSignedIn = async () => {
    try {
        const value = await AsyncStorage.getItem('isSignedIn');
        if (value !== null) {
            console.log(value);
            return value;
        } else {
            await AsyncStorage.setItem('isSignedIn', 'false');
            return false;
        }
    } catch (err) {
        console.log(err);
    }
  }
  
  return (
    <SafeAreaView style={ styles.root }>
      <Navigation isSignedIn={getIsSignedIn}/>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    paddingTop: 50
  }
});