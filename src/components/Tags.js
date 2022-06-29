import {
    FlatList,
    View,
    Text,
} from 'react-native'
// Utility
import AppStyles from '../utils/AppStyles'
import {COLORS} from '../utils/Colors'

const Tags = (props) => {

    return (
        <FlatList
            data={props.tags}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({item, index}) => {
            return (
                <View style={[AppStyles.Tags, {marginTop: (props.tags.length>3 ? 8 : 0), marginRight: (index === props.tags.length - 1 ? 0 : 8), backgroundColor: props.background}]}>
                    <Text style={{color: COLORS.secondary_content, fontSize: props.fontSize}}>{item.toUpperCase()}</Text>
                </View>
            )
        }}></FlatList>
    )
}

export default Tags