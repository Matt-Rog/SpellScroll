import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Modal,
    ScrollView
    
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {ModalRange} from './ModalRange'
import { ArrowUpIcon } from 'native-base';


const FilterRange = (props) => {

    const options = props.options

    const [selected, setSelected] = useState(((props.selected==undefined || props.selected.length==options.length) ? options : props.selected)) 
    const [min, setMin] = useState(selected[0])
    const [max, setMax] = useState(selected[selected.length-1])

    const [range, setRange] = useState(options)

    const [isMax, setIsMax] = useState()
    const [isSingle, setIsSingle] = useState(false)
    const [toggled, setToggled] = useState((selected.length<=1) ? "Single" : "Range")





    const singleView = 
      <View style={styles.content}>
        <Pressable
          onPress={() => onMinPress()}>
            <View style={{flexDirection: "column", alignItems: "flex-start"}}>
                <Text style={styles.label}>Select</Text>                    
                <View style={styles.button}>
                    <Text style={styles.option}>{(selected[0]==0 ? "Cantrip" : "Lvl " + selected[0])}</Text>
                </View>
            </View>
        </Pressable>
      </View>

  const rangeView = 
    <View style={styles.content}>
      <Pressable
        onPress={() => onMinPress()}>
          <View style={{flexDirection: "column", alignItems: "flex-start"}}>
              <Text style={styles.label}>From</Text>                    
              <View style={styles.button}>
                  <Text style={styles.option}>{(min==0 ? "Cantrip" : "Lvl " + min)}</Text>
              </View>
          </View>
      </Pressable>
      <FontAwesome
                name={"arrow-right"}
                size={20}
                color={"#CCD2E3"}
                style={styles.arrowIcon}
                />
      <Pressable
        onPress={() => onMaxPress()}>
          <View style={{flexDirection: "column", alignItems: "flex-start"}}>
              <Text style={styles.label}>To</Text>                    
              <View style={styles.button}>
                  <Text style={styles.option}>{(max==0 ? "Cantrip" : "Lvl " + max)}</Text>
              </View>
          </View>
      </Pressable>
    </View>



    const [modeView, setModeView] = useState(rangeView)

    
    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }

    function onModeToggle(mode){
      setToggled(mode)
      if(mode=="Single"){
        setRange(options)
        setModeView(singleView)
        setIsSingle(true)
        setFilterProp(selected[0])
      } else {
        setModeView(rangeView)
        setIsSingle(false)
        setFilterProp(selected)
      }
    }

    function onMinPress(){
        setRange(options.filter(function(x) {
            return x <= max
        }))
        console.log(setIsMax(false))
        changeModalVisibility(true)
    }

    function onMaxPress(){
        setRange(options.filter(function(x) {
            return x >= min
        }))
        console.log(setIsMax(true))
        changeModalVisibility(true)
    }


    function applySelection(selection){
      setSelected(selection)
      setMin(selection[0])
      setMax(selection[selection.length-1])


      // Formatting
      setFilterProp(selection)
      
    }

    function setFilterProp(selection){
      if(selection.length>0){
        props.setFilterProp({name: props.name, selected: selection})
      } else {
        props.removeFilterProp({name: props.name})
      }
    }

    return (

        <View style={styles.resultBox}>
            <View style={styles.heading}>
              <Text style={styles.spellTXT}>{props.name}</Text>
              <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                nRequestClose={() => changeModalVisibility(false)}>
                  <ModalRange
                    name={(toggled=="Range" ? (isMax==true ? "Level Maximum" : "Level Minimum") : "Level Select")}
                    changeModalVisibility={changeModalVisibility}
                    options={options}
                    max={isMax}
                    single={isSingle}
                    selected={selected}
                    range={range}
                    applySelection={(selected) => applySelection(selected)}
                  >
                  </ModalRange>
              </Modal>
            </View>
            <View style={styles.toggle}>
              <Pressable
                onPress={() => onModeToggle("Single")} 
                style={[{backgroundColor: (toggled=="Single") ? '#4CBBE9' : '#CCD2E3'}, styles.toggleBTN]}>
                <Text style={styles.option}>Single</Text>
              </Pressable>
              <Pressable 
                onPress={() => onModeToggle("Range")}
                style={[{backgroundColor: (toggled=="Range") ? '#4CBBE9' : '#CCD2E3'}, styles.toggleBTN]}>
              <Text style={styles.option}>Range</Text>
              </Pressable>
            </View>
            {modeView}
        </View>
    );
}

const styles = StyleSheet.create({
    resultBox: {
      marginBottom: 10,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      backgroundColor: "#373C48",
      paddingBottom: 8,
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    nullTXT: {
      color: "#4CBBE9",
      fontSize: 14,
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 9
    },
    toggle :{
      flexDirection: "row",
      justifyContent: "center"
    },
    toggleBTN: {
      margin: 15,
      borderRadius: 50,
      padding: 3,
      marginTop: 0
    },
    option: {
      fontSize: 17,
      marginLeft: 6,
      marginRight: 6,
      fontWeight: "bold",
      color: "#373C48"
    },
    button: {
      borderRadius: 8,
      backgroundColor: "#4CBBE9",
      borderWidth: "1",
      flexDirection: "row",
      padding: 8,
      marginBottom: 8,
      alignItems: "center"
    },
    label: {
        color: "#CCD2E3",
        margin: 3,
        fontSize: 15,
        marginTop: 0
    },
    content: {
      flexDirection: "row",
      justifyContent:"center",
      alignItems: "center"
    },
    arrowIcon: {
        margin: 30,
    }
  });

  export default FilterRange;