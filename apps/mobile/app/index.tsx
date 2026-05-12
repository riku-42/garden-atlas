import { mockEntries, uiCopy } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { PlantVisual } from "../src/components/PlantVisual";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Home() {
  const entry = mockEntries[0];

  return (
    <Screen>
      <Text style={styles.title}>{uiCopy.brand.zh}</Text>
      <Text style={styles.subtitle}>{uiCopy.home.tagline}</Text>
      <View style={styles.card}>
        <Text>{uiCopy.home.coverTitle}</Text>
        <Text>{entry.commonName} · {entry.speciesName}</Text>
        <PlantVisual />
      </View>
      <Link style={styles.link} href="/capture">拍照识别植物</Link>
      <Link style={styles.link} href="/gallery">图鉴全览</Link>
      <Link style={styles.link} href="/recommendation-settings">推荐设置</Link>
    </Screen>
  );
}
