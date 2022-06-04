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
import FilterList from '../../utils/FilterList'
import FilterButton from '../../utils/FilterButton'
import FilterSlider from '../../utils/FilterSlider';
import MOCKDATA from "../../../MOCK_SPELL_DATA.json"
import PROPERTIES from "../../../PROPERTIES.json"


export default function FilterPage({navigation, route}) {

    const onBackPress = () => {
        navigation.navigate("Search Spells")
    }

    const [allSpells, setAllSpells] = useState(MOCKDATA)
    const [filterSpells, setFilterSpells] = useState()
    const [search, setSearch] = useState("")
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


    function onFilterApply(){
      console.log("APPLY FILTER VVV")
      console.log(filter)


      var newData = allSpells.filter(function(item) {
        for(var key in filter){
          console.log(item[key.toLowerCase()])
          if(item[key.toLowerCase()] === undefined){
            return false;
          // If 
          } if (filter[key].some(opt => item[key.toLowerCase()].includes(opt))){
            return true
          }
          return false;
        }
      })
      console.log("Filter.js results: " + newData.length)
      setFilterSpells(newData)
      navigation.navigate("Search Spells", {INITDATA: newData, FILTER: filter, RESET: false})
    }

    function onFilterReset(){
      setFilterSpells([])
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
            ></FilterList>

            {/* Level */}
            <FilterSlider
              name="Level"
              options={[0,9]}
            ></FilterSlider>

            {/* Components */}
            <FilterButton
              name="Components"
              options={["Material", "Somatic", "Verbal"]}
              optionName="Components"
              selected={filter.Components}
              setFilterProp={(params) => setFilterProp(params)}
            ></FilterButton>

            {/* Casting Time */}
            <FilterList
                name="Casting Time"
                optionName="Casting Times"
                options={["1 Action", "1 Bonus Action", "1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"]}
            ></FilterList>

            {/* Casting Range */}
            <FilterList
                name="Casting Range"
                optionName="Casting Ranges"
                options={["1 Action", "1 Bonus Action", "1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"]}
            ></FilterList>

            
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