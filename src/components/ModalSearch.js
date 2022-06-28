import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalSearch = (props) => {



    function onApplyPress(){
        props.onApplyPress()
        props.changeModalVisibility(false)
    }
    
    return (
        <Pressable
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH-50, height: "auto"}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    {/* <Text style={styles.name}>{props.childComponent.name}</Text> */}
                </View>
                {props.childComponent.component}
                <View style={{flexDirection: "row-reverse", alignItems: "center"}}>
                    <Pressable
                        onPress={() => onApplyPress()}
                        style={styles.applyBTN}    
                    >
                        <Text style={styles.applyTXT}>Apply</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.changeModalVisibility(false)}
                        style={styles.cancelBTN}    
                    >
                        <Text style={styles.cancelTXT}>Cancel</Text>
                    </Pressable>
                </View>
            </View>       
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal: {
        backgroundColor: "#373C48",
        borderRadius: 12,
        padding: 10
    },
    option:{
        width:"100%",
        flexDirection: "row",
        margin: 5,
        padding: 8,
        alignItems: "center"
    },
    name: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        marginLeft: 20
    },
    allTXT: {
        fontSize: 15,
        marginLeft: 5,
        fontWeight: "bold",
        textAlign: "center"
    },
    clearTXT: {
        color: "#CCD2E3",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    applyBTN: {
        borderRadius: 12,
        backgroundColor: "#4CBBE9",
        padding: 8,
        marginTop: 10,
        width: "50%",
        justifyContent: "center",
    },
    cancelBTN: {
        borderRadius: 12,
        borderColor: "#CCD2E3",
        padding: 8,
        marginTop: 10,
        width: "50%",
        justifyContent: "center",
    },
    applyTXT: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    cancelTXT: {
        color: "#CCD2E3",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        color: "#000",
        fontSize: 20,
        marginLeft: 13,
        marginRight: 13,
    },
})

export default ModalSearch