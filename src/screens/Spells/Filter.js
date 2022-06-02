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
import React, {useState} from 'react';


export default function FilterPage({navigation, route}) {

    const onBackPress = () => {
        navigation.navigate("Search Spells")
    }

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Filter Spells</Text>
          <ScrollView>
            {/* Class */}
            <View style={styles.resultBox}>
              <Text style={styles.spellTXT}>Class</Text>
            </View>
            {/* Level */}
            <View style={styles.resultBox}>
              <Text style={styles.spellTXT}>Level</Text>
            </View>
            {/* Schools */}
            <View style={styles.resultBox}>
              <Text style={styles.spellTXT}>Schools</Text>
            </View>
            {/* Components */}
            <View style={styles.resultBox}>
              <Text style={styles.spellTXT}>Components</Text>
            </View>
          </ScrollView>
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
    resultBox: {
      marginBottom: 8,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      width: "200",
      height: "50%",
      backgroundColor: "#373C48"
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "bold",
    },
  });