import { uiCopy } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function RecommendationSettings() {
  return (
    <Screen>
      <Text style={styles.title}>推荐设置</Text>
      <View style={styles.card}>
        <Text>{uiCopy.recommendation.optInTitle}</Text>
        <Text>{uiCopy.recommendation.optInBody}</Text>
      </View>
      <Link style={styles.link} href="/">返回首页</Link>
    </Screen>
  );
}
