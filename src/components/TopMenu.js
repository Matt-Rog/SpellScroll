import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    Dimensions,
    View,
    Image,
    Modal,
    ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TopMenu = (props) => {

    const settings =
    <Pressable 
        style={styles.back}
        onPress={props.onRightPress}>
        <FontAwesome
            name={"cog"}
            size={30}
            color={"#fff"}
            style
            />
    </Pressable>

    return (
        <SafeAreaView style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Pressable 
                style={props.bubble ? styles.back : styles.simple}
                onPress={props.onLeftPress}>
                    <FontAwesome
                    name={"chevron-left"}
                    size={28}
                    color={"#fff"}
                    style
                    />
            </Pressable>
            {props.settings==true ? settings : null}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    back: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: "center",
        borderRadius: 50,
        alignItems: "center",
        margin: 10
    },
    simple: {
        marginTop: 10
    }
})

export default TopMenu