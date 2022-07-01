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
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
// Utility
import AppStyles from '../../utils/AppStyles';
import {COLORS} from '../../utils/Colors'
import * as FILTER from '../../utils/FilterHelper'
import FilterComponents from '../../utils/FilterComponents';
// Components
import TopMenu from '../../components/TopMenu';
import FilterList from '../../components/Filters/FilterList'
import FilterButton from '../../components/Filters/FilterButton'



export default function FilterPage({navigation, route}) {


  const [filter, setFilter] = useState({})
  const [allSpells, setAllSpells] = useState(MOCKDATA)
  const [filterSpells, setFilterSpells] = useState()

  const onBackPress = () => {

        navigation.goBack()
    }


    useEffect(() => {
      const loadData = navigation.addListener('focus', () => {
        getFilter()
      })
      return loadData;
    }, [navigation]);

    useEffect(() => {
      getFilter()
    }, [navigation])

    const getFilter = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('filter')
        const jsonValue = JSON.parse(stringValue)
        if (!jsonValue || typeof jsonValue !== 'object') return
        setFilter(jsonValue)
        console.log("FILTER FROM FILTER.JS GET DATA")
        console.log(typeof jsonValue)
        console.log(jsonValue.Class)
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
        console.log(">>>>>> UPDATED FILTER")
        console.log(value)
        setFilter(value)
      } catch (e) {
        console.log("Error updating filters")
        console.log(e)
      }
    }

    function setFilterProp(params){
      var newFilter = FILTER.setProperty(filter, params)
      updateFilter(newFilter)
      setFilter(newFilter)
    }

    function onFilterApply(){
      updateFilter(filter)
      FILTER.filterSpells().then(
        newSpells => {
          setFilterSpells(newSpells)
          navigation.navigate("Search Spells", {INITDATA: newSpells})
        }
      )
    }

    // Reset filter and send user to search page
    function onFilterReset(){
      setFilterSpells([])
      setFilter({})
      updateFilter({})
    }

    return (
        <SafeAreaView style={AppStyles.Background}>
          <View style={AppStyles.Container}> 
            <TopMenu
              bubble={false}
              onLeftPress={()=>onBackPress()}
              settings={true}
              rightIcon={ 
                <FontAwesome
                  name={"trash"}
                  size={30}
                  color={COLORS.secondary_accent}
                  style
                  />}
              onRightPress={()=>onFilterReset()}></TopMenu>
            <Text style={styles.title}>Filter Spells</Text>
            <FlatList
              style={{borderRadius: 12}}
              showsVerticalScrollIndicator={false}
              data={FilterComponents({filter: filter, setFilterProp: (params) => setFilterProp(params)})}
              renderItem={({item}) => {
                return (
                  <View>
                    {item.component}
                  </View>
                )
              }}
              >
              </FlatList>
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
      backgroundColor: "#373C48"
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "bold",
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 9
    },
  });