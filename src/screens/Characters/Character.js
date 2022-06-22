import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    Modal,
    ScrollView,
    Dimensions,
    Animated,
    TouchableNativeFeedbackBase,
    ViewComponent
    
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SpellList from '../../utils/SpellList';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';

import TopMenu from '../../utils/TopMenu';
import { ModalBase } from '../../utils/ModalBase';
import Splash from '../../utils/Splash';
import CharacterSettings from './CharacterSettings';
import SlidingTab from './SlidingTab';

const {width, height} = Dimensions.get('screen')


export default function CharacterPage({navigation, route}) {

    const [char, setChar] = useState({
      ID: 0,
      classes: [],
      icon: "hat",
      notes: "",
      spells: []
    })
    const [Chars, setChars] = useState([])
    const[spells, setSpells] = useState([])
    const[data, setData] = useState([])
    const {charID} = route.params;

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
        if (!jsonValue) return

        const tempChar = jsonValue.find(char => char.ID === charID);
        console.log("TEMPCAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(tempChar)
        setChar(tempChar)
        setChars(jsonValue)
        setSpells(tempChar.spells)



      
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

    const onBackPress = () => {
      navigation.navigate("Your Characters");
    }

    const onSettingsPress = () => {
      changeSettingsModalVisibility(true)
    }

    function onEditCharacter(){
      changeModalVisibility(false)
      navigation.navigate("Add Character", {edit: true, charID: charID})
    }


    function deleteCharacter(charID){
      var index = Chars.indexOf(Chars.find(char => char.ID === charID))
      Chars.splice(index, 1)
      updateData(Chars)
    }
    const onResultPress = () => {
      navigation.navigate("CharSpell")
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }
    const changeSettingsModalVisibility = (bool) => {
      setIsSettingsModalVisible(bool)
    }


    // Class spell tabs
    const scrollX = React.useRef(new Animated.Value(0)).current
    const ref = React.useRef()
    const onItemPress = React.useCallback(itemIndex => {
      ref?.current?.scrollToOffset({
        offset: itemIndex * width
      })
    })
    const data = Object.keys(spells).map((i) => ({
      key: i,
      class: i,
      spellIDs: spells[i],
      ref: React.createRef()
    }))

    const Tab = React.forwardRef(({item, onItemPress}, ref) => {
      return (
        <Pressable
          onPress={onItemPress}>
        <View style={{paddingVertical: 10, maxWidth: 150}}ref={ref}>
          <Text adjustsFontSizeToFit={true} numberOfLines={1}style={[AppStyles.Header4, (data.length>5 ? {fontSize: 100/data.length} : {})]}>{item.class}</Text>
        </View>
        </Pressable>
      )
    })

    const Indicator = ({measures, scrollX}) => {
      const inputRange = data.map((_, i) => i * width)
      const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(measure => measure.width)
      })
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(measure => measure.x)
      })
      return (
        <Animated.View 
          style={{
            height: 4, 
            width: indicatorWidth, 
            backgroundColor: char.color, 
            position: "absolute", 
            left: 0,
            bottom: 0, 
            transform: [{
              translateX
            }]}}>
        </Animated.View>
      )
    }

    const Tabs = ({data, scrollX, onItemPress}) => {
      const [measures, setMeasures] = React.useState([])
      const containerRef = React.useRef()
      React.useEffect(() => {
        const m = []
        data.forEach(item => {
          item.ref.current.measureLayout(containerRef.current, (x,y,width,height) => {
            m.push({
              x,y,width,height
            })

            if(m.length === data.length){
              setMeasures(m)
            }
          })
        })
      })
      return (
        <View>
          <View  ref={containerRef} style={{flexDirection: "row", justifyContent: "space-evenly"}}>
            {data.map((item,index) => {
              return <Tab key={item.key}  item={item} ref={item.ref} onItemPress={() => onItemPress(index)}/>
           })}
          </View>
          {measures.length>0 && (
            <Indicator measures={measures} scrollX={scrollX}/>
          )}
        </View>

      )
    }
    

    return (
      <SafeAreaView style={AppStyles.Background}>
        <View style={[styles.colorTab, {backgroundColor: char.color}]}></View>
        <TopMenu
          onLeftPress={() => onBackPress()}
          onRightPress={() => onSettingsPress()}
          bubble={true}
          settings={true}
          >
          
        </TopMenu>

        {/* Character Settings Modal */}
        <Modal
            transparent={true}
            animationType='fade'
            visible={isSettingsModalVisible}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            nRequestClose={() => changeSettingsModalVisibility(false)}>

              <CharacterSettings
                navigation={navigation}
                charID={charID}
                changeModalVisibility={changeSettingsModalVisibility}
                deleteCharacter={(charID) => deleteCharacter(charID)}
              ></CharacterSettings>
          </Modal>

        <View style={[styles.contentTab, {marginTop: 20}]}>
          <View style={{flexDirection: "row", marginBottom: 0, alignItems: "center"}}>
            <Image
              style={styles.icon}
              source={Images.icon[char.icon.toLowerCase()]}
              resizeMode="stretch">
            </Image>
            <View style={{flexDirection: "column", justifyContent: "center"}}>
              <Text adjustsFontSizeToFit={true} style={[AppStyles.Header2, {maxWidth: 210, marginTop: 0}]}>{char.name}</Text>
              <FlatList
                data={char.classes}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <View style={[AppStyles.Tags, {marginTop: 10, marginRight: 8}]}>
                      <Text style={{color: "#CCD2E3"}}>{item.toUpperCase()}</Text>
                    </View>
                  )
                }}></FlatList>
                <Text style={[AppStyles.ContentBody, {marginTop: char.notes.length > 0 ? 10 : 0}]}>{char.notes}</Text>
            </View>
          </View>
          
        </View>
        <SlidingTab
          data={spells}
          color={char.color}
          onResultPress={()=>onResultPress()}
          navigation={navigation}
          component={
            <View>
            <Text style={AppStyles.Header2}>HELLO</Text>
            </View>
          }>

        </SlidingTab>
        <View style={{width: width, marginTop: 15}}>
          <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress}/>
          <Animated.FlatList
            ref={ref}
            data={data}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={true}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false}
            )}
            renderItem={({item})=> {
              return(
                <View style={{width: width}}>
                  <SpellList
                      onResultPress={onResultPress}
                      spellIDs={item.spellIDs}
                      navigation={navigation}
                      prevScreen="Character"
                      scrollEnabled={true}>
                  </SpellList>
                </View>
              )
            }}
          />
        </View>
        {/*<SpellList
            onResultPress={onResultPress}
            spellIDs={spellIDs}
            navigation={navigation}
            prevScreen="Character"
            scrollEnabled={true}>

        </SpellList>*/}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  colorTab: {
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    width: "100%",
    height: 225,
    position: "absolute",
    top: 0
  },
  contentTab: {
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    width: "90%",
    padding: 20,
    height: "auto",
    backgroundColor: "#373C48",
    flexDirection: "column",
  },
  icon: {
    maxHeight: 100,
    maxWidth: 100,
    marginRight: 20
  }
});