import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    ScrollView
    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SpellList from '../../utils/SpellList';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MOCKCHAR from "../../../MOCK_CHAR_DATA.json"
import AppStyles from '../../utils/AppStyles';


export default function CharacterPage({navigation, route}) {

    const [char, setChar] = useState({
      ID: 0,
      classes: []
    })
    const[spellIDs, setSpellIDs] = useState([])
    const {charID} = route.params;

    useEffect(() => {
      getData();
      
      // for (const spellID of char.spells){
      //   spellIDs.push(spellID);
      // }

    }, []);

    const getData = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('characters')
        const jsonValue = JSON.parse(stringValue)
        if (!jsonValue) return

        const tempChar = jsonValue.find(char => char.ID === charID);
        console.log("TEMPCAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(tempChar)
        setChar(tempChar)
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

    const onBack = () => {
      navigation.goBack();
    }
    const onResultPress = () => {
      navigation.navigate("CharSpell")
    }

    return (
      <SafeAreaView style={AppStyles.Background}>
        <View style={[styles.colorTab, {backgroundColor: char.color}]}>

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
    height: 190
  }
});