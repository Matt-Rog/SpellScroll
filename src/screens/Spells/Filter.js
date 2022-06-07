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
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FilterList from '../../utils/Filters/FilterList'
import FilterButton from '../../utils/Filters/FilterButton'
import FilterSlider from '../../utils/Filters/FilterSlider';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
import PROPERTIES from "../../../PROPERTIES.json"
import FilterRange from '../../utils/Filters/FilterRange';


export default function FilterPage({navigation, route}) {

    const onBackPress = () => {
        navigation.navigate("Search Spells")
    }

    const [allSpells, setAllSpells] = useState(MOCKDATA)
    const [filterSpells, setFilterSpells] = useState()
    const [filter, setFilter] = useState(route.params.FILTER)


    function setFilterProp(params){
      console.log("SET FILTER")
      console.log(params.name)
      console.log(params.selected)
      setFilter((filter) => ({ 
        ...filter,
        [params.name]: params.selected
      }))
    }

    function removeFilterProp(params){
      let removed = {...filter}
      delete removed[params.name]
      setFilter(removed)
    }


    // Filter is apply implicitly 
    function onFilterApply(){
      console.log("APPLY FILTER VVV")
      console.log(filter)

      var newData = allSpells.filter(function(item) {
        for (const [key, value] of Object.entries(filter)) {
          // key: the name of the filter property

          const filterArr = filter[key]   // Specified property options
          const spellArr = item[key.toLowerCase()]    // Spell properties

          console.log(spellArr)

          if(spellArr === undefined){
            return false;
          }

          // Spell properties need to include at least one filter property
          const intersect = false
          if(Array.isArray(spellArr)){
            intersect = filterArr.some(function (option) {
              return spellArr.indexOf(option) >= 0;
            });
          } else {
            if(filterArr.includes(spellArr)){
              intersect=true
            }
          }
          if (intersect) {
            return true
          }
          return false;
        };
        // If property not specified by filter, include in result.
        return true;
      })
      console.log("Filter.js results: " + newData.length)
      setFilterSpells(newData)
      navigation.navigate("Search Spells", {INITDATA: newData, FILTER: filter, RESET: false})
    }

    // Reset filter and send user to search page
    function onFilterReset(){
      setFilterSpells([])
      setFilter([])
      navigation.navigate("Search Spells", {INITDATA: [], FILTER: [], RESET: true})
    }

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Filter Spells</Text>
          <ScrollView>
            {/* Class */}
            <FilterList
                name="Class"
                optionName="Classes"
                options={["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"]}
                setFilterProp={(params) => setFilterProp(params)}
                removeFilterProp={(params) => removeFilterProp(params)}
                selected={filter.Class}
            ></FilterList>

            {/* Level */}
            <FilterRange
                name="Level"
                optionName="Level Range"
                options={[0,1,2,3,4,5,6,7,8,9]}
                setFilterProp={(params) => setFilterProp(params)}
                removeFilterProp={(params) => removeFilterProp(params)}
                selected={filter.Level}
            ></FilterRange>

            {/* Components */}
            <FilterButton
              name="Components"
              options={["Material", "Somatic", "Verbal"]}
              optionName="Components"
              selected={filter.Components}
              setFilterProp={(params) => setFilterProp(params)}
              removeFilterProp={(params) => removeFilterProp(params)}
            ></FilterButton>

            {/* TEMP */}
            <FilterSlider
              name="Level (old)"
              options={[0,9]}
            ></FilterSlider>

            
          </ScrollView>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", bottom: 20, left: 0, right: 0}}>
              <Pressable
                  onPress={() => onFilterApply()}
                  style={styles.applyBTN}    
              >
                  <Text style={styles.applyTXT}>Apply</Text>
              </Pressable>
              <Pressable
                  onPress={() => onFilterReset()}
                  style={styles.cancelBTN}    
              >
                  <Text style={styles.cancelTXT}>Reset</Text>
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
    applyBTN: {
        borderRadius: 12,
        backgroundColor: "#4CBBE9",
        padding: 8,
        marginTop: 10,
        marginLeft: 30,
        width: "40%",
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