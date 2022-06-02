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
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SpellList from '../../utils/SpellList';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"


export default function SearchPage({navigation, route}) {

    const onResultPress = () => {
      navigation.navigate("Spell")
    }

    const onFilterPress = () => {
      navigation.navigate("Filter Spells")
    }


    // sample data entry - will need to be replaced by filtered spell ids



    const [allSpells, setAllSpells] = useState(MOCKDATA)
    const [filterSpells, setFilterSpells] = useState(MOCKDATA)
    const [search, setSearch] = useState()

    function getSpellIDs(spellList) {
      var spellIDs = []
      for(const spell of spellList){
        spellIDs.push(spell.ID);
      }
      return spellIDs;
    }

    const searchSpells = (text) => {
      if (text) {
        const newData = allSpells.filter(function(item) {
          return (item.name.toUpperCase().startsWith(text.toUpperCase()))
        })
        setFilterSpells(newData)
        setSearch(text)
      } else {
        setFilterSpells(allSpells)
        setSearch(text);
      }
    }

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Search Spells</Text>
          <View style={styles.searchBox}>
            <TextInput 
            style={styles.input}
            placeholder="Search"
            selectionColor="#Fff"
            placeholderTextColor="#fff"
            onChangeText={(text)=> searchSpells(text)}
            >
            </TextInput>
            <Pressable
            onPress={onFilterPress}
            style={styles.filterIcon}>
              <FontAwesome
              name={"filter"}
              size={35}
              color={"#fff"}
              />
          </Pressable>
          </View>
            <SpellList
              onResultPress={onResultPress}
              spellIDs = {getSpellIDs(filterSpells)}
              navigation={navigation}
              prevScreen="Search Spells">
              
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
    title: {
      color: "#FFFFFF",
      fontSize: 30,
      padding: 10,
      fontWeight: "bold"
    },
    resultContainer: {
    },
    searchBox: {
      marginBottom: 8,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15,
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
    },
    input:{
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      borderRadius: 12,
      fontSize: 15,
      paddingLeft: 17,
      width: "80%",
      height: 40
    },
    filterIcon: {
      alignSelf: "flex-end",
    }
  });
