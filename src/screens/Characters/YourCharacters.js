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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MOCKCHAR from "../../../MOCK_CHAR_DATA.json"


export default function YourCharactersPage({navigation, route}) {

    const [Chars, setChars] = useState([
        {key: '1', charName: 'Mike One', level: '1', class: 'Bard'},
        {key: '2', charName: 'Mike Two', level: '2', class: 'Monk'},
        {key: '3', charName: 'Mike Three', level: '3', class: 'Druid'},
      ])


    const onResultPress = () => {
      navigation.navigate("Character", {item})
    }
      
    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Your Characters</Text>
          <FlatList
              data={MOCKCHAR}
              renderItem={({item}) => (
                <Pressable 
                  onPress={() => navigation.navigate("Character", {charID: item.ID})}
                  style={({pressed}) => [{backgroundColor: pressed? '#565C6B' : '#373C48'}, styles.resultBox]}
                  android_ripple={{color:'#4C515B'}}>
                  
                  <View style={styles.bar}>
                      <FontAwesome
                    name={"user"}
                    size={50}
                    color={"#fff"}
                    style={styles.icon}></FontAwesome>
                  </View>
                  <Text style={styles.charTitle}>{item.name}</Text>
                  <Text style={styles.schoolTXT}>{item.class}</Text>
                </Pressable>
              )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    base: {
      backgroundColor: "#181D23",
      height: '100%',
      width: "100%"
    },
    bar: {
      width: "100%",
      "height": 60,
      "backgroundColor": "#4CBBE9",
      "borderTopRightRadius": 12,
      "borderTopLeftRadius": 12,
    },
    title: {
      color: "#FFFFFF",
      fontSize: 30,
      padding: 10,
      fontWeight: "bold"
    },
    charTitle: {
      color: "#FFFFFF",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 10,
      marginLeft: 10,
    },
    resultContainer: {
    },
    resultBox: {
      alignSelf: "center",
      margin: 8,
      backgroundColor: "#373C48",
      borderRadius: 12,
      height: 150,
      width: "90%",
      paddingBottom: 10,
      marginBottom: 15
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 20,
      marginTop: 3,
      marginLeft: 10
    },
    input:{
      borderWidth: 1,
      borderColor: "#CCD2E3",
      color:"#CCD2E3",
      width: "50%",
      borderRadius: 12,
      fontSize: 15,
      padding: 5
    },
    icon: {
      alignSelf: "center",
      marginVertical: 10
    }
  });