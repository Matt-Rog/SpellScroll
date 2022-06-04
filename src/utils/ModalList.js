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

const ModalList = (props) => {

    const options = props.options



    const onPressItem = (item) => {
        props.addSelection(item)
    }

    const [selected, setSelected] = useState(props.selected)

    function onButtonPress(item){
        if(!selected.includes(item)){
          var joined = selected.concat(item);
          setSelected(joined)
        } else {
          var removed = selected.filter(i => i !== item)
          setSelected(removed)
        }
    }

    function allOnPress(bool){
    }

    function onApplyPress(){
        props.applySelection(selected)
        props.changeModalVisibility(false)
    }
    
    return (
        <Pressable
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT/2}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.name}>{props.name}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Pressable
                            onPress={() => (selected.length===options.length ? setSelected([]) : setSelected(options))}
                            style={[{flexDirection: "row", alignItems: "center"},styles.clearBTN]}    
                        >
                            <FontAwesome
                                name={((selected.length===options.length) ? "minus-square" : "check-square")}
                                size={30}
                                color={((selected.length===options.length) ? "#CCD2E3" : "#4CBBE9")}
                            />
                            <Text style={styles.allTXT}>
                                All Items
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    data={options}
                    showsVerticalScrollIndicator={true}
                    renderItem={({item}) => {
                        return (
                            <Pressable
                                style={styles.option}
                                onPress={() => onButtonPress(item)}
                            >
                                <FontAwesome
                                name={(selected.includes(item) ? "check-square" : "square")}
                                size={25}
                                color={(selected.includes(item) ? "#4CBBE9" : "#CCD2E3")}
                                />
                                <Text style={styles.text}>{item}</Text>
                            </Pressable>
                        )
                    }}>

                </FlatList>
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
        backgroundColor: "#fff",
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
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
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

export {ModalList}