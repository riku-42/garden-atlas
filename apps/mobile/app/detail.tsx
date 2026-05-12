import { mockEntries } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Detail() {
  const entry = mockEntries[0];

  return (
    <Screen>
      <Text style={styles.title}>详情</Text>
      <View style={styles.card}>
        <Text>{entry.commonName}</Text>
        <Text>{entry.notes}</Text>
        <Text>{entry.locationName}</Text>
      </View>
      <Link style={styles.link} href="/location">编辑位置</Link>
      <Link style={styles.link} href="/share">分享图鉴</Link>
    </Screen>
  );
}
