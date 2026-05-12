import { Link } from "expo-router";
import { Text } from "react-native";
import { Screen } from "../src/components/Screen";
import { styles } from "../src/styles";

export default function Capture() {
  return (
    <Screen>
      <Text style={styles.title}>拍照</Text>
      <Text style={styles.subtitle}>Camera and image picker integration placeholders live here.</Text>
      <Link style={styles.link} href="/generating">模拟拍照并生成</Link>
      <Link style={styles.link} href="/">返回首页</Link>
    </Screen>
  );
}
