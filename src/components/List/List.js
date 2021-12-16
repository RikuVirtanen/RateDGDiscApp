import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';

const Item = ({ item, onPress, bgColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, bgColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
);

export default function List(props) {

    const { items } = props;

    const [selectedName, setSelectedName] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.name === selectedName ? '#6e3b6e' :
        '#f9c2ff';
        const color = item.name === selectedName ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedName(item.name)}
                backgroundColor = {{ backgroundColor }}
                textColor = {{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={ styles.container }>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                extraData={selectedName}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})