import { mockEntries } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Share() {
  const entry = mockEntries[0];

  return (
    <Screen>
      <Text style={styles.title}>分享图鉴</Text>
      <View style={styles.card}>
        <Text>{entry.commonName}</Text>
        <Text>方形社交卡 / 故事 / 打印海报</Text>
      </View>
      <Link style={styles.link} href="/detail">返回详情</Link>
    </Screen>
  );
}
