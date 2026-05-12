import { StyleSheet, Text, View } from "react-native";
import { uiCopy } from "@garden-atlas/shared";
import { ActionLink, PaperCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { colors, styles } from "../src/styles";

export default function RecommendationSettings() {
  return (
    <Screen>
      <TopBar title="推荐设置" />
      <PaperCard>
        <Text style={styles.cardTitle}>{uiCopy.recommendation.optInTitle}</Text>
        <Text style={styles.smallText}>{uiCopy.recommendation.optInBody}</Text>
        <View style={settingsStyles.toggle}>
          <View style={settingsStyles.knob} />
        </View>
      </PaperCard>
      <PaperCard>
        <Text style={styles.cardTitle}>{uiCopy.recommendation.privateDefault}</Text>
        <Text style={styles.smallText}>每张图鉴保存后默认为私密。你可以单独选择设为可推荐。</Text>
      </PaperCard>
      <PaperCard>
        <Text style={styles.cardTitle}>公开信息</Text>
        <Text style={styles.smallText}>生成图、植物名称、大致地点、标签和展示名。</Text>
      </PaperCard>
      <ActionLink href="/" label="返回首页" primary />
    </Screen>
  );
}

const settingsStyles = StyleSheet.create({
  toggle: {
    width: 66,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.moss,
    alignSelf: "flex-end",
    padding: 4,
    marginTop: 16,
    alignItems: "flex-end"
  },
  knob: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.ivory
  }
});
