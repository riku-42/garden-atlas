import { mockEntries } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Gallery() {
  return (
    <Screen>
      <Text style={styles.title}>图鉴全览</Text>
      {mockEntries.map((entry) => (
        <View key={entry.id} style={styles.card}>
          <Text>{entry.commonName}</Text>
          <Text>{entry.speciesName}</Text>
        </View>
      ))}
      <Link style={styles.link} href="/detail">打开详情</Link>
    </Screen>
  );
}
