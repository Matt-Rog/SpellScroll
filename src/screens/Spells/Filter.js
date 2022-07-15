import {
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    View,
    
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
// Utility
import * as THEME from '../../utils/Theme'
import * as FILTER from '../../utils/FilterHelper'
import FilterComponents from '../../utils/FilterComponents';
// Components
import TopMenu from '../../components/TopMenu';

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)]
THEME.getTheme().then(
    theme => {
        COLORS = theme.COLORS
        STYLES = theme.STYLES
    }
)

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
        <SafeAreaView style={STYLES.Background}>
          <View style={STYLES.Container}> 
            <TopMenu
              bubble={true}
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
            <Text style={STYLES.Header2}>Filter Spells</Text>
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
    resultBox: {
      marginBottom: 8,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      backgroundColor: "#373C48"
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 9
    },
  });