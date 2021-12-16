import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/CustomInput';

export default function AddDiscScreen({route, navigation}) {

    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [company, setCompany] = useState(null);
    const [plastic, setPlastic] = useState(null);
    const { image } = route.params;
        

    const takePicture = () => {
        navigation.navigate("TakePicture");
    }
    const validate = () => {
        if (name && type && company && plastic) {
            return true;
        } else {
            return false;
        }
    }

    const save = async () => {
        if (validate()) {
            try {
                if (!await AsyncStorage.getItem(name)) {
                    saveDisc();
                } else {
                    Alert.alert("Error", "Disc is already added")
                }
            } catch (err) {
                console.log(err);
            }   
        } else {
            Alert.alert("Missing info", "Please fill all the input values");
        }   
    }

    const saveDisc = async () => {
        const disc = ({
            name: name,
            type: type,
            company: company,
            plastic: plastic,
            image: image
        });
        try {
            await AsyncStorage.setItem(name, JSON.stringify(disc));
            Alert.alert("Success!", "Disc was added, thank you for the contribution")
            console.log("Successful save!");
        } catch (err) {
            console.log(err);
        }
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Add a new Disc</Text>
                <CustomButton 
                    text="Signout"
                    onPress={signoutPressed}
                    type="SIGNOUT"
                />
            </View>
            
            <View style={ styles.inputContainer }>
                <View style={ styles.input }>
                    <View>
                        <Text>Disc</Text>
                        <CustomInput 
                            placeholder="Name the disc"
                            value={name}
                            setValue={setName}
                        />
                    </View>
                    <View>
                        <Text>Type</Text>
                        <CustomInput 
                            placeholder="Name the type"
                            value={type}
                            setValue={setType}
                        />
                    </View>
                    
                </View>
                <View style={ styles.input }>
                    <View>
                        <Text>Company</Text>
                        <CustomInput 
                            placeholder="Name the company"
                            value={company}
                            setValue={setCompany}
                        />
                    </View>
                    <View>
                        <Text>Plastic</Text>
                        <CustomInput 
                            placeholder="Name the plastic"
                            value={plastic}
                            setValue={setPlastic}
                        />
                    </View>
                </View>
            </View>

            <View style={ styles.imageContainer }>
                <View style={{alignItems: 'center'}}>
                    <Text style={{marginBottom: 10, fontSize: 15, fontWeight: 'bold'}}>Add a picture</Text>
                    <CustomButton
                            icon="camera"
                            onPress={takePicture}
                            width="20%"
                    />
                </View>
                {image ? <Image style={ styles.image } source={{uri: image}} /> : null}
            </View>
            <View style={{alignItems: 'center', height: 80}}>
                <CustomButton
                    text="Save"
                    onPress={save}
                    width="50%"
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        justifyContent: 'flex-start',
        marginTop: 30
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