import {
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    Pressable,
    View,
    Modal
    
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Utility
import * as THEME from '../../utils/Theme'
// Components
import { ModalBase } from '../../components/ModalBase';
import Splash from '../../components/Splash';

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)]
THEME.getTheme().then(
    theme => {
        COLORS = theme.COLORS
        STYLES = theme.STYLES
    }
)

export default function SettingsPage({navigation, route}) {
    
  
    useEffect(() => {
        const loadData = navigation.addListener('focus', () => {
          getData()
        })
        return loadData;
      }, [navigation]);
  
      const getData = async () => {
        try {
          const stringValue = await AsyncStorage.getItem('theme')
          const jsonValue = JSON.parse(stringValue)
          if (!jsonValue) return
          setSelected(jsonValue)
          console.log("THEME FROM GET DATA")
          console.log(jsonValue)
        
        } catch(e) {
          console.log("Error getting theme data")
          console.log(e)
        }
      }
  
      const updateData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('theme', jsonValue)
        } catch (e) {I
          console.log("Error updating theme")
          console.log(e)
        }
      }

    const [selected, setSelected] = useState("Dark")
    const [changed, setChanged] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

    const changeDeleteModalVisibility = (bool) => {
        setIsDeleteModalVisible(bool)
    }

    function deleteCharacters(){
      AsyncStorage.removeItem('characters');
      setDeleted(true)
      changeDeleteModalVisibility(false)
    }

    function changeTheme(item){
        setChanged(true)
        setSelected(item)
        updateData(item)
    }

    return (
        <SafeAreaView style={STYLES.Background}>
            <View style={STYLES.Container}>
                <Text style={STYLES.Header1}>Settings</Text>
                <View style={{paddingTop: 40}}>
                    <Text style={STYLES.Header2}>Appearance</Text>
                    <Text style={[STYLES.Header3, {color: COLORS.secondary_content,marginTop: 5}]}>Theme</Text>
                  <FlatList
                      horizontal={true}
                      data={["Dark", "Light"]}
                      renderItem={({item}) => (
                          <Pressable
                              onPress={() => changeTheme(item)}
                              style={{padding: 10, borderRadius: 8, backgroundColor: (item==selected ? COLORS.primary_accent : COLORS.back), marginRight: 10, marginVertical: 5}}>
                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome5
                                  style={{margin: 10, marginRight: 0}}
                                  name={item == "Light" ? "sun" : "moon"}
                                  size={25}
                                  color={COLORS.primary_content}
                                />
                                <Text style={[STYLES.Header4, {padding: 6}]}>{item}</Text>
                              </View>
                          </Pressable>
                      )}>

                  </FlatList>
                  <Text style={[STYLES.Note, {color: COLORS.secondary_accent}]}>{changed ? "App restart required" : null}</Text>
                </View>

                <View style={{paddingVertical: 15}}>
                    <Text style={STYLES.Header2}>Data</Text>
                    <Text style={[STYLES.Header3, {color: COLORS.secondary_content,marginTop: 5}]}>Characters</Text>
                    <Pressable
                      style={{backgroundColor: COLORS.secondary_accent, borderRadius: 8, alignSelf: 'baseline', marginVertical: 5}}
                      onPress={() => changeDeleteModalVisibility(true)}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <FontAwesome
                            style={{margin: 10, marginRight: 0}}
                            name={"trash"}
                            size={25}
                            color={COLORS.primary_content}
                          />
                          <Text style={[STYLES.Header4, {padding: 10}]}>Wipe all character data</Text>
                        </View>
                    </Pressable>
                    {/* Delete */}
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isDeleteModalVisible}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        nRequestClose={() => changeDeleteModalVisibility(false)}>
                            <ModalBase
                            changeModalVisibility={changeDeleteModalVisibility}
                            header={false}
                            title={"Settings"}
                            component={
                                <View>
                                <Splash
                                    hide={false}
                                    image={"red_dragon"}
                                    title={"Are you sure?"}
                                    body={"All characters will be permanently deleted"}
                                    component={
                                    <View style={{flexDirection: "row", marginTop: 20}}>
                                        <Pressable 
                                        onPress={() => changeDeleteModalVisibility(false)}
                                        style={STYLES.TertiaryButton}>
                                        <Text style={STYLES.Header4}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                        onPress={() => deleteCharacters()}
                                        style={[STYLES.SecondaryButton, {borderColor: COLORS.secondary_accent}]}>
                                        <Text style={STYLES.Header4}>Delete</Text>
                                        </Pressable>
                                    </View>
                                    }></Splash>
                                </View>
                            }
                            >
                        </ModalBase>
                    </Modal>
                    <Text style={[STYLES.Note, {color: COLORS.secondary_accent}]}>{deleted ? "App restart required" : "Cannot be undone"}</Text>
                </View>
                
                <View style={{paddingVertical: 15}}>
                    <Text style={STYLES.Header2}>Peformance</Text>
                    <Text style={[STYLES.Header3, {color: COLORS.back,marginTop: 5}]}>Reporting</Text>
                    <Pressable
                      style={{backgroundColor: COLORS.back, borderRadius: 8, alignSelf: 'baseline', marginVertical: 5}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <FontAwesome
                            style={{margin: 10, marginRight: 0}}
                            name={"bug"}
                            size={25}
                            color={COLORS.back_dark}
                          />
                          <Text style={[STYLES.Header4, {color: COLORS.back_dark, padding: 10}]}>Report a bug</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  });