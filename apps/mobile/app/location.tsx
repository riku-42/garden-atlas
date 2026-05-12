import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ActionLink, PaperCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { usePrototypeStore } from "../src/domain/PrototypeStore";
import { colors, styles } from "../src/styles";

export default function Location() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { entries, getEntry } = usePrototypeStore();
  const entry = getEntry(id) ?? entries[0];
  const detailHref = { pathname: "/detail", params: { id: entry.id } } as const;

  return (
    <Screen>
      <TopBar title="选择位置" backHref={detailHref} />
      <Text style={locationStyles.search}>⌕ 搜索地点</Text>
      <View style={locationStyles.map}>
        <View style={locationStyles.pin} />
      </View>
      <PaperCard>
        <Text style={styles.cardTitle}>已选择位置</Text>
        <Text style={styles.smallText}>{entry.locationName}</Text>
        <Text style={styles.smallText}>纬度 {entry.latitude ?? "未记录"} / 经度 {entry.longitude ?? "未记录"}</Text>
      </PaperCard>
      <ActionLink href={detailHref} label="确认" primary />
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
