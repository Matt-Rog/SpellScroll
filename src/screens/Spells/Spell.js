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
    ScrollView
    
} from 'react-native';
import React, {useState} from 'react';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
// Utility
import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';
import {COLORS} from '../../utils/Colors'
// Components
import TopMenu from '../../components/TopMenu';
import { ModalBase } from '../../components/ModalBase';
import Splash from '../../components/Splash';
import SlidingTab from '../../components/SlidingTab';
import SpellList from '../../components/SpellList';
import SpellSettings from '../Characters/SpellSettings';
import Tags from '../../components/Tags'


export default function SpellPage({navigation, route}) {

    const {id} = route.params;
    var Spell = MOCKDATA.find(item=>item.ID===id);
    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }

    function getSubtitle(spell){
      let subtitle = ""
      switch(spell.level){
        case 0:
          subtitle+="Cantrip"
          break
        case 1:
          subtitle+="1st-level"
          break
        case 2:
          subtitle+="2nd-level"
          break
        case 3:
          subtitle+="3rd-level"
          break
        default:
          subtitle+=(spell.level + "th-level")
          break;        
      }
      subtitle+=" " + spell.school.toLowerCase()
      return subtitle
    }

    function getStyledDescription(description){
      const sections = description.split("\r\nAt Higher Levels. ")
      if(sections.length==1){
        return <View style={styles.description}>
                  <Text style={AppStyles.ContentBody}>{description}</Text>
                </View>
      } else {
        var beforeHigher = 1
        return <View style={styles.description}>
        <Text style={AppStyles.ContentBody}>{sections[0]}</Text>
        <Text style={[AppStyles.Header3]}>At Higher Levels</Text>
        <Text style={AppStyles.ContentBody}>{sections[1]}</Text>
      </View>
      }

    }

    function getComponentList(components){
      let initials = []
      for(const component of components){
        initials.push(component[0])
      }
      return initials.join()
    }

    function getStyledAttributes(spell){
      var content =
        <View style={{width: "100%"}}>

          <View style={{flexDirection: "row", justifyContent: "space-evenly"}}> 
            <View style={styles.attributeTab}>
              <Text style={styles.attributeName}>Casting Time</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit={true} adjustsFontSizeToFit={true} style={styles.attributeValue}>{spell.time}</Text>
            </View>
            <View style={styles.attributeTab}>
              <Text style={styles.attributeName}>Range/Area</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit={true} adjustsFontSizeToFit={true} style={styles.attributeValue}>{spell.range}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-evenly"}}> 
            <View style={styles.attributeTab}>
              <Text style={styles.attributeName}>Components</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.attributeValue}>{getComponentList(spell.components)}</Text>
            </View>
            <View style={styles.attributeTab}>
              <Text style={styles.attributeName}>Damage/Effect</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.attributeValue}>{spell.effect}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-evenly"}}> 
            <View style={styles.attributeTab}>
              <Text style={styles.attributeName}>Attack/Save</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit={true}style={styles.attributeValue}>{spell.attack}</Text>
            </View>
            <View style={styles.attributeTab}>
              <Text style={styles.attributeName}>Duration</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.attributeValue}>{spell.duration}</Text>
            </View>
          </View>
          
          <View style={{alignSelf: "center"}}>
            <Text style={AppStyles.Header3}>Classes</Text>
            <Tags
              tags={spell.class}
              background={COLORS.back}>
            </Tags>
          </View>
        </View>

      return content
    }

    function getTabContent(spell){

      var tabData = {
        Description: 
          <ScrollView style={{height: "60%"}} bounces={true}>
            {getStyledDescription(spell.description)}
          </ScrollView>,
        Attributes: <View>{getStyledAttributes(spell)}</View>
      }

      return tabData

    }

    const onBackPress = () => {
      navigation.goBack()
    }

    const onSettingsPress = () => {
      changeModalVisibility(true)
    }


    return (
        <SafeAreaView style={AppStyles.Background}> 
          <View style={[styles.colorTab, {backgroundColor: COLORS.school[Spell.school.toLowerCase()]}]}></View>
          <TopMenu
            bubble={true}
            settings={true}
            onLeftPress={() => onBackPress()}
            onRightPress={() => onSettingsPress()}
            ></TopMenu>
          {/* Spell Settings Modal */}
          <Modal
            transparent={true}
            animationType='fade'
            visible={isModalVisible}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            nRequestClose={() => changeModalVisibility(false)}>

              <SpellSettings
                navigation={navigation}
                spellID={id}
                changeModalVisibility={changeModalVisibility}
              ></SpellSettings>
          </Modal>


          <View style={[styles.contentTab, {marginTop: 20}]}>
            {/* School Icon & Spell Name */}
            <View style={{flexDirection: "row", marginBottom: 0, alignItems: "center"}}>
              <Image
                style={styles.icon}
                source={Images.school[Spell.school.toLowerCase()]}
                resizeMode="stretch">
              </Image>
              <View style={{justifyContent: "center"}}>
                <Text adjustsFontSizeToFit={true} style={[AppStyles.Header2, {maxWidth: 210, marginTop: 0}]}>{Spell.name}</Text>
              </View>
            </View>
            {/* Level & School Subtitle  / Tags*/}
            <View style={{marginLeft: 10}}>          
              <Text style={[AppStyles.Header3, {fontStyle: "italic", color: COLORS.secondary_content}]}>{getSubtitle(Spell)}</Text>
              <FlatList
                data={Spell.tags}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <View style={[AppStyles.Tags, {marginTop: 10, marginRight: 8}]}>
                      <Text style={{color: "#CCD2E3"}}>{item.toUpperCase()}</Text>
                    </View>
                  )
              }}></FlatList>
            </View>
          </View>

          <SlidingTab
          data={getTabContent(Spell)}
          color={COLORS.school[Spell.school.toLowerCase()]}>
          </SlidingTab> 


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
      maxHeight: 40,
      maxWidth: 40,
      marginRight: 10
    },
    description: {
      width: "95%", 
      alignSelf: "center", 
      marginTop: 10,
      marginBottom: 400,
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: COLORS.back,
      borderRadius: 8
    }, 
    attributeTab: {
      backgroundColor: COLORS.back,
      width: "40%",
      maxWidth: "50%",
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 12,
      marginBottom: 20,
      marginLeft: 0
    },
    attributeName: {
      fontSize: 15,
      color: COLORS.secondary_content,
      marginBottom: 5
    },
    attributeValue: {
      fontSize: 25,
      fontWeight: "bold",
      maxWidth: "99%",
      color: COLORS.primary_content
    }
  });