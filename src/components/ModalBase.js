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
    ScrollView,
    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// Utility
import AppStyles from '../utils/AppStyles'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalBase = (props) => {

    function onXPress(){
        props.changeModalVisibility(false)
    }

    const header = 
    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={AppStyles.Header2}>{props.title}</Text>
        {props.showX == undefined || props.showX == true ? 
            <Pressable
            onPress={() => onXPress()}>
                <FontAwesome
                    name={"times-circle"}
                    size={30}
                    color={"#CCD2E3"}
                    />
            </Pressable> 
            : null  
        }

    </View>

    return (
        <View style={{height: "100%", width: "100%", backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "center"}}>
            <View style={[AppStyles.Modal, {width: "80%", alignSelf: "center"}]}>
                {props.header? header : null}
                {props.component}
            </View>
        </View>
    )
}

export {ModalBase}