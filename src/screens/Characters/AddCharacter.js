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
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome from 'react-native-vector-icons/FontAwesome'


import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';

import { ModalList } from '../../utils/Filters/ModalList';

import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
import App from '../../utils/App';

export default function AddCharacterPage({navigation, route}){

    const [Chars, setChars] = useState([])

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
          const stringValue = await AsyncStorage.getItem('characters')
          const jsonValue = JSON.parse(stringValue)
          if (!jsonValue || typeof jsonValue !== 'object') return
          setChars(jsonValue)
          console.log("CHARS FROM GET DATA")
          console.log(jsonValue)
        
        } catch(e) {
          console.log("Error getting character data")
          console.log(e)
        }
      }
  
      const updateData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('characters', jsonValue)
        } catch (e) {I
          console.log("Error updating characters")
          console.log(e)
        }
      }

    const [name, setName] = useState("")
    const [classes, setClasses] = useState([])
    const [icon, setIcon] = useState("hat")
    const [color, setColor] = useState("#FFF")
    const [notes, setNotes] = useState("")

    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
        setIsModalVisible(bool)
    }

    function onXPress(item){
        if(classes.includes(item)){
          var removed = classes.filter(i => i !== item)
          setClasses(removed)
        }
    }

    function applySelection(selection){
        setClasses(selection)
    }

    function onApplyPress(){
        if (classes.length>0 && name.length>0){
            applyFromModal({
                name: name,
                classes: classes,
                notes: notes,
                icon: icon,
                color: color,
                spells: [0,1,2,3]
            })
            navigation.navigate("Character", {charID: Chars.length})
        }
        
    }

    const applyFromModal = async (data) => {
        Object.assign(data, {ID: Chars.length})
  
  
        console.log("NEW CHAR")
        console.log(data)
  
        const newChars = [...Chars,data]
        setChars(newChars)
        updateData(newChars)
  
        if(data.notes==="clear"){
          try {
            await AsyncStorage.setItem('characters', "")
          } catch (error) {
            console.log(error)
          }
        }
    }

    const colorList = ["#ef5c3e","#88b9ed","#E94CE0","#b0f389","#f2a261"]
    function selectColor(selection){
        if(selection == color){
            setColor("#FFF")
        } else {
            setColor(selection)
        }
    }

    const iconList = ["wizard", "orc", "elf1", "faun", "gnome"]
    function selectIcon(selection){
        if(selection == icon){
            setIcon("hat")
        } else {
            setIcon(selection)
        }
    }

    // Check mark to show if required field met
    const fieldCheck = (status) => {
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

    return (
        <SafeAreaView style={AppStyles.Background}>
            <View style={AppStyles.Container}>
                <Text style={AppStyles.Header1}>Add Character</Text>

                {/* Name */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header2]}>Name</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TextInput 
                            style={AppStyles.Input}
                            placeholder="Enter a name"
                            placeholderTextColor="#CCD2E3"
                            onChangeText={(text) => setName(text)}
                        ></TextInput>
                        {fieldCheck(name.length>0)}
                    </View>
                </View>

                {/* Class */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header2]}>Class</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={[AppStyles.Input, {height: "auto", flexDirection: "row"}]}>
                            <FlatList
                                data={classes}
                                
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => {
                                    return (
                                    <View style={[AppStyles.Removable, {borderColor: "#4CBBE9", flexDirection: "row"}]}>
                                        <Pressable
                                            onPress={() => onXPress(item)}>
                                                <FontAwesome
                                                name={"times"}
                                                size={17}
                                                color={"#fff"}
                                                style={{color: "#4CBBE9", marginRight: 7}}
                                                />
                                        </Pressable>
                                        <Text style={{color: "#4CBBE9", fontSize: 15, fontWeight: "bold"}}>{item}</Text>
                                    </View>
                                    )
                                }}>
                            </FlatList>
                            <Pressable
                                onPress={() => changeModalVisibility(true)}>
                                <FontAwesome
                                    name={"plus-circle"}
                                    size={25}
                                    color={"#FFF"}
                                    style={{margin: 5, marginHorizontal: 10}}
                                    />
                            </Pressable>
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
                        {fieldCheck(classes.length>0)}
                    </View>
                </View>

                {/* Notes */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header2]}>Notes</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TextInput 
                            style={AppStyles.Input}
                            placeholder="Optional notes"
                            placeholderTextColor="#CCD2E3"
                            onChangeText={(text) => setNotes(text)}
                        ></TextInput>
                    </View>
                </View>

                {/* Icon */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header2]}>Icon</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <FlatList
                            data={iconList}
                            horizontal={true}
                            renderItem={({item}) => {
                                return (
                                    <Pressable
                                        onPress={() => selectIcon(item)}
                                        style={[styles.icon, {backgroundColor: icon == item ? "#CCD2E3" : "#373C48" }]}
                                    
                                    >
                                        <Image 
                                            style={{width: 75, height: 75, margin: 5}}
                                            source={Images.icon[item.toLowerCase()]}
                                            resizeMode="stretch">
                                        </Image>
                                    </Pressable>
                                )}}>

                        </FlatList>
                    </View>
                </View>

                {/* Color */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header2]}>Color</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <FlatList
                            data={colorList}
                            horizontal={true}
                            renderItem={({item}) => {
                                return (
                                    <Pressable
                                        onPress={() => selectColor(item)}
                                        style={[ styles.color, {borderWidth: color == item ? 3: 0, backgroundColor: item}]}
                                    ></Pressable>
                                )}}>

                        </FlatList>
                    </View>
                </View>

                <View style={{flexDirection: "row-reverse", alignItems: "center"}}>
                    <Pressable
                        onPress={() => onApplyPress()}
                        style={[AppStyles.PrimaryButton, {backgroundColor: (classes.length>0 && name.length>0 ? "#4CBBE9" : "#CCD2E3")}]}    
                    >
                        <Text style={[AppStyles.Header3, {color: (classes.length>0 && name.length>0 ? "#FFF" : "#373C48")}]}>Create</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.changeModalVisibility(false)}
                        style={AppStyles.TertiaryButton}    
                    >
                        <Text style={AppStyles.Header3}>Cancel</Text>
                    </Pressable>
                </View>                                                     
            </View>
        </SafeAreaView>                                                      
    
    )

}

const styles = StyleSheet.create({
    field: {
        marginVertical: 20
    },
    icon: {
        padding: 1, 
        borderRadius: 15, 
        borderColor: "#fff",
        margin: 5
    },
    color: {
        width: 45, 
        height: 45, 
        borderRadius: 50,
        borderColor: "#fff",
        marginRight: 10,
    }
})