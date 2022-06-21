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
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';

import Splash from '../../utils/Splash';
import MOCKCHAR from "../../../MOCK_CHAR_DATA.json"
import ModalChar from "../../utils/ModalChar"
import App from '../../utils/App';


export default function YourCharactersPage({navigation, route}) {

    const [Chars, setChars] = useState([])
    const [hideSplash, setHideSplash] = useState(false)

    useEffect(() => {
      const loadData = navigation.addListener('focus', () => {
        getData()
      })
      return loadData;
    }, [navigation]);

    const getData = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('characters')
        const jsonValue = JSON.parse(stringValue)
        if (!jsonValue || typeof jsonValue !== 'object') return
        setChars(jsonValue)
        if(jsonValue.length>0){
          setHideSplash(true)
        } else {
          setHideSplash(false)
        }
        console.log("CHARS FROM GET DATA")
        console.log(jsonValue)
      
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
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [addCharData, setAddCharData] = useState()

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }


    const onResultPress = () => {
      navigation.navigate("Character", {item})
    }

    const clearAsyncStorage = async() => {
      AsyncStorage.clear();
      setChars([])
      setHideSplash(false)
    }


    const applyFromModal = async (data) => {
      Object.assign(data, {ID: Chars.length})


      console.log("NEW CHAR")
      console.log(data)

      const newChars = [...Chars,data]
      setChars(newChars)
      updateData(newChars)
    }

    
      
    return (
        <SafeAreaView style={[AppStyles.Background]}>
          <View style={AppStyles.Container}>
          <Text style={styles.title}>Your Characters</Text>
          <Pressable
            onPress={()=>clearAsyncStorage()}>
            <Text style={AppStyles.Header3}>CLEAR ALL</Text>
          </Pressable>
          <Splash
            hide={hideSplash}
            image={"red"}
            title={"No characters found"}
            component={
              <Pressable
                onPress={() => navigation.navigate("Add Character", {edit: false})}
                style={AppStyles.PrimaryButton}>
                <Text style={AppStyles.Header4}>Add Character</Text> 
              </Pressable>
            }>

          </Splash>
          <FlatList
              data={Chars}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Pressable 
                  onPress={() => navigation.navigate("Character", {charID: item.ID})}
                  style={({pressed}) => [{backgroundColor: pressed? '#545A67' : '#373C48'}, styles.resultBox]}
                  android_ripple={{color:'#4C515B'}}>
                  
                  <View style={[styles.bar, {backgroundColor: item.color}]}>
                    <Image
                      style={styles.icon}
                      source={Images.icon[item.icon.toLowerCase()]}
                      resizeMode="stretch">
                    </Image>
                  </View>
                  <View style={{flexDirection: "column"}}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={3} style={[AppStyles.Header3,{maxWidth: "110%"}]}>{item.name}</Text>
                    <FlatList
                      data={item.classes}
                      numColumns={3}
                      scrollEnabled={false}
                      renderItem={({item}) => {
                        return (
                          <View style={[AppStyles.Tags, {marginTop: 10, marginRight: 8}]}>
                            <Text style={{color: "#CCD2E3"}}>{item.toUpperCase()}</Text>
                          </View>
                        )
                    }}></FlatList>
                  </View>
                </Pressable>
              )}
            />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", bottom: 20, right: 0}}>
              <Pressable
                  onPress={() => navigation.navigate("Add Character", {edit: false})}
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
      "borderBottomLeftRadius": 12,
      "borderTopLeftRadius": 12,
      borderRadius: 15,
      padding: 10,
      marginRight: 15,
      justifyContent: "center"
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
      flexDirection: "row",
      alignSelf: "center",
      borderRadius: 12,
      marginHorizontal: 30,
      marginBottom: 15,
      padding: 10,
      width: "100%"
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
      width: 50,
      height: 50,
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