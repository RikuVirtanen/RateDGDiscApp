import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('discs.db');

export default function AddDiscScreen({route, navigation}) {

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists disc ' +
                '(id integer primary key AUTOINCREMENT, ' +
                'name text not null, type text not null, ' +
                'company text not null, plastic text not null, image text);');
        }, null, null);
    }, []);

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

    const save = () => {
        if (validate()) {
            db.transaction(tx => {
                tx.executeSql('insert into disc (name, type, company, plastic, image) values (?, ?, ?, ?, ?);',
                    [name, type, company, plastic, image]);
                }, null, null
            );
            Alert.alert("Success!", "Disc was added, thank you for the contribution")
            navigation.navigate("Home");
        } else {
            Alert.alert("Missing info", "Please fill all the input values");
        }
        
    }

    const signoutPressed = async () => {
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