import { mockEntries } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { PlantVisual } from "../src/components/PlantVisual";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Result() {
  const entry = mockEntries[0];

  return (
    <Screen>
      <Text style={styles.title}>{entry.commonName}</Text>
      <Text style={styles.subtitle}>{entry.speciesName}</Text>
      <View style={styles.card}>
        <PlantVisual />
      </View>
      <Link style={styles.link} href="/detail">保存图鉴</Link>
      <Link style={styles.link} href="/share">分享</Link>
    </Screen>
  );
}
