import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import sqlite from 'react-native-sqlite-storage';

const db = sqlite.openDatabase(
  {
    name: 'sample-spells',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const getData = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name, level, school FROM Spells",
        [],
        (tx, results) => {
          var len = results.rows
          if (len > 0) {
            var spellName = results.rows.item(0).name;
            var level = results.rows.item(0).level;
            var school = results.rows.item(0).school;
          }
        }
      )
    })
  }
  catch {
    error => { console.log(error) }
  }
}

export default function Search() {

  return (
    <View style={styles.container}>
      <Text>Dummy db populated :)</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
