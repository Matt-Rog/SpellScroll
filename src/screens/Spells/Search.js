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
    Modal
    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SpellList from '../../utils/SpellList';
import EmptySplash from '../../utils/EmptySplash';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
import PROPERTIES from "../../../PROPERTIES.json"
import { useIsFocused,useFocusEffect  } from '@react-navigation/native';


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function SearchPage({navigation, route}) {

    const onResultPress = () => {
      navigation.navigate("Spell")
    }

    const onFilterPress = () => {
      console.log(filter.Components)
      navigation.navigate("Filter Spells", {FILTER: filter})
    }



    const [allSpells, setAllSpells] = useState(MOCKDATA)
    const [filterSpells, setFilterSpells] = useState(MOCKDATA)
    const [filter, setFilter] = useState(PROPERTIES)
    const [resultSpells, setResultSpells] = useState(MOCKDATA)
    const [search, setSearch] = useState("")
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
      // write your code here, it's like componentWillMount
      console.log("Search loaded")
      if(route.params?.INITDATA){
        console.log("PASSED")
        if(route.params.INITDATA.length>0){
          setResultSpells(route.params.INITDATA)
          setFilterSpells(route.params.INITDATA)
        } else {
          if(route.params?.RESET && route.params.RESET==true){
            setResultSpells(allSpells)
            setFilterSpells(allSpells)
          } else {
            setResultSpells(route.params.INITDATA)
            setFilterSpells(route.params.INITDATA)
            setIsHidden(false)
          }
        }
      }

      if(route.params?.FILTER){
        console.log("FILTER")
        if(route.params.FILTER.length>0){
          setFilter(route.params.FILTER)
        } else {
          if(route.params?.RESET && route.params.RESET==true){
            setFilter(PROPERTIES)
            console.log("RESET2")
          } else {
            setFilter(route.params.FILTER)
          }
        }
      }
    }, [route.params?.INITDATA, route.params?.FILTER, route.params?.RESET])


    const getSpellIDs = (spellList) => {
      var spellIDs = []
      for(const spell of spellList){
        spellIDs.push(spell.ID);
      }
      
      return spellIDs;
    }

    const searchSpells = (text) => {
      if (text) {
        const newData = filterSpells.filter(function(item) {
          return (item.name.toUpperCase().startsWith(text.toUpperCase()))
        })
        if(newData.length==0){
          setIsHidden(false)
        } else {
          setIsHidden(true)
        }
        setResultSpells(newData)
        setSearch(text)
      } else {
        setResultSpells(filterSpells)
        setSearch(text);
        setIsHidden(true)
      }
    }

    function onBarIconPress(){
      if(search != ""){
        searchSpells("")
      }
    }

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Search Spells</Text>
          <View style={styles.searchBox}>
            <View style={styles.searchBar}>
              <TextInput 
                style={styles.input}
                placeholder="Search"
                value={search}
                selectionColor="#Fff"
                placeholderTextColor="#fff"
                onChangeText={(text)=> searchSpells(text)}
              >
              </TextInput>
              <Pressable
                onPress={() => onBarIconPress()}
                style={styles.searchIcon}>
                  <FontAwesome
                  name={((search==="") ? "search" : "times")}
                  size={20}
                  color={"#CCD2E3"}
                  />
              </Pressable>
            </View>
            <Pressable
            onPress={onFilterPress}
            style={styles.filterIcon}>
              <FontAwesome
              name={"sliders"}
              size={35}
              color={"#fff"}
              />
            </Pressable>
          </View>
          <View style={styles.searchBox}>
              <Text style={styles.spellTXT}>{resultSpells.length!=0 ? resultSpells.length + " results" : ""}</Text>
            </View>
          <EmptySplash
            hide={isHidden}>
          </EmptySplash>
          <SpellList
            onResultPress={onResultPress}
            spellIDs = {getSpellIDs(resultSpells)}
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
      justifyContent: 'space-between',
      alignItems: "center",
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "bold"
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
    },
    input:{
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      color: "#fff",
      borderRadius: 12,
      fontSize: 15,
      paddingLeft: 17,
      width: "80%",
      height: 40
    },
    searchBar:{
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      borderRadius: 12,
      fontSize: 15,
      width: "85%",
      height: 40,
      justifyContent: "space-between"
    },
    searchIcon: {
      marginRight: 15
    }
  });
