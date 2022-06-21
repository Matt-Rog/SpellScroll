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
import { ModalBase } from '../../utils/ModalBase';
import Splash from '../../utils/Splash';
import TopMenu from '../../utils/TopMenu';

import MOCKDATA from "../../../MOCK_SPELL_DATA.json"

export default function AddCharacterPage({navigation, route}){

    const [Chars, setChars] = useState([])
    const [thisChar, setThisChar] = useState([])

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
          if(route.params.edit){
            var char = jsonValue[route.params.charID]
            setTitle("Edit Character")
            setThisChar(char)
            setName(char.name)
            setClasses(char.classes)
            setNotes(char.notes)
            setIcon(char.icon)
            setColor(char.color)
        }
        
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

    const [title, setTitle] = useState("Add Character")

    const [name, setName] = useState("")
    const [classes, setClasses] = useState([])
    const [icon, setIcon] = useState("hat")
    const [color, setColor] = useState("#FFF")
    const [notes, setNotes] = useState("")
    const [ID, setID] = useState(0)

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    

    function onBackPress(){
        navigation.navigate("Your Characters")
    }

    const changeModalVisibility = (bool) => {
        setIsModalVisible(bool)
    }

    const changeAddModalVisibility = (bool) => {
        setIsAddModalVisible(bool)
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
        }
        
    }

    const applyFromModal = async (data) => {
        
        if(!route.params.edit){
            Object.assign(data, {ID: Chars.length})
            setID(Chars.length)
            var localID = Chars.length
            const newChars = [...Chars,data]
            setChars(newChars)
            updateData(newChars)
        } else {
            Object.assign(data, {ID: route.params.charID})
            setID(route.params.charID)
            var localID = route.params.charID
            const newChars = Chars
            newChars[route.params.charID] = data
            setChars(newChars)
            updateData(newChars)
        }
        setIsAddModalVisible(true)
        navigation.navigate("Character", {charID: localID})

        
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
                <TopMenu
                    bubble={false}
                    onLeftPress={()=>onBackPress()}></TopMenu>
                <Text style={AppStyles.Header2}>{title}</Text>

                {/* Name */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header3]}>Name</Text>
                    <View style={styles.input}>
                        <TextInput 
                            style={AppStyles.Input}
                            placeholder="Enter a name"
                            value={name}
                            placeholderTextColor="#CCD2E3"
                            onChangeText={(text) => setName(text)}
                        ></TextInput>
                        {fieldCheck(name.length>0)}
                    </View>
                </View>

                {/* Class */}
                <View style={styles.field}>
                    <Text style={[AppStyles.Header3]}>Class</Text>
                    <View style={styles.input}>
                        <View style={[AppStyles.Input, {height: "auto", flexDirection: "row"}]}>
                            <FlatList
                                data={classes}
                                horizontal={true}
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
                    <Text style={[AppStyles.Header3]}>Notes</Text>
                    <View style={styles.input}>
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
                    <Text style={[AppStyles.Header3]}>Icon</Text>
                    <View style={styles.input}>
                        <FlatList
                            data={iconList}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
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
                    <Text style={[AppStyles.Header3]}>Color</Text>
                    <View style={styles.input}>
                        <FlatList
                            data={colorList}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
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
                        <Text style={[AppStyles.Header4, {color: (classes.length>0 && name.length>0 ? "#FFF" : "#373C48")}]}>{route.params.edit ? "Save" : "Create"}</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate("Your Characters")}
                        style={AppStyles.TertiaryButton}    
                    >
                        <Text style={AppStyles.Header4}>Cancel</Text>
                    </Pressable>
                </View>                                                     
            </View>
            {/* Confirmation */}
            <Modal
                transparent={true}
                animationType='fade'
                visible={isAddModalVisible}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                nRequestClose={() => changeAddModalVisibility(false)}>
                    <ModalBase
                    changeModalVisibility={changeAddModalVisibility}
                    header={false}
                    component={
                        <View>
                        <Splash
                            hide={false}
                            image={"blue"}
                            title={"Huzzah!"}
                            body={"Your character has been successfully " + (route.params.edit? "saved." : "created.")}
                            component={
                                <Pressable
                                onPress={() => {
                                    setIsAddModalVisible(false)
                                }}
                                style={[AppStyles.PrimaryButton, {marginTop: 20}]}>
                                    <Text style={AppStyles.Header4}>Continue</Text>
                                </Pressable>
                            }></Splash>
                        </View>
                    }
                    >
                </ModalBase>
            </Modal>
        </SafeAreaView>                                                      
    
    )

}

const styles = StyleSheet.create({
    field: {
        marginVertical: 15
    },
    input: {
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 10
    },
    icon: {
        padding: 1, 
        borderRadius: 15, 
        borderColor: "#fff",
        margin: 5
    },
    color: {
        width: 40, 
        height: 40, 
        borderRadius: 50,
        borderColor: "#fff",
        marginRight: 10,
    }
})