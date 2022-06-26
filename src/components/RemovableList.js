import {
    FlatList,
    View,
    Text,
    Pressable
} from 'react-native'
import {useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// Utility
import AppStyles from '../utils/AppStyles'
import {COLORS} from '../utils/Colors'

const RemovableList = (props) => {

    return (
        <FlatList
            data={props.selected}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                return (
                    <Pressable
                        onPress={() => props.onXPress(item)}
                        style={[AppStyles.Removable, {borderColor: COLORS.primary_accent, flexDirection: "row"}]}>
                            <FontAwesome
                                name={"times"}
                                size={17}
                                color={"#fff"}
                                style={{color: COLORS.primary_accent, marginRight: 7}}
                            />
                            <Text style={{color: COLORS.primary_accent, fontSize: 15, fontWeight: "bold"}}>{item}</Text>
                    </Pressable>
                )
            }}>
        </FlatList>
    )
}

export default RemovableList