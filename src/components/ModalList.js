import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    FlatList,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// Utility
import * as THEME from '../utils/Theme'

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)]
THEME.getTheme().then(
    theme => {
        COLORS = theme.COLORS
        STYLES = theme.STYLES
    }
)

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalList = (props) => {

    const options = props.options
    const [selected, setSelected] = useState(props.selected)

    function onOptionPress(item){
        if(!selected.includes(item) && !props.selected.includes(item)){
          var joined = selected.concat(item);
          setSelected(joined)
        } else {
          var removed = selected.filter(i => i !== item)
          setSelected(removed)
        }
    }

    function onApplyPress(){
        props.applySelection(selected)
        props.changeModalVisibility(false)
    }
    
    return (
        <Pressable
            style={styles.container}
        >
            <View style={[STYLES.Modal, {width: WIDTH - 20, height: HEIGHT/1.7}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 5}}>
                    <Text style={STYLES.Header2}>{props.name}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Pressable
                            onPress={() => (selected.length>0 ? setSelected([]) : setSelected(options))}
                            style={[{flexDirection: "row", alignItems: "center"},styles.clearBTN]}    
                        >
                            <FontAwesome
                                name={((selected.length>0) ? "minus-square" : "check-square")}
                                size={30}
                                color={((selected.length>0) ? COLORS.secondary_content : COLORS.primary_accent)}
                            />
                            <Text style={[STYLES.Header3, {marginLeft: 10}]}>
                                All
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    style={{borderRadius: 15}}
                    data={options}
                    showsVerticalScrollIndicator={true}
                    renderItem={({item}) => {
                        return (
                            <Pressable
                                style={[styles.option, {backgroundColor: selected.includes(item) ? COLORS.back_light : COLORS.back}]}
                                onPress={() => onOptionPress(item)}
                            >
                                <FontAwesome
                                name={(selected.includes(item) ? "check-square" : "square")}
                                size={20}
                                color={(selected.includes(item) ? COLORS.primary_accent : COLORS.secondary_content)}
                                />
                                <Text style={[STYLES.Header3, {color: selected.includes(item) ? COLORS.primary_content : COLORS.secondary_content}, {marginLeft: 16}]}>{item}</Text>
                            </Pressable>
                        )
                    }}>

                </FlatList>
                <View style={{flexDirection: "row-reverse", justifyContent: "center", marginTop: 15}}>
                    <Pressable
                        onPress={() => onApplyPress()}
                        style={STYLES.PrimaryButton}    
                    >
                        <Text style={[styles.applyTXT, {color: COLORS.primary_content}]}>Apply</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.changeModalVisibility(false)}
                        style={STYLES.TertiaryButton}    
                    >
                        <Text style={[styles.cancelTXT, {color: COLORS.secondary_content}]}>Cancel</Text>
                    </Pressable>
                </View>
            </View>       
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    option:{
        width:"100%",
        flexDirection: "row",
        padding: 10,
        borderRadius: 0,
        alignItems: "center"
    },
    optionTXT: {
        marginLeft: 15
    },
    allTXT: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    applyTXT: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    cancelTXT: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    
})

export {ModalList}