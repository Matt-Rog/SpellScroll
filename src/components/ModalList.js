import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList,
    TextInput
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// Utility
import AppStyles from '../utils/AppStyles';
import { COLORS } from '../utils/Colors';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalList = (props) => {

    const options = props.options
    const [selected, setSelected] = useState(props.selected)

    function onOptionPress(item){
        if(!selected.includes(item) && !props.selected.includes(item)){
          var joined = selected.concat(item);
          setSelected(joined)
        } else {
          var removed = selected.filter(i => i !== item)
          setSelected(removed)
        }
    }

    function onApplyPress(){
        props.applySelection(selected)
        props.changeModalVisibility(false)
    }
    
    return (
        <Pressable
            style={styles.container}
        >
            <View style={[AppStyles.Modal, {width: WIDTH - 20, height: HEIGHT/1.7}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 5}}>
                    <Text style={AppStyles.Header2}>{props.name}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Pressable
                            onPress={() => (selected.length>0 ? setSelected([]) : setSelected(options))}
                            style={[{flexDirection: "row", alignItems: "center"},styles.clearBTN]}    
                        >
                            <FontAwesome
                                name={((selected.length>0) ? "minus-square" : "check-square")}
                                size={30}
                                color={((selected.length>0) ? "#CCD2E3" : "#4CBBE9")}
                            />
                            <Text style={[AppStyles.Header3, {marginLeft: 10}]}>
                                All Items
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    style={{borderRadius: 15}}
                    data={options}
                    showsVerticalScrollIndicator={true}
                    renderItem={({item}) => {
                        return (
                            <Pressable
                                style={[styles.option, {backgroundColor: selected.includes(item) ? COLORS.back_light : COLORS.back}]}
                                onPress={() => onOptionPress(item)}
                            >
                                <FontAwesome
                                name={(selected.includes(item) ? "check-square" : "square")}
                                size={20}
                                color={(selected.includes(item) ? "#4CBBE9" : "#CCD2E3")}
                                />
                                <Text style={[AppStyles.Header3, {color: selected.includes(item) ? "#FFF" :"#CCD2E3"}, {marginLeft: 16}]}>{item}</Text>
                            </Pressable>
                        )
                    }}>

                </FlatList>
                <View style={{flexDirection: "row-reverse", justifyContent: "center", marginTop: 15}}>
                    <Pressable
                        onPress={() => onApplyPress()}
                        style={AppStyles.PrimaryButton}    
                    >
                        <Text style={styles.applyTXT}>Apply</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.changeModalVisibility(false)}
                        style={AppStyles.TertiaryButton}    
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
        borderRadius: 15,
        padding: 20
    },
    option:{
        width:"100%",
        flexDirection: "row",
        padding: 10,
        borderRadius: 0,
        alignItems: "center"
    },
    name: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    },
    optionTXT: {
        marginLeft: 15
    },
    allTXT: {
        fontSize: 15,
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
    
})

export {ModalList}