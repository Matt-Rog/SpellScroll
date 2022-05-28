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


    const [Results, setResults] = useState([
      {key: '1', spellName: 'Lorem Ipsum1', level: '1', school: 'School1'},
      {key: '2', spellName: 'Lorem Ipsum2', level: '2', school: 'School2'},
      {key: '3', spellName: 'Lorem Ipsum3', level: '3', school: 'School3'},
    ])

    const [SpellData, setSpellData] = useState([MOCKDATA])


    const [users, setUsers] = useState([]);

    const getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users/')
          .then((response) => response.json())
          .then((json) => setUsers(json))
          .catch((error) => console.error(error))
    }
    useEffect(() => {
        getUsers();
    }, []);
    

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Search Spells</Text>
          <TextInput 
          style={styles.input}
          placeholder="Search"
          selectionColor="#Fff"
          onChangeText={(value)=>SetSearch(value)}>
          
          </TextInput>
          <Pressable
            onPress={onFilterPress}>
              <FontAwesome
              name={"filter"}
              size={20}
              color={"#fff"}
              />
          </Pressable>
            <SpellList
              onResultPress={onResultPress}
              spellData = {MOCKDATA}
              navigation={navigation}>
              
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
    resultBox: {
      margin: 8,
      borderRadius: 12,
      padding: 10,
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
    },
    input:{
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      width: "50%",
      borderRadius: 12,
      fontSize: 15,
      padding: 5,

    },
    icon: {
      width: 36,
      "height": 36,
      "backgroundColor": "#4CBBE9",
      "borderBottomLeftRadius": 12,
      "borderTopLeftRadius": 12,
    }
  });
