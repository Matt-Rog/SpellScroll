import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    Modal,
    ScrollView,
    Dimensions,
    Animated,
    
} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width, height} = Dimensions.get('screen')

import SpellList from './SpellList';
import AppStyles from './AppStyles';

const SlidingTab = (props) => {

    const scrollX = React.useRef(new Animated.Value(0)).current
    const ref = React.useRef()
    const onItemPress = React.useCallback(itemIndex => {
      ref?.current?.scrollToOffset({
        offset: itemIndex * width
      })
    })
    const data = Object.keys(props.data).map((i) => ({
      key: i,
      class: i,
      content: props.data[i],
      ref: React.createRef()
    }))

    const Tab = React.forwardRef(({item, onItemPress}, ref) => {
      return (
        <Pressable
          onPress={onItemPress}>
        <View style={{paddingVertical: 10, maxWidth: 150}}ref={ref}>
          <Text adjustsFontSizeToFit={true} numberOfLines={1}style={[AppStyles.Header4, (data.length>5 ? {fontSize: 100/data.length} : {})]}>{item.class}</Text>
        </View>
        </Pressable>
      )
    })

    const Indicator = ({measures, scrollX}) => {
      const inputRange = data.map((_, i) => i * width)
      const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(measure => measure.width)
      })
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(measure => measure.x)
      })
      return (
        <Animated.View 
          style={{
            height: 4, 
            width: indicatorWidth, 
            backgroundColor: props.color, 
            position: "absolute", 
            left: 0,
            bottom: 0, 
            transform: [{
              translateX
            }]}}>
        </Animated.View>
      )
    }

    const Tabs = ({data, scrollX, onItemPress}) => {
      const [measures, setMeasures] = React.useState([])
      const containerRef = React.useRef()
      React.useEffect(() => {
        const m = []
        data.forEach(item => {
          item.ref.current.measureLayout(containerRef.current, (x,y,width,height) => {
            m.push({
              x,y,width,height
            })

            if(m.length === data.length){
              setMeasures(m)
            }
          })
        })
      })
      return (
        <View style={{marginVertical: 15}}>
          <View  ref={containerRef} style={{flexDirection: "row", justifyContent: "space-evenly"}}>
            {data.map((item,index) => {
              return <Tab key={item.key}  item={item} ref={item.ref} onItemPress={() => onItemPress(index)}/>
           })}
          </View>
          {measures.length>0 && (
            <Indicator measures={measures} scrollX={scrollX}/>
          )}
        </View>

      )
    }

    return (
        <View style={{width: width}}>
          <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress}/>
          <Animated.FlatList
            ref={ref}
            data={data}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={true}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false}
            )}
            renderItem={({item})=> {
              return(
                <View style={{width: width}}>
                    {item.content}
                </View>
              )
            }}
          />
        </View>
    )


}

export default SlidingTab