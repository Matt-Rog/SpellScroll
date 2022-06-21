import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    Modal,
    ScrollView
    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SpellList from '../../utils/SpellList';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MOCKCHAR from "../../../MOCK_CHAR_DATA.json"

import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';

import TopMenu from '../../utils/TopMenu';
import { ModalBase } from '../../utils/ModalBase';
import Splash from '../../utils/Splash';



export default function CharacterPage({navigation, route}) {

    const [char, setChar] = useState({
      ID: 0,
      classes: [],
      icon: "hat",
      notes: ""
    })
    const [Chars, setChars] = useState([])
    const[spellIDs, setSpellIDs] = useState([])
    const {charID} = route.params;

    useEffect(() => {
      const loadData = navigation.addListener('focus', () => {
        getData()
      })
      return loadData;
    }, [navigation]);

    const getData = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('characters')
        const jsonValue = JSON.parse(stringValue)
        if (!jsonValue) return

        const tempChar = jsonValue.find(char => char.ID === charID);
        console.log("TEMPCAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(tempChar)
        setChar(tempChar)
        setChars(jsonValue)
        setSpellIDs(tempChar.spells)
      
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

    const onBackPress = () => {
      navigation.navigate("Your Characters");
    }

    const onSettingsPress = () => {
      changeModalVisibility(true)
    }


    const onResultPress = () => {
      navigation.navigate("CharSpell")
    }

    function onEditCharacter(){
      changeModalVisibility(false)
      navigation.navigate("Add Character", {edit: true, charID: charID})
    }

    function onDeleteCharacter(){
      changeModalVisibility(false)
      changeDeleteModalVisibility(true)
    }

    function deleteCharacter(){
      Chars.splice(charID, 1)
      updateData(Chars)
      navigation.navigate("Your Characters")
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [addCharData, setAddCharData] = useState()

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }
    const changeDeleteModalVisibility = (bool) => {
      setIsDeleteModalVisible(bool)
    }
    

    return (
      <SafeAreaView style={AppStyles.Background}>
        <View style={[styles.colorTab, {backgroundColor: char.color}]}></View>
        <TopMenu
          onLeftPress={() => onBackPress()}
          onRightPress={() => onSettingsPress()}
          bubble={true}
          settings={true}
          >
          
        </TopMenu>

        {/* Settings */}
        <Modal
            transparent={true}
            animationType='fade'
            visible={isModalVisible}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            nRequestClose={() => changeModalVisibility(false)}>
                <ModalBase
                  changeModalVisibility={changeModalVisibility}
                  header={true}
                  title={"Settings"}
                  component={
                    <View style={{marginVertical: 10}}>
                      <Pressable
                        onPress={() => onEditCharacter()}
                        style={[AppStyles.PrimaryButton, {backgroundColor: "#545A67",flexDirection: "row"}]}>
                        <FontAwesome
                            name={"pencil"}
                            size={25}
                            color={"#fff"}
                            />
                        <Text style={[{marginLeft: 15},AppStyles.Header3]}>Edit Character</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => onDeleteCharacter()}
                        style={[AppStyles.SecondaryButton, {borderColor: "#E94C4C",flexDirection: "row", marginTop: 15}]}>
                        <FontAwesome
                            name={"trash"}
                            size={25}
                            color={"#fff"}
                            />
                        <Text style={[{marginLeft: 15},AppStyles.Header3]}>Delete Character</Text>
                      </Pressable>
                    </View>
                  }
                >
            </ModalBase>
        </Modal>

        {/* Delete */}
        <Modal
            transparent={true}
            animationType='fade'
            visible={isDeleteModalVisible}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            nRequestClose={() => changeDeleteModalVisibility(false)}>
                <ModalBase
                  changeModalVisibility={changeDeleteModalVisibility}
                  header={false}
                  title={"Settings"}
                  component={
                    <View>
                      <Splash
                        hide={false}
                        image={"red"}
                        title={"Are you sure?"}
                        body={"Your character will be permanently deleted"}
                        component={
                          <View style={{flexDirection: "row", marginTop: 20}}>
                            <Pressable 
                              onPress={() => changeDeleteModalVisibility(false)}
                              style={AppStyles.TertiaryButton}>
                              <Text style={AppStyles.Header4}>Cancel</Text>
                            </Pressable>
                            <Pressable
                              onPress={() => deleteCharacter()}
                              style={[AppStyles.SecondaryButton, {borderColor: "#E94C4C"}]}>
                              <Text style={AppStyles.Header4}>Delete</Text>
                            </Pressable>
                          </View>
                        }></Splash>
                    </View>
                  }
                >
            </ModalBase>
        </Modal>



        <View style={[styles.contentTab]}>
          <View style={{flexDirection: "row", marginBottom: 0, alignItems: "center"}}>
            <Image
              style={styles.icon}
              source={Images.icon[char.icon.toLowerCase()]}
              resizeMode="stretch">
            </Image>
            <View style={{flexDirection: "column", justifyContent: "center"}}>
              <Text adjustsFontSizeToFit={true} style={[AppStyles.Header2, {maxWidth: 210, marginTop: 0}]}>{char.name}</Text>
              <FlatList
                data={char.classes}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <View style={[AppStyles.Tags, {marginTop: 10, marginRight: 8}]}>
                      <Text style={{color: "#CCD2E3"}}>{item.toUpperCase()}</Text>
                    </View>
                  )
                }}></FlatList>
                <Text style={[AppStyles.ContentBody, {marginTop: char.notes.length > 0 ? 10 : 0}]}>{char.notes}</Text>
            </View>
          </View>
          
        </View>
        {/*<SpellList
            onResultPress={onResultPress}
            spellIDs={spellIDs}
            navigation={navigation}
            prevScreen="Character"
            scrollEnabled={true}>

        </SpellList>*/}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  colorTab: {
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    width: "100%",
    height: 225,
    position: "absolute",
    top: 0
  },
  contentTab: {
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    width: "90%",
    padding: 20,
    height: "auto",
    backgroundColor: "#373C48",
    flexDirection: "column",
  },
  icon: {
    maxHeight: 100,
    maxWidth: 100,
    marginRight: 20
  }
});