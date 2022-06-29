import AsyncStorage from "@react-native-async-storage/async-storage";

import MOCKDATA from "../../MOCK_SPELL_DATA.json"

const SPELLDATA = MOCKDATA

  export const getFilter = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('filter')
      const jsonValue = JSON.parse(stringValue)
      if (!jsonValue || typeof jsonValue !== 'object') {
        updateFilter({})
      }
      console.log(">>>>>>> FILTER FROM PULL DATA")
      console.log(jsonValue)
      return jsonValue
    
    } 
    catch(e) {
      console.log("Error getting filter data")
      console.log(e)
    }
  }

  async function updateFilter(value){
    try {
      filter = value
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('filter', jsonValue)
    } catch (e) {I
      console.log("Error updating filter")
      console.log(e)
    }
  }

  export function clearFilter(){
    console.log(">>>>>>>>>>>>>>>> FILTER CLEARED");
    updateFilter({})
  }

  export function setProperty(filter, params){
    if(params.selection == undefined || params.selection.length==0){
      return removeProperty(filter, params)
    } else {
      return addProperty(filter, params)
    }
  }

  export function removeProperty(filter, params){
      let removed = {...filter}
      delete removed[params.name]
      return removed
  }

  export function addProperty(filter, params){

      const newFilter = Object.assign(filter, {[params.name]: params.selection})
      updateFilter(newFilter)
      return newFilter

  }

  export function filterSpells(){
    return getFilter().then(
      filter => {

        var newData = SPELLDATA.filter(function(item) {
            for (const [key, value] of Object.entries(filter)) {
              // key: the name of the filter property

              const filterArr = filter[key]   // Specified property options
              const spellArr = item[key.toLowerCase()]    // Spell properties


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
        return newData
      }
    ).catch((error)=>{
      console.log("Filter apply error");
      console.log(error)
    });
  }