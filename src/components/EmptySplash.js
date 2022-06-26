import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const EmptySplash = (props) => {

    const hide = props.hide

    if(hide){
        return null
    }
    return (
        <View style={styles.splash}>
            <Image
                style={styles.splashIMG}
                source={require('../../assets/no-result-splash2.png')}
                resizeMode="contain">
            </Image>
            <Text style={styles.oopsTXT}>No results found</Text>
            <Text style={styles.tryTXT}>Try expanding your search :)</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    splash: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: HEIGHT/20
    },
    oopsTXT: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#CCD2E3"
    },
    tryTXT: {
        fontSize: 15,
      color: "#CCD2E3",
      marginTop: 10
    },
    splashIMG: {
        height: 250,
        margin: 15
    }
})

export default EmptySplash