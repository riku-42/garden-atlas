import { StyleSheet, View } from "react-native";

export function PlantVisual() {
  return <View style={styles.visual} />;
}

const styles = StyleSheet.create({
  visual: {
    minHeight: 260,
    borderRadius: 24,
    backgroundColor: "#36552d",
    borderWidth: 1,
    borderColor: "#e2dac7"
  }
});
