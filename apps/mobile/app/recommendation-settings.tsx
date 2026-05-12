import { Pressable, StyleSheet, Text, View } from "react-native";
import { uiCopy } from "@garden-atlas/shared";
import { ActionLink, PaperCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { usePrototypeStore } from "../src/domain/PrototypeStore";
import { colors, styles } from "../src/styles";

export default function RecommendationSettings() {
  const { entries, reset, setSharing, settings, updateVisibility } = usePrototypeStore();
  const visibleEntries = entries.slice(0, 4);

  return (
    <Screen>
      <TopBar title="推荐设置" />
      <PaperCard>
        <Text style={styles.cardTitle}>{uiCopy.recommendation.optInTitle}</Text>
        <Text style={styles.smallText}>{uiCopy.recommendation.optInBody}</Text>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: settings.recommendationSharingEnabled }}
          onPress={() => setSharing(!settings.recommendationSharingEnabled)}
          style={[
            settingsStyles.toggle,
            !settings.recommendationSharingEnabled && settingsStyles.toggleOff
          ]}
        >
          <View
            style={[
              settingsStyles.knob,
              !settings.recommendationSharingEnabled && settingsStyles.knobOff
            ]}
          />
        </Pressable>
      </PaperCard>
      <PaperCard>
        <Text style={styles.cardTitle}>{uiCopy.recommendation.privateDefault}</Text>
        <Text style={styles.smallText}>每张图鉴保存后默认为私密。你可以单独选择设为可推荐。</Text>
      </PaperCard>
      <PaperCard>
        <Text style={styles.cardTitle}>可推荐图鉴</Text>
        <Text style={styles.smallText}>控制哪些植物会进入他人的封面植物滑动队列。</Text>
        <View style={settingsStyles.entryList}>
          {visibleEntries.map((entry) => {
            const isRecommendable = entry.visibility === "recommendable";
            return (
              <View key={entry.id} style={settingsStyles.entryRow}>
                <View>
                  <Text style={settingsStyles.entryName}>{entry.commonName}</Text>
                  <Text style={styles.smallText}>{entry.speciesName}</Text>
                </View>
                <Pressable
                  style={[settingsStyles.statusButton, isRecommendable && settingsStyles.statusButtonOn]}
                  onPress={() =>
                    updateVisibility(entry.id, isRecommendable ? "private" : "recommendable")
                  }
                >
                  <Text
                    style={[
                      settingsStyles.statusText,
                      isRecommendable && settingsStyles.statusTextOn
                    ]}
                  >
                    {isRecommendable ? "可推荐" : "私密"}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </PaperCard>
      <PaperCard>
        <Text style={styles.cardTitle}>公开信息</Text>
        <Text style={styles.smallText}>生成图、植物名称、大致地点、标签和展示名。</Text>
      </PaperCard>
      <Pressable style={settingsStyles.resetButton} onPress={reset}>
        <Text style={settingsStyles.resetText}>重置演示数据</Text>
      </Pressable>
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
  toggleOff: {
    backgroundColor: "#d8d8c8",
    alignItems: "flex-start"
  },
  knob: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.ivory
  },
  knobOff: {
    backgroundColor: colors.paper
  },
  entryList: {
    gap: 10,
    marginTop: 14
  },
  entryRow: {
    minHeight: 62,
    borderRadius: 16,
    backgroundColor: colors.paper,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  entryName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  statusButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.ivory
  },
  statusButtonOn: {
    borderColor: colors.moss,
    backgroundColor: colors.moss
  },
  statusText: {
    color: colors.ink,
    fontWeight: "800"
  },
  statusTextOn: {
    color: colors.ivory
  },
  resetButton: {
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  resetText: {
    color: colors.ink,
    fontWeight: "800"
  }
});
