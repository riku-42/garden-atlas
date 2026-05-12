import { uiCopy } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Generating() {
  return (
    <Screen>
      <Text style={styles.title}>正在生成植物图鉴</Text>
      {uiCopy.generation.map((item) => (
        <View key={item} style={styles.card}>
          <Text>{item}</Text>
        </View>
      ))}
      <Link style={styles.link} href="/result">查看结果</Link>
    </Screen>
  );
}
