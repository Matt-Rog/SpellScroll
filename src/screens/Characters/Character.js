import {
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    Pressable,
    View,
    Image,
    Modal,    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Utility
import * as THEME from '../../utils/Theme'
import Images from '../../utils/Images';
// Components
import TopMenu from '../../components/TopMenu';
import SlidingTab from '../../components/SlidingTab';
import SpellList from '../../components/SpellList';
import CharacterSettings from './CharacterSettings';

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)]
THEME.getTheme().then(
    theme => {
        COLORS = theme.COLORS
        STYLES = theme.STYLES
    }
)

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

        var newData = {}
        for (const [key, value] of Object.entries(tempChar.spells)) {
          console.log("gerro")
          console.log(value)
          var tempStats = <View style={STYLES.Container}>
            <View style={{marginBottom: 20}}>
              <Text style={STYLES.Header4}>KNOWN</Text>
              {value.known.length == 0 ? <Text style={STYLES.ContentBody}>No spells found</Text> : null}
              <SpellList
                  onResultPress={onResultPress}
                  spellIDs={value.known}
                  navigation={navigation}
                  prevScreen="Character"
                  scrollEnabled={true}>
              </SpellList>
            </View>
            <Text style={STYLES.Header4}>PREPARED</Text>
            {value.prepared.length == 0 ? <Text style={STYLES.ContentBody}>No spells found</Text> : null}
            <SpellList
                onResultPress={onResultPress}
                spellIDs={value.prepared}
                navigation={navigation}
                prevScreen="Character"
                scrollEnabled={true}>
            </SpellList>
            <Pressable
              onPress={() => {
                updateFilter({Classes: [key]})
                navigation.navigate('Spells', {screen: 'Search Spells'})
              }}
              style={[STYLES.PrimaryButton, {justifyContent: 'center', alignSelf: 'center', marginTop: 30}]}>
              <Text style={STYLES.Header4}>Add {key} spells</Text>
            </Pressable>
          </View>

          newData[key] = tempStats
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

    const updateFilter = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('filter', jsonValue)
        console.log()
        setFilter(value)
      } catch (e) {I
        console.log("Error updating filters")
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
      <SafeAreaView style={STYLES.Background}>
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

        <View style={[styles.contentTab, {marginTop: 20, backgroundColor: COLORS.back}]}>
          <View style={{flexDirection: "row", marginBottom: 0, alignItems: "center"}}>
            <Image
              style={styles.icon}
              source={Images.icon[char.icon.toLowerCase()]}
              resizeMode="stretch">
            </Image>
            <View style={{flexDirection: "column", justifyContent: "center"}}>
              <Text adjustsFontSizeToFit={true} style={[STYLES.Header2, {maxWidth: 210, marginTop: 0}]}>{char.name}</Text>
              <FlatList
                data={char.classes}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <View style={[STYLES.Tags, {marginTop: 10, marginRight: 8}]}>
                      <Text style={{color: COLORS.secondary_content}}>{item.toUpperCase()}</Text>
                    </View>
                  )
                }}></FlatList>
                <Text style={[STYLES.ContentBody, {marginTop: char.notes.length > 0 ? 10 : 0}]}>{char.notes}</Text>
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
            <Text style={[STYLES.Header4, {paddingVertical: 10,}]}>{char.classes[0]}</Text>
            <View style={{height: 4, width: "auto",backgroundColor: char.color}}></View>
          </View>
          <View style={STYLES.Container}>
          <View style={{marginBottom: 20}}>
              <Text style={STYLES.Header4}>KNOWN</Text>
              {(Object.values(Object.values(spells)[0])[0]) == 0 ? <Text style={STYLES.ContentBody}>No spells found :(</Text> : null}
              <SpellList
                  onResultPress={onResultPress}
                  spellIDs={Object.values(Object.values(spells)[0])[0]}
                  navigation={navigation}
                  prevScreen="Character"
                  scrollEnabled={true}>
              </SpellList>
            </View>
            <Text style={STYLES.Header4}>PREPARED</Text>
            {(Object.values(Object.values(spells)[0])[1]) == 0 ? <Text style={STYLES.ContentBody}>No spells found :(</Text> : null}
            <SpellList
                onResultPress={onResultPress}
                spellIDs={Object.values(Object.values(spells)[0])[1]}
                navigation={navigation}
                prevScreen="Character"
                scrollEnabled={true}>
            </SpellList>
            <Pressable
              onPress={() => {
                updateFilter({Class: [char.classes[0]]})
                navigation.navigate('Spells', {screen: 'Search Spells'})
              }}
              style={[STYLES.PrimaryButton, {justifyContent: 'center', alignSelf: 'center', marginTop: 30}]}>
              <Text style={STYLES.Header4}>Add {char.classes[0]} spells</Text>
            </Pressable>
          </View>
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
    flexDirection: "column",
  },
  icon: {
    maxHeight: 100,
    maxWidth: 100,
    marginRight: 20
  }
});