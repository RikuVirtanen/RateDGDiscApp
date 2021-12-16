import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

const Item = ({ item, onPress, bgColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, bgColor]}>
        {item.image ? <Image style={ styles.image } source={{uri: item.image}} /> : null}
        <View style={ styles.mini }>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
            <Text style={[styles.title, textColor]}>{item.type}</Text>
            <Text style={[styles.title, textColor]}>{item.company}</Text>
            <Text style={[styles.title, textColor]}>{item.plastic}</Text>
        </View>
    </TouchableOpacity>
);

const db = SQLite.openDatabase('discs.db');

export default function List() {

    const isFocused = useIsFocused();

    const [discs, setDiscs] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            // tx.executeSql('DROP TABLE IF EXISTS disc', []);
            tx.executeSql(
                'create table if not exists disc ' +
                '(name text primary key not null, type text not null, ' +
                'company text not null, plastic text not null, image text);');
        }, null, updateList);
    }, [isFocused]);

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from disc;', [], (_, { rows }) => 
                setDiscs(rows._array)
            );
        });
    }

    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.name === selectedId ? '#6e3b6e' :
        '#f9c2ff';
        const color = item.name === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.name)}
                backgroundColor = {{ backgroundColor }}
                textColor = {{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={ styles.container }>
            <FlatList
                data={discs}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                extraData={selectedId}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        padding: 20,
        width: '100%',
        borderWidth: 2,
        backgroundColor: 'grey',
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 20,
    },
    mini: {
        width: '100%',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginLeft: 80
    },
})