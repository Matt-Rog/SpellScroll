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
    ScrollView,
    Dimensions,
    Animated,
    TouchableNativeFeedbackBase,
    ViewComponent
    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SpellList from '../../utils/SpellList';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';

import TopMenu from '../../utils/TopMenu';
import { ModalBase } from '../../utils/ModalBase';
import Splash from '../../utils/Splash';
import CharacterSettings from './CharacterSettings';
import SlidingTab from '../../utils/SlidingTab';

const {width, height} = Dimensions.get('screen')


export default function CharacterPage({navigation, route}) {

    const [char, setChar] = useState({
      ID: 0,
      classes: [],
      icon: "hat",
      notes: "",
      spells: [0]
    })
    const [Chars, setChars] = useState([])
    const[spells, setSpells] = useState([0])
    const[data, setData] = useState([])
    const {charID} = route.params;
    const [firstClass, setFirstClass] = useState(char.classes[0])


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
        setSpells(tempChar.spells)

        var localComponent = <Text style={AppStyles.Header1}>HI</Text>

        var newData = {}
        for (const [key, value] of Object.entries(tempChar.spells)) {
          console.log("gerro")
          console.log(value)
          newData[key] = 
            <SpellList
              onResultPress={onResultPress}
              spellIDs={value}
              navigation={navigation}
              prevScreen="Character"
              scrollEnabled={true}>
            </SpellList>
        };
        setData(newData)

      
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
      changeSettingsModalVisibility(true)
    }

    function onEditCharacter(){
      changeModalVisibility(false)
      navigation.navigate("Add Character", {edit: true, charID: charID})
    }


    function deleteCharacter(charID){
      var index = Chars.indexOf(Chars.find(char => char.ID === charID))
      Chars.splice(index, 1)
      updateData(Chars)
    }
    const onResultPress = () => {
      navigation.navigate("CharSpell")
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }
    const changeSettingsModalVisibility = (bool) => {
      setIsSettingsModalVisible(bool)
    }


   

    return (
      <SafeAreaView style={AppStyles.Background}>
        <View style={[styles.colorTab, {backgroundColor: char.color}]}></View>
        <TopMenu
          bubble={true}
          settings={true}
          onLeftPress={() => onBackPress()}
          onRightPress={() => onSettingsPress()}
          ></TopMenu>

        {/* Character Settings Modal */}
        <Modal
            transparent={true}
            animationType='fade'
            visible={isSettingsModalVisible}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            nRequestClose={() => changeSettingsModalVisibility(false)}>

              <CharacterSettings
                navigation={navigation}
                charID={charID}
                changeModalVisibility={changeSettingsModalVisibility}
                deleteCharacter={(charID) => deleteCharacter(charID)}
              ></CharacterSettings>
          </Modal>

        <View style={[styles.contentTab, {marginTop: 20}]}>
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
        {Object.keys(data).length > 1 ? 
        <SlidingTab
        data={data}
        color={char.color}></SlidingTab> 
        : 
        <View>
          <View style={{alignSelf: "center"}}>
            <Text style={[AppStyles.Header4, {paddingVertical: 10,}]}>{char.classes[0]}</Text>
            <View style={{height: 4, width: "auto",backgroundColor: char.color}}></View>
          </View>
          <SpellList
              onResultPress={onResultPress}
              spellIDs={Object.values(spells)[0]}
              navigation={navigation}
              prevScreen="Character"
              scrollEnabled={true}>
          </SpellList>
        </View>}
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