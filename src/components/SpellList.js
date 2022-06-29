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
import AppStyles from '../utils/AppStyles';
// Components
import Tags from './Tags';



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
      let subtitle = ""
      switch(item.level){
        case 0:
          subtitle+="Cantrip"
          break
        case 1:
          subtitle+="1st"
          break
        case 2:
          subtitle+="2nd"
          break
        case 3:
          subtitle+="3rd"
          break
        default:
          subtitle+=(item.level + "th")
          break;        
      }
      return subtitle
    }

    return (
            <FlatList
              style={{borderRadius: 12}}
              scrollEnabled={props.scrollEnabled}
              showsVerticalScrollIndicator={false}
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
                      <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[AppStyles.Header4]}>{item.name}</Text>
                      <Text style={styles.spellTXT}>{levelLogic({item})}</Text>
                    </View>
                    <View style={[styles.rowOne, {marginTop: 6}]}>
                      <Text style={[AppStyles.Header4, {fontSize: 17, color: COLORS.secondary_content}]}>{item.school}</Text>
                      <Tags
                        tags={(item.tags!=undefined ? item.tags : (item.effect!=undefined ? [item.effect] : ["No Effect"]))}
                        background={COLORS.back_light}
                        fontSize={13}
                        >
                        
                      </Tags>
                    </View>

                  </View>
                </Pressable>
              )}
            />
    );
}

const styles = StyleSheet.create({
    resultBox: {
      marginVertical: 5,
      borderRadius: 12,
      
      flexDirection:'row'
    },
    spellTXT: {
      color: COLORS.secondary_content,
      fontSize: 17,
      fontWeight: "bold",
      fontStyle: "italic"
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
      
      width: "15%",
    },
    text: {
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
      flex: 6,
    },
    rowOne: {
      flexDirection: "row",
      
      alignContent: "center",
      justifyContent: "space-between",
      alignItems: "baseline"
    },
     column: {

     }
  });

export default SpellList;