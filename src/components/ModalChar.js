import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList,
    TextInput,
    Modal,
    ScrollView
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// Components
import { ModalList } from './ModalList';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalChar = (props) => {

    
    const [selected, setSelected] = useState(props.selected)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
        setIsModalVisible(bool)
    }

    const [name, setName] = useState("")
    const [classes, setClasses] = useState([])
    const [notes, setNotes] = useState("")

    function onOptionPress(item){
        if(!selected.includes(item) && !props.selected.includes(item)){
          var joined = selected.concat(item);
          setSelected(joined)
        } else {
          var removed = selected.filter(i => i !== item)
          setSelected(removed)
        }
    }

    function applySelection(selection){
        setClasses(selection)
    }

    function onApplyPress(){
        if (classes.length>0 && name.length>0){
            props.applyFromModal({
                name: name,
                notes: notes,
                classes: classes,
                spells: [0,1,2,3]
            })
            props.changeModalVisibility(false)
        }
        
    }
  

    const validStatus = (status) => {
        return (
            <View>
                <FontAwesome
                name={(status ? "check" : "check")}
                size={20}
                color={(status ? "#79e46b" : "#CCD2E3")}
                style={styles.icon}></FontAwesome>
            </View>
        )
    }

    function onXPress(item){
        if(classes.includes(item)){
          var removed = classes.filter(i => i !== item)
          setClasses(removed)
        }
    }

    
    return (
        <Pressable
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 20, height: "auto"}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.name}>{props.name}</Text>
                </View>
                <View>
                    <View>
                        <Text style={styles.promptTXT}>Name</Text>
                        <View style={{flexDirection: "row", alignItems: "center", margin: 5, marginLeft: 0}}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter a name for your character"
                            selectionColor="#373C48"
                            placeholderTextColor="#373C48"
                            onChangeText={(text) => setName(text)}
                        >
                        </TextInput>
                        {validStatus(name.length>0)}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.promptTXT}>Class</Text>
                        <View style={{alignItems: "center", flexDirection: "row"}}>
                            <View style={[styles.input, {flexDirection: "row", alignItems: "center", margin: 5, marginLeft: 6}]}>
                                <Pressable
                                    onPress={() => changeModalVisibility(true)}>
                                    <FontAwesome
                                        name={"plus-circle"}
                                        size={25}
                                        color={"#373C48"}
                                        style={{margin: 5, marginRight: 10}}
                                        />
                                </Pressable>
                                <ScrollView
                                    horizontal={true}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingVertical: 0 }}>
                                    
                                    <FlatList
                                    scrollEnabled={false}
                                    data={classes}
                                    numColumns={3}
                                    renderItem={({item}) => {
                                        return (
                                        <View style={[{borderColor: (classes.includes(item))? '#4CBBE9' : '#CCD2E3'}, styles.button]}>
                                            <Pressable
                                            onPress={() => onXPress(item)}>
                                            <FontAwesome
                                            name={"times-circle"}
                                            size={22}
                                            color={"#373C48"}
                                            style={styles.xicon}
                                            />
                                            </Pressable>
                                            <Text style={[{color: (classes.includes(item))? '#373C48' : '#CCD2E3'}, styles.option]}>{item}</Text>
                                        </View>
                                        )
                                    }}>
                                    </FlatList>
                                </ScrollView>
                                <Modal
                                    transparent={true}
                                    animationType='fade'
                                    visible={isModalVisible}
                                    style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                                    nRequestClose={() => changeModalVisibility(false)}>
                                    <ModalList
                                        name={"Select Class"}
                                        changeModalVisibility={changeModalVisibility}
                                        options={["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"]}
                                        selected={classes}
                                        applySelection={(selected) => applySelection(selected)}
                                    >
                                    </ModalList>
                                </Modal>
                            </View>
                            {validStatus(classes.length>0)}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.promptTXT}>Notes</Text>
                        <View style={{flexDirection: "row", alignItems: "center", margin: 5, marginLeft: 0}}>
                        <TextInput 
                            style={[styles.input, {height: 60}]}
                            placeholder="Add character notes (optional)"
                            selectionColor="#373C48"
                            placeholderTextColor="#373C48"
                            onChangeText={(text) => setNotes(text)}
                        >
                        </TextInput>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: "row-reverse", alignItems: "center"}}>
                    <Pressable
                        onPress={() => onApplyPress()}
                        style={[styles.applyBTN, {backgroundColor: (classes.length>0 && name.length>0 ? "#4CBBE9" : "#CCD2E3")}]}    
                    >
                        <Text style={[styles.applyTXT]}>Apply</Text>
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
    promptTXT: {
        margin: 5,
        fontWeight: "bold",
        color: "#373C48"

    },
    input:{
      backgroundColor: "#CCD2E3",
      borderColor: "#CCD2E3",
      color: "#373C48",
      borderRadius: 8,
      fontSize: 15,
      paddingLeft: 15,
      marginLeft: 8,
      marginRight: 15,
      width: "80%",
      height: 40
    },
      option: {
        fontSize: 15,
        marginLeft: 6,
        marginRight: 13,
      },
      button: {
        marginHorizontal: 5,
        borderRadius: 50,
        backgroundColor: "#4CBBE9",
        borderWidth: "1",
        flexDirection: "row",
        padding: 3,
        alignItems: "center"
      },
      xicon: {
        marginLeft: 9
      }
})

export default ModalChar