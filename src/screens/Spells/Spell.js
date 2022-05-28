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
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"


export default function SpellPage({navigation, route}) {

    const {id} = route.params;
    var Spell = MOCKDATA.find(item=>item.ID===id);


    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>{Spell.name}</Text>
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
  });