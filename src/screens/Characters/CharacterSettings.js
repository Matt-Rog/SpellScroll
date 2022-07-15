import {
    Text,
    View,
    Dimensions,
    Pressable,
    Modal
} from 'react-native'
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// Utility
import * as THEME from '../../utils/Theme'
// Components
import { ModalBase } from '../../components/ModalBase';
import Splash from '../../components/Splash';

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)]
THEME.getTheme().then(
    theme => {
        COLORS = theme.COLORS
        STYLES = theme.STYLES
    }
)

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const CharacterSettings = (props) => {

    

    const navigation = props.navigation
    const charID = props.charID

    function onEditCharacter(){
        changeModalVisibility(false)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAR ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(charID)
        navigation.navigate("Add Character", {edit: true, charID: charID})
    }

    function onDeleteCharacter(){
        changeDeleteModalVisibility(true)
    }

    function deleteCharacter(){
        props.deleteCharacter(charID)
        navigation.navigate("Your Characters")
        changeModalVisibility(false)
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
        props.changeModalVisibility(bool)
    }
    const changeDeleteModalVisibility = (bool) => {
        setIsDeleteModalVisible(bool)
      }

    return (
        <View>
            {/* Settings */}
            <ModalBase
                changeModalVisibility={changeModalVisibility}
                header={true}
                title={"Settings"}
                component={
                    <View style={{marginVertical: 10}}>
                    <Pressable
                        onPress={() => onEditCharacter()}
                        style={[STYLES.PrimaryButton, {backgroundColor: COLORS.back_light,flexDirection: "row"}]}>
                        <FontAwesome
                            name={"pencil"}
                            size={25}
                            color={COLORS.primary_content}
                            />
                        <Text style={[{marginLeft: 15},STYLES.Header3]}>Edit Character</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => onDeleteCharacter()}
                        style={[STYLES.SecondaryButton, {borderColor: COLORS.secondary_accent,flexDirection: "row", marginTop: 15}]}>
                        <FontAwesome
                            name={"trash"}
                            size={25}
                            color={COLORS.primary_content}
                            />
                        <Text style={[{marginLeft: 15},STYLES.Header3]}>Delete Character</Text>
                    </Pressable>
                    </View>
                }
                >
            </ModalBase>

            {/* Delete */}
            <Modal
                transparent={true}
                animationType='fade'
                visible={isDeleteModalVisible}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                nRequestClose={() => changeDeleteModalVisibility(false)}>
                    <ModalBase
                    changeModalVisibility={changeDeleteModalVisibility}
                    header={false}
                    title={"Settings"}
                    component={
                        <View>
                        <Splash
                            hide={false}
                            image={"red_dragon"}
                            title={"Are you sure?"}
                            body={"Your character will be permanently deleted"}
                            component={
                            <View style={{flexDirection: "row", marginTop: 20}}>
                                <Pressable 
                                onPress={() => changeDeleteModalVisibility(false)}
                                style={STYLES.TertiaryButton}>
                                <Text style={STYLES.Header4}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                onPress={() => deleteCharacter()}
                                style={[STYLES.SecondaryButton, {borderColor: COLORS.secondary_accent}]}>
                                <Text style={STYLES.Header4}>Delete</Text>
                                </Pressable>
                            </View>
                            }></Splash>
                        </View>
                    }
                    >
                </ModalBase>
            </Modal>
        </View>
    )
}


export default CharacterSettings