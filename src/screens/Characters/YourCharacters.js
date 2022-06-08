import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    Modal
    
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MOCKCHAR from "../../../MOCK_CHAR_DATA.json"
import ModalChar from "../../utils/ModalChar"


export default function YourCharactersPage({navigation, route}) {

    const [Chars, setChars] = useState(MOCKCHAR)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [addCharData, setAddCharData] = useState()

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }


    const onResultPress = () => {
      navigation.navigate("Character", {item})
    }

    function addCharacter(){
      changeModalVisibility(true)
    }

    function applyFromModal(data){
      Object.assign(data, {id: MOCKCHAR.length})


      // const fileSystem = require('../../../../../browserify-fs')

      // const char = JSON.stringify(data)
      // fileSystem.writeFile('../../../MOCK_CHAR_DATA.json', char, err => {
      //   if (err) {
      //     console.log("Error writing file", err)
      //   } else {
      //     console.log("Written successfully")
      //   }
      // })


      // const FileSystem = require("fs");

      // FileSystem.writeFile('../../../MOCK_CHAR_DATA.json', JSON.stringify(data), (error) => {
      //     if (error) throw error;
      // });

    }

    
      
    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Your Characters</Text>
          <FlatList
              data={Chars}
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
            <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisibility(false)}
              >
              <ModalChar
                name={"Add a character"}
                changeModalVisibility={changeModalVisibility}
                applyFromModal={(data) => applyFromModal(data)}
                selected={[]}
              >
                
              </ModalChar>
            </Modal>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", bottom: 20, right: 0}}>
              <Pressable
                  onPress={() => addCharacter()}
                  style={styles.applyBTN}    
              >
                  <FontAwesome
                    name={"plus"}
                    size={35}
                    color={"#fff"}
                    style={styles.plus}></FontAwesome>
              </Pressable>
          </View>
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
    },
    plus: {
      alignSelf: "center",
      padding: 10,
      paddingVertical: 7,
    },
    applyBTN: {
        borderRadius: 100,
        backgroundColor: "#4CBBE9",
        padding: 8,
        marginRight: 30,
        justifyContent: "center",
    },
    cancelBTN: {
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 8,
        marginTop: 10,
        width: "40%",
        justifyContent: "center",
        marginRight: 30,
    },
    applyTXT: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    cancelTXT: {
        color: "#CCD2E3",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
  });