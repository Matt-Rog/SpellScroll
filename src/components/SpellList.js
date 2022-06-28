import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    
} from 'react-native';
import MOCKDATA from "../../MOCK_SPELL_DATA.json"
// Utility
import Images from '../utils/Images';
import {COLORS} from '../utils/Colors'



const SpellList = (props) => {

    // Spell ID -> Spell Data
    const spellIDs = props.spellIDs
    var spells = []
    for(const item of MOCKDATA){
        if(Array.isArray(spellIDs)){
          if( spellIDs.includes(item.ID)){
            spells.push(item)
          }
        } else {
          if(spellIDs == (item.ID)){
            spells.push(item)
          }
        }
    }
    

    // Conditionally decides which sub-stack is visiting Spell.js
    var next = (props.prevScreen==="Search Spells") ? "Spell" : "CharSpell";


    function levelLogic({item}){
      if(item.level == 0){
        return "Cantrip"
      }
      return "Lv." + `${item.level}`
    }

    return (
            <FlatList
              scrollEnabled={props.scrollEnabled}
              data={spells}
              renderItem={({item}) => (
                <Pressable 
                  onPress={() => props.navigation.navigate(next, {id: item.ID})}
                  style={({pressed}) => [{backgroundColor: pressed? '#565C6B' : '#373C48'}, styles.resultBox]}
                  android_ripple={{color:'#4C515B'}}>
              
                  <View style={[{backgroundColor: COLORS.school[item.school.toLowerCase()]},styles.schoolBar]}>
                    <Image 
                    style={styles.icon}
                    source={Images.school[item.school.toLowerCase()]}
                    resizeMode="stretch">
                    </Image>
                  </View>
                  <View style={styles.text}>
                    <View style={styles.rowOne}>
                      <Text style={styles.spellTXT}>{item.name}</Text>
                      <Text style={styles.spellTXT}>{levelLogic({item})}</Text>
                    </View>
                    <Text style={styles.schoolTXT}>{item.school}</Text>
                    <View style={styles.rowOne}>
                      <Text style={styles.subTXT}>Amongously</Text>
                      <Text style={styles.subTXT}>Meaningless</Text>
                      <Text style={styles.subTXT}>Text</Text>
                    </View>

                  </View>
                </Pressable>
              )}
            />
    );
}

const styles = StyleSheet.create({
    resultBox: {
      marginBottom: 8,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      flexDirection:'row'
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "bold",
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
      fontWeight: "bold",
    },
    subTXT:{
      color: "#CCD2E3",
      fontSize: 14,
    },

    input:{
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      width: "50%",
      borderRadius: 12,
      fontSize: 15,
      padding: 5,

    },
    icon: {
      width: 36,
      "height": 36,
    },
    schoolBar:{
      "borderBottomLeftRadius": 12,
      "borderTopLeftRadius": 12,
      alignItems: "center",
      justifyContent: "center",
      height: 70,
      width: 40,
      flex: 1,
    },
    text: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      marginLeft: 9,
      flex: 6,
      marginRight: 12
    },
    rowOne: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }
  });

export default SpellList;