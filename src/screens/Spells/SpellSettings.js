import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList,
    Modal
} from 'react-native'
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MOCKDATA from '../../../MOCK_SPELL_DATA.json'
// Utility
import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';
import {COLORS} from '../../utils/Colors'
// Components
import { ModalBase } from '../../components/ModalBase';
import Splash from '../../components/Splash';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const SpellSettings = (props) => {

    const [Chars, setChars] = useState([])
    const [selectedChar, setSelectedChar] = useState({spells: {}})

    useEffect(() => {
        console.log("chars )")
        getData()

    }, [props.navigation]);

    const getData = async () => {
        try {
          const stringValue = await AsyncStorage.getItem('characters')
          const jsonValue = JSON.parse(stringValue)
          if (!jsonValue || typeof jsonValue !== 'object') return
          setChars(jsonValue)
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

    const navigation = props.navigation
    const spellID = props.spellID

    const spell = MOCKDATA.find(spell => spell.ID == spellID)

    const changeModalVisibility = (bool) => {
        props.changeModalVisibility(bool)
    }

    function selectCharacter(item){
        console.log(item)
        if(selectedChar.ID == item.ID){
            setSelectedChar({spells: {}})
        } else {
            setSelectedChar(item)
        }
    }

    function manageStats(item, index, stat){
        if(selectedChar!={spells: {}}){
            console.log(index)
            const STAT_INDEX = stat == 'known' ? 0 : 1
            var tempSpells = Object.values(selectedChar.spells)
            var tempClassSpells = tempSpells[index]
            var tempStat = Object.values(tempClassSpells)[STAT_INDEX]

            if(!tempStat.includes(spellID)){
                tempStat.push(spellID)
            } else {
                tempStat = tempStat.filter(e => e !== spellID)
            }
            
            
            selectedChar.spells[selectedChar.classes[index]] = stat == 'known' ? {known: tempStat, prepared: Object.values(tempSpells[index])[1]} : {known: Object.values(tempSpells[index])[0], prepared: tempStat}
            console.log("final!!!!!")
            console.log(selectedChar)
            const newChars = Chars
            newChars[selectedChar.ID] = selectedChar
            setSelectedChar(selectedChar)
            updateData(newChars)
            getData()
        }
    }

    const classList = <View>
        <FlatList
            data={Object.values(selectedChar?.spells)}
            renderItem={({item, index}) => (               
                
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
                        <FontAwesome5
                            style={{marginHorizontal: 10, marginLeft: 10, transform: [{rotate: '0deg'}]}}
                            name={'scroll'}
                            color={selectedChar.color}
                            size={18}/>
                        <View style={{backgroundColor: COLORS.back_light, borderRadius: 8, padding: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: COLORS.primary_content, fontWeight: 'bold', marginHorizontal: 10}}>{selectedChar.classes[index]}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Pressable
                                    onPress={() => manageStats(item, index, 'known')}>
                                    <FontAwesome5
                                        style={{marginHorizontal: 10, marginLeft: 30}}
                                        name={'graduation-cap'}
                                        color={(item['known'].includes(spellID)) ? selectedChar.color : COLORS.back}
                                        size={18}/>
                                </Pressable>
                                <Pressable
                                    onPress={() => manageStats(item, index, 'prepared')}>
                                    <FontAwesome5
                                        style={{marginHorizontal: 10, marginLeft: 30}}
                                        name={'magic'}
                                        color={(item['prepared'].includes(spellID)) ? selectedChar.color : COLORS.back}
                                        size={18}/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
            )}>
            
        </FlatList>
    </View>


    return (
        <View>
            {/* Settings */}
            <ModalBase
                changeModalVisibility={changeModalVisibility}
                header={true}
                title={"Manage spell"}
                component={
                    <View style={{marginVertical: 0}}>
                        <Text style={[AppStyles.Header4, {fontStyle: 'italic', color: COLORS.secondary_content, marginTop: 5, marginBottom: 10}]}>{spell.name}</Text>
                    <FlatList
                        data={Chars}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <View>                            
                                <Pressable 
                                    onPress={() => selectCharacter(item)}
                                    style={({pressed}) => [{backgroundColor: pressed? COLORS.primary_accent : COLORS.back_light}, {flexDirection: 'row', alignItems: "center", padding: 8, borderRadius: 15}]}>
                                    <View style={{padding: 5, backgroundColor: item.color, borderRadius: 15}}>
                                        <Image
                                            style={{height: 35, width: 35,}}
                                            source={Images.icon[item.icon.toLowerCase()]}
                                            resizeMode="contain">
                                        </Image>
                                    </View>
                                    <Text style={[AppStyles.Header3, {marginLeft: 8}]}>{item.name}</Text>
                                </Pressable>
                                {(selectedChar != {} && selectedChar.ID == item.ID? classList : null)}
                            </View>
                            )}>

                    </FlatList>
                    </View>
                }
                >
            </ModalBase>
        </View>
    )
}


export default SpellSettings