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
      <View style={styles.background}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 50, right: 20, zIndex: 2}}>
              <Pressable
                  onPress={() => addCharacter()}
                  style={styles.applyBTN}    
              >
                  <FontAwesome
                    name={"ellipsis-h"}
                    size={35}
                    color={"#fff"}
                    style={styles.plus}></FontAwesome>
              </Pressable>
          </View>
        <SafeAreaView style={styles.backgroundCard}>
          <View style={styles.charInfo}>
            <View style={styles.charCard}>
              <View style={styles.charCardInfo}>
                <View style={styles.iconCircle}>
                    {/* <FontAwesome
                      name={"user-circle"}
                      size={75}
                      color={"#fff"}
                      style={styles.icon}></FontAwesome> */}
                  </View>
                  <Text adjustsFontSizeToFit={true} numberOfLines={3} style={styles.title}>{char.name}</Text>
                  <Text style={styles.spellTXT}>{char.classes.join(", ")}</Text>
                  <Text style={styles.schoolTXT}>{char.notes}</Text>
              </View>
            </View>
            <ScrollView 
              scrollEnabled={true}
              style={{zIndex: 4, height: "100%", marginHorizontal: 0, marginVertical: 20}}>
              <Text style={styles.spellTXT}>Known Spells</Text>
              <SpellList
                onResultPress={onResultPress}
                spellIDs={spellIDs}
                navigation={navigation}
                prevScreen="Character"
                scrollEnabled={true}>

              </SpellList>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
}

const styles = StyleSheet.create({
  backgroundCard: {
    backgroundColor: "#181D23",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: '80%',
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  background: {
    backgroundColor: "#4CBBE9",
    height: "100%",
    width: "100%",
  },
  charCard: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#373C48",
    borderRadius: 15,
    padding: 20,
    maxWidth: "80%",
    minWidth: "50%"

  },
  charCardInfo: {
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center"
  },
  charInfo: {
    flexDirection: "column",
    top: -70,
  },
  spellTXT: {
    color: "#FFFFFF",
    fontSize: 20,
    alignSelf: "center"
  },
  schoolTXT:{
    color: "#CCD2E3",
    marginVertical: 8
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 5
  },
  icon: {
    alignSelf: "center",
  },
  iconCircle: {
    backgroundColor: "#4CBBE9",
    borderRadius: 100,
    // borderWidth: 10,
    // borderColor: "#373C48",
    // zIndex: 1,
  }
  });