import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ActionLink, AtlasCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { usePrototypeStore } from "../src/domain/PrototypeStore";
import { colors, styles } from "../src/styles";

export default function Share() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { entries, getEntry } = usePrototypeStore();
  const entry = getEntry(id) ?? entries[0];
  const detailHref = { pathname: "/detail", params: { id: entry.id } } as const;

  return (
    <Screen>
      <TopBar title="分享图鉴" backHref={detailHref} />
      <AtlasCard entry={entry} />
      <Text style={[styles.cardTitle, { marginTop: 18 }]}>导出格式</Text>
      <View style={shareStyles.formats}>
        <View style={shareStyles.format}><Text style={shareStyles.formatText}>方形{"\n"}社交卡</Text></View>
        <View style={shareStyles.format}><Text style={shareStyles.formatText}>故事{"\n"}9:16</Text></View>
        <View style={shareStyles.format}><Text style={shareStyles.formatText}>海报{"\n"}打印</Text></View>
      </View>
      <ActionLink href={detailHref} label="保存海报" primary />
    </Screen>
  );
}

const shareStyles = StyleSheet.create({
  formats: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12
  },
  format: {
    flex: 1,
    minHeight: 84,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    alignItems: "center",
    justifyContent: "center"
  },
  formatText: {
    textAlign: "center",
    color: colors.ink,
    fontWeight: "800"
  }
});
