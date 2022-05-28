import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    
} from 'react-native';
import React, {useState} from 'react';
import SpellList from '../../utils/SpellList';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MOCKCHAR from "../../../MOCK_CHAR_DATA.json"


export default function CharacterPage({navigation, route}) {

    const {id} = route.params;
    var Char = MOCKCHAR.find(item=>item.ID===id);

    const onBack = () => {
      navigation.goBack();
    }
    const onResultPress = () => {
      navigation.navigate("CharSpell")
    }

    return (
        <SafeAreaView style={styles.base}> 
          <View style={styles.resultBox}>
            <View style={styles.bar}>
              <FontAwesome
                name={"user"}
                size={75}
                color={"#fff"}
                style={styles.icon}></FontAwesome>
              
            </View>
            <Text style={styles.title}>{Char.name}</Text>
            <Text style={styles.spellTXT}>{Char.class}</Text>
            <Text style={styles.schoolTXT}>{Char.description}</Text>
          </View>
          <Text style={styles.schoolTXT}>Known Spells:</Text>
          <SpellList
            onResultPress={onResultPress}>

          </SpellList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#181D23",
    height: '100%',
    width: "100%"
  },
  resultBox: {
    alignSelf: "center",
    margin: 8,
    backgroundColor: "#373C48",
    borderRadius: 12,
    width: "90%",
    paddingBottom: 10,
    marginBottom: 15
  },
  spellTXT: {
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 3,
    marginLeft: 10
  },
  schoolTXT:{
    color: "#CCD2E3",
    fontSize: 14,
    marginTop: 3,
    marginLeft: 10
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 10
  },
  bar: {
    width: "100%",
    "height": 100,
    "backgroundColor": "#4CBBE9",
    "borderTopRightRadius": 12,
    "borderTopLeftRadius": 12,
  },
  icon: {
    alignSelf: "center",
    marginVertical: 10
  }
  });