import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    Dimensions,
    View,
    Image,
    Modal,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
// Utility
import AppStyles from '../../utils/AppStyles';
import * as FILTER from '../../utils/FilterHelper'
import FilterComponents from '../../utils/FilterComponents';
// Components
import FilterList from '../../components/Filters/FilterList';
import ModalSearch from '../../components/ModalSearch'
import SpellList from '../../components/SpellList';
import Splash from '../../components/Splash'
import EmptySplash from '../../components/EmptySplash';


import {COLORS} from '../../utils/Colors'
import { ModalBase } from '../../components/ModalBase';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function SearchPage({navigation, route}) {

    const onResultPress = () => {
      navigation.navigate("Spell")
    }

    const onFilterPress = () => {
      navigation.navigate("Filter Spells")
    }


    const filterListRef = useRef()


    const [isInitial, setIsInitial] = useState(true)
    const [allSpells, setAllSpells] = useState(MOCKDATA)
    const [filterSpells, setFilterSpells] = useState(MOCKDATA)
    const [filter, setFilter] = useState({})
    const [resultSpells, setResultSpells] = useState(MOCKDATA)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState({abc: true, chron: true})
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
      console.log("Search loaded")
      if(isInitial){
        setFilter({})
        updateFilter({})
        setIsInitial(false)
      }
      if(route.params?.INITDATA){
        console.log("PASSED")
        if(route.params.INITDATA.length>0){
          setResultSpells(route.params.INITDATA)
          setFilterSpells(route.params.INITDATA)
        } else {
          if(route.params?.RESET && route.params.RESET==true){
            setResultSpells(allSpells)
            setFilterSpells(allSpells)
          } else {
            setResultSpells(route.params.INITDATA)
            setFilterSpells(route.params.INITDATA)
          }
        }
      }

    }, [route.params?.INITDATA, route.params?.FILTER, route.params?.RESET])

    useEffect(() => {
      filterListRef.current.scrollToIndex({index: 0})
    }, [filterSpells])

    useEffect(() => {
      resultSpells.length==0 ? setIsHidden(false) : setIsHidden(true)      
    }, [resultSpells])

    useEffect(() => {
      console.log("Sort Changed")
      // setResultSpells(getSortedSpells(resultSpells))
    }, [sort])

    useEffect(() => {
      const loadData = navigation.addListener('focus', () => {
        getFilter()
        onApplyPress()
      })
      return loadData;
    }, [navigation]);

    const getFilter = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('filter')
        const jsonValue = JSON.parse(stringValue)
        if (!jsonValue || typeof jsonValue !== 'object') return
        setFilter(jsonValue)
        console.log("FILTER FROM GET DATA")
        console.log(jsonValue)
      
      } catch(e) {
        console.log("Error getting filter data")
        console.log(e)
      }
    }

    const updateFilter = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('filter', jsonValue)
        console.log()
        setFilter(value)
      } catch (e) {I
        console.log("Error updating filters")
        console.log(e)
      }
    }

    function onApplyPress(){
      FILTER.filterSpells().then(
        newSpells => {
          changeModalVisibility(false)
          setFilterSpells(newSpells)
          setSearch("")
          // searchSpells("")
          setResultSpells(newSpells)
        }
      ).catch((error)=>{
        console.log("Filter apply error");
        console.log(error)
     });
    }

    function setFilterProp(params){
      var newFilter = FILTER.setProperty(filter, params)
      updateFilter(newFilter)
      setFilter(newFilter)
    }

    function onFilterReset(){
      setFilterSpells(allSpells)
      setFilter({})
      updateFilter({})
      navigation.navigate("Search Spells", {INITDATA: [], RESET: true})
    }

    function getOrderedFilters(){
      let standard = FilterComponents({filter: filter, setFilterProp: (params) => setFilterProp(params)})
      var ordered = standard
      ordered.sort(function(x,y){return filter.hasOwnProperty(x.name) ? -1 : filter.hasOwnProperty(y.name) ? 1 : 0})
      return ordered
    }


    const getSpellIDs = (spellList) => {
      var spellIDs = []
      for(const spell of spellList){
        spellIDs.push(spell.ID);
      }
      
      return spellIDs;
    }

    const searchSpells = (text) => {
      if (text) {
        const newData = filterSpells.filter(function(item) {
          return (item.name.toUpperCase().startsWith(text.toUpperCase()))
        })
        setResultSpells(newData)
        setSearch(text)
      } 
      else {
        setResultSpells(filterSpells)
        setSearch(text);
      }
    }

    function getSortedSpells(spells){
      
      if(sort.abc){
        if(sort.chron){
          spells.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        } else {
          spells.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
        }
      } else {
        if(sort.chron){
          spells.sort((a,b) => a.level - b.level)
        } else {
          spells.sort((a,b) => b.level - a.level)
        }
      }
      return spells
    }

    

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalComponent, setModalComponent] = useState(getOrderedFilters()[0])

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }

    function onModalPress(item){
      setModalComponent(item)
      changeModalVisibility(true)
    }

    return (
        <SafeAreaView style={AppStyles.Background}>
          <View style={AppStyles.Container}>
            
            <Text style={AppStyles.Header1}>Search Spells</Text>
            <View style={styles.searchBox}>
              <View style={styles.searchBar}>
                <TextInput 
                  style={styles.input}
                  placeholder="Search"
                  value={search}
                  selectionColor="#CCD2E3"
                  placeholderTextColor="#CCD2E3"
                  onChangeText={(text)=> searchSpells(text)}
                >
                </TextInput>
                <Pressable
                  onPress={() => {
                    if(search != ""){
                      searchSpells("")
                    }
                  }}
                  style={styles.searchIcon}>
                    <FontAwesome
                    name={((search==="") ? "search" : "times")}
                    size={20}
                    color={"#CCD2E3"}
                    />
                </Pressable>
              </View>
              <Pressable
              onPress={onFilterPress}
              style={styles.filterIcon}>
                <FontAwesome5
                name={"sliders-h"}
                size={20}
                color={Object.keys(filter).length === 0 ? COLORS.secondary_content : COLORS.primary_accent}
                />
              </Pressable>
            </View>


            {/* Filter Horizontal Row */}
            <View style={styles.filterBox}>
              {
                Object.keys(filter).length === 0 ? null :
                
                <Pressable
                  style={{flexDirection: "row", alignItems: "center", marginRight: 7}}
                  onPress={() => onFilterReset()}
                  >
                  <FontAwesome
                    name={"times-circle"}
                    size={33}
                    color={COLORS.primary_accent}
                  />
                </Pressable>
              }    

              <FlatList
                style={{borderRadius: 50}}
                horizontal={true}
                ref={filterListRef}
                showsHorizontalScrollIndicator={false}
                data={getOrderedFilters()}
                renderItem={({item}) => {
                  return (
                    <Pressable
                      onPress={() => onModalPress(item)}
                      style={({pressed}) => [{backgroundColor: pressed? '#565C6B' : '#373C48'}, (filter[item.name] ? styles.activeButton : styles.button)]}
                  >
                    <Text style={[styles.option, {color: (filter[item.title] ? COLORS.primary_content : COLORS.secondary_content)}]}> {item.title.length < 15
                  ? `${item.title}`
                  : `${item.title.substring(0, 15)}...`}</Text>
                  </Pressable>
                  )
                }}
                >
                </FlatList>
            </View>

            <Modal
              transparent={true}
              animationType='fade'
              visible={isModalVisible}
              // style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
              nRequestClose={() => changeModalVisibility(false)}>
                <TouchableOpacity style={{width: "100%", height: "100%", justifyContent: "center", alignContent: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)'}} activeOpacity={1} onPress={() => console.log("Back drop closing disabled")}>
                    <TouchableOpacity onPress={() => console.log('Meep')} activeOpacity={1} >
                      <ModalBase
                        changeModalVisibility={changeModalVisibility}
                        header={true}
                        title={modalComponent?.prompt}
                        showX={false}
                        component={
                        <View>
                          {modalComponent?.component}
                          <View style={{alignItems: "center"}}>
                              <Pressable
                                  onPress={() => onApplyPress()}
                                  style={AppStyles.PrimaryButton}    
                              >
                                  <Text style={AppStyles.Header4}>Save</Text>
                              </Pressable>
                          </View>
                        </View>
                        
                        }
                      >
                      </ModalBase>
                    </TouchableOpacity>
                </TouchableOpacity>                  
              
                
            </Modal>

            {/* Sorting */}
            <View style={styles.searchBox}>
                <Text style={styles.spellTXT}>{resultSpells.length!=0 ? resultSpells.length + " results" : ""}</Text>
                <View style={{flexDirection: "row"}}>
                  <Pressable
                    onPress={() => setSort({abc: true, chron: (sort.abc? !sort.chron : sort.chron)})}
                    style={[styles.sort]}>
                    <FontAwesome5
                      name={(sort.chron? "sort-alpha-down" : "sort-alpha-up-alt")}
                      size={23}
                      color={(sort.abc? COLORS.primary_accent : COLORS.back_light)}
                      />
                  </Pressable>
                  <Pressable
                    onPress={() => setSort({abc: false, chron: (sort.abc? sort.chron : !sort.chron)})}
                    style={[styles.sort]}>
                    <FontAwesome5
                      name={(sort.chron? "sort-numeric-down" : "sort-numeric-up-alt")}
                      size={23}
                      color={(!sort.abc? COLORS.primary_accent : COLORS.back_light)}
                      />
                  </Pressable>
                </View>
            </View>
            <Splash
              hide={isHidden}
              image={"spell_scroll"}
              title={"No spells found"}
              body={"Try expanding your search :)"}>
            </Splash>
            <SpellList
              onResultPress={onResultPress}
              spellIDs={getSpellIDs(getSortedSpells(resultSpells))}
              navigation={navigation}
              prevScreen="Search Spells"
              scrollEnabled={true}>
            </SpellList>
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
      color: "#FFFFFF",
      fontSize: 30,
      
      padding: 10,
      fontWeight: "bold"
    },
    resultContainer: {
    },
    searchBox: {
      marginBottom: 8,
      marginTop: 8,
      borderRadius: 12,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: "center",
    },
    filterBox: {
      borderRadius: 12,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: "center",
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "bold"
    },
    sort: {
      paddingHorizontal: 10,
      borderRadius: 8,
      marginRight: 5
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
    },
    input:{
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      color: "#CCD2E3",
      borderRadius: 12,
      fontSize: 15,
      paddingLeft: 17,
      width: "80%",
      height: 40
    },
    searchBar:{
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      borderRadius: 12,
      fontSize: 15,
      width: "85%",
      height: 40,
      justifyContent: "space-between"
    },
    searchIcon: {
      marginRight: 15
    },
    filterIcon: {
      backgroundColor: COLORS.back,
      padding: 10,
      borderRadius: 12
    },
    option: {
      fontSize: 15,
      fontWeight: "bold",
      marginLeft: 13,
      marginRight: 13,
    },
    button: {
      borderRadius: 50,
      padding: 7,
      marginRight: 8,
      marginBottom: 3,
      marginTop: 3
    },
    activeButton: {
      backgroundColor: COLORS.primary_accent,
      borderRadius: 50,
      padding: 7,
      marginRight: 8,
      marginBottom: 3,
      marginTop: 3
    },
  });
