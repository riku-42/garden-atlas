import { StyleSheet, Text, View } from "react-native";
import { ActionLink, PaperCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { colors, styles } from "../src/styles";

export default function Location() {
  return (
    <Screen>
      <TopBar title="选择位置" backHref="/detail" />
      <Text style={locationStyles.search}>⌕ 搜索地点</Text>
      <View style={locationStyles.map}>
        <View style={locationStyles.pin} />
      </View>
      <PaperCard>
        <Text style={styles.cardTitle}>已选择位置</Text>
        <Text style={styles.smallText}>浙江省杭州市西湖区满觉陇路</Text>
        <Text style={styles.smallText}>纬度 30.2475 / 经度 120.1215</Text>
      </PaperCard>
      <ActionLink href="/detail" label="确认" primary />
    </Screen>
  );
}

const locationStyles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    backgroundColor: colors.ivory,
    color: colors.muted,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14
  },
  map: {
    height: 350,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#e5e2d6",
    marginBottom: 14,
    overflow: "hidden"
  },
  pin: {
    position: "absolute",
    left: "52%",
    top: "45%",
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.moss
  }
});
