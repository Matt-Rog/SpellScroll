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
            images = LightImages
            break;
        case 'Dark':
            colors = DarkTheme;
            images = DarkImages
            break;
        default: 
        colors = DarkTheme;
        images = DarkImages
            break
    }
    let styles = getStyles(colors)

    theme = {
        COLORS: colors,
        STYLES: styles,
        IMAGES: images
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
    back_light: "#d9dce3",

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
            fontFamily: 'BreatheFireIii-PKLOB'
        },
        Header2: {
            color: COLORS.primary_content,
            fontSize: 35,
            fontFamily: "BreatheFireIii-PKLOB"
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

    const DarkImages = {
        school: {
            abjuration: require('../../assets/abjuration.png'),
            conjuration: require('../../assets/conjuration.png'),
            divination: require('../../assets/divination.png'),
            enchantment: require('../../assets/enchantment.png'),
            illusion: require('../../assets/illusion.png'),
            evocation: require('../../assets/evocation.png'),
            necromancy: require('../../assets/necromancy.png'),
            transmutation: require('../../assets/transmutation.png'),
        },
        icon: {
            blacksmith: require('../../assets/blacksmith.png'),
            warlock: require('../../assets/warlock.png'),
            warrior1: require('../../assets/warrior1.png'),
            warrior2: require('../../assets/warrior2.png'),
            druid: require('../../assets/druid.png'),
            cleric: require('../../assets/cleric.png'),
            bard: require('../../assets/bard.png'),
            genie: require('../../assets/genie.png'),
            hat: require('../../assets/hat.png'),
            wizard: require('../../assets/wizard.png'),
            orc: require('../../assets/orc.png'),
            elf1: require('../../assets/elf1.png'),
            elf2: require('../../assets/elf2.png'),
            gnome: require('../../assets/gnome.png'),
            faun: require('../../assets/faun.png')
        }, 
        splash: {
            default: require('../../assets/default-splash.png'),
            red_dragon: require('../../assets/red-dragon.png'),
            green_dragon: require('../../assets/green-dragon.png'),
            blue_wizard: require('../../assets/blue-wizard.png'),
            spell_scroll: require('../../assets/spell-scroll.png')
        }
    };

    const LightImages = {
        school: {
            abjuration: require('../../assets/l-abjuration.png'),
            conjuration: require('../../assets/l-conjuration.png'),
            divination: require('../../assets/l-divination.png'),
            enchantment: require('../../assets/l-enchantment.png'),
            illusion: require('../../assets/l-illusion.png'),
            evocation: require('../../assets/l-evocation.png'),
            necromancy: require('../../assets/l-necromancy.png'),
            transmutation: require('../../assets/l-transmutation.png'),
        },
        icon: {
            blacksmith: require('../../assets/blacksmith.png'),
            warlock: require('../../assets/warlock.png'),
            warrior1: require('../../assets/warrior1.png'),
            warrior2: require('../../assets/warrior2.png'),
            druid: require('../../assets/druid.png'),
            cleric: require('../../assets/cleric.png'),
            bard: require('../../assets/bard.png'),
            genie: require('../../assets/genie.png'),
            hat: require('../../assets/hat.png'),
            wizard: require('../../assets/wizard.png'),
            orc: require('../../assets/orc.png'),
            elf1: require('../../assets/elf1.png'),
            elf2: require('../../assets/elf2.png'),
            gnome: require('../../assets/gnome.png'),
            faun: require('../../assets/faun.png')
        }, 
        splash: {
            default: require('../../assets/default-splash.png'),
            red_dragon: require('../../assets/red-dragon.png'),
            green_dragon: require('../../assets/green-dragon.png'),
            blue_wizard: require('../../assets/blue-wizard.png'),
            spell_scroll: require('../../assets/spell-scroll.png')
        }
    };

export {getTheme, getStyles, DarkTheme, DarkImages, LightTheme}