import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from "react-native";

const getTheme = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('theme')
      const jsonValue = JSON.parse(stringValue)
      if (!jsonValue) return
      console.log("THEME FROM GET DATA")
      console.log(jsonValue)
      let colors
      switch (jsonValue) {
        case 'Light':
            colors = LightTheme;
            break;
        case 'Dark':
            colors = DarkTheme;
            break;
        default: 
        colors = DarkTheme;
            break
    }
    let styles = getStyles(colors)

    theme = {
        COLORS: colors,
        STYLES: styles
    }
    return theme
    
    } catch(e) {
      console.log("Error getting theme data")
      console.log(e)
    }
  }

  const LightTheme = {
    back_dark: "#fff",
    back: "#ECEDF0",
    back_light: "#CED2DA",

    content: "#42526E",
    primary_content: "#42526E",
    secondary_content: "#939dad",

    primary_accent: "#4CBBE9",
    secondary_accent: "#E94C4C",

    // School
    school: {
        evocation: "#ef5c3e",
        abjuration: "#88b9ed",
        enchantment: "#E94CE0",
        conjuration: "#e88636",
        necromancy: "#b0f389",
        transmutation: "#f2a261",
        divination: "#91acbd",
        illusion: "#b98cfc"
    },
}


const DarkTheme = {
        back_dark: "#181D23",
        back: "#373C48",
        back_light: "#545A67",

        content: "#FFFFFF",
        primary_content: "#FFFFFF",
        secondary_content: "#CCD2E3",

        primary_accent: "#4CBBE9",
        secondary_accent: "#E94C4C",

        // School
        school: {
            evocation: "#ef5c3e",
            abjuration: "#88b9ed",
            enchantment: "#E94CE0",
            conjuration: "#e88636",
            necromancy: "#b0f389",
            transmutation: "#f2a261",
            divination: "#91acbd",
            illusion: "#b98cfc"
        },
    }

    const getStyles = (COLORS) => {return StyleSheet.create({
        Background: {
            backgroundColor: COLORS.back_dark,
            height: '100%',
            width: "100%",
        },
        Container: {
            marginTop: 10,
            marginBottom: 247,
            width: "88%",
            alignSelf: "center",
        },
        Modal: {
            backgroundColor: COLORS.back,
            borderRadius: 15,
            padding: 20
        },
        Header1: {
            color: COLORS.primary_content,
            fontSize: 40,
            fontWeight: "bold"
        },
        Header2: {
            color: COLORS.primary_content,
            fontSize: 30,
            fontWeight: "bold"
        },
        Header3: {
            color: COLORS.primary_content,
            fontSize: 21,
            fontWeight: "bold"
        },
        Header4: {
            color: COLORS.primary_content,
            fontSize: 18,
            fontWeight: "bold"
        },
        ContentBody: {
            fontSize: 18,
            color: COLORS.secondary_content
        },
        Note: {
            fontSize: 15,
            fontWeight: "bold",
        },
        PrimaryButton: {
            color: COLORS.primary_content,
            borderRadius: 15, 
            paddingHorizontal: 30,
            paddingVertical: 15,
            backgroundColor: COLORS.primary_accent
        },
        SecondaryButton: {
            color: COLORS.secondary_content,
            borderColor: COLORS.secondary_content,
            borderWidth: 3,
            borderRadius: 15, 
            paddingHorizontal: 30,
            paddingVertical: 15,
        },
        TertiaryButton: {
            color: COLORS.primary_content,
            paddingHorizontal: 30,
            paddingVertical: 15,
        },
        Tags: {
            backgroundColor: COLORS.back_light,
            color: COLORS.secondary_content,
            borderRadius: 8,
            paddingHorizontal: 9,
            paddingVertical: 3,
            alignSelf: "baseline"
        },
        Input: {
            borderWidth: 1,
            backgroundColor: COLORS.back,
            borderColor: COLORS.back,
            color: COLORS.secondary_content,
            borderRadius: 12,
            fontSize: 15,
            paddingLeft: 17,
            width: "80%",
            height: 40
        },
        Removable: {
            borderWidth: 3,
            borderColor: COLORS.primary_accent,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 3,
            marginHorizontal: 5, 
            marginVertical: 3,
            alignSelf: "baseline"
        }
    })}

export {getTheme, getStyles, DarkTheme, LightTheme}