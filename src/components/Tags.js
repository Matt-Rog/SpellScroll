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
            renderItem={({item}) => {
            return (
                <View style={[AppStyles.Tags, {marginTop: 10, marginRight: 8, backgroundColor: props.background}]}>
                    <Text style={{color: COLORS.secondary_content}}>{item.toUpperCase()}</Text>
                </View>
            )
        }}></FlatList>
    )
}

export default Tags