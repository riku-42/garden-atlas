import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Location() {
  return (
    <Screen>
      <Text style={styles.title}>选择位置</Text>
      <View style={styles.card}>
        <Text>浙江省杭州市西湖区满觉陇路</Text>
        <Text>纬度 30.2475 / 经度 120.1215</Text>
      </View>
      <Link style={styles.link} href="/detail">确认</Link>
    </Screen>
  );
}
