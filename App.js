import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Lane from './components/Lane';

export default function App() {
  const [isTimer, setIsTimer] = useState(false);
  const toggleSwitch = () => setIsTimer(previousState => !previousState);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Lane lane="Top" firstSummoner="teleport" isTimer={isTimer} />
        <Lane lane="Jungle" firstSummoner="smite" isTimer={isTimer} />
        <Lane lane="Mid" firstSummoner="ignite" isTimer={isTimer} />
        <Lane lane="Adc" firstSummoner="heal" isTimer={isTimer} />
        <Lane lane="Support" firstSummoner="exhaust" isTimer={isTimer} />
      </View>
      <View style={styles.container2}>
        <Switch
          trackColor={{ false: "gray", true: "gray" }}
          thumbColor={isTimer ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isTimer}
        />
        <Text>{isTimer ? "Timer Mode" : "Select Mode"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D8DCD6',
  },
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
