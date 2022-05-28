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


export default function FilterPage({navigation, route}) {

    const onBackPress = () => {
        navigation.navigate("Search Spells")
    }

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Filter Spells</Text>
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