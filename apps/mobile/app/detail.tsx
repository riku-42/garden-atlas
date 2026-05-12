import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ActionLink, PaperCard, TopBar } from "../src/components/GardenUI";
import { PlantVisual } from "../src/components/PlantVisual";
import { Screen } from "../src/components/Screen";
import { usePrototypeStore } from "../src/domain/PrototypeStore";
import { styles } from "../src/styles";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { entries, getEntry } = usePrototypeStore();
  const entry = getEntry(id) ?? entries[0];
  const locationHref = { pathname: "/location", params: { id: entry.id } } as const;
  const shareHref = { pathname: "/share", params: { id: entry.id } } as const;

  return (
    <Screen>
      <TopBar title="详情" backHref="/gallery" />
      <PaperCard>
        <View style={styles.row}>
          <View style={{ width: 78, height: 78, overflow: "hidden", borderRadius: 18 }}>
            <PlantVisual imageUri={entry.originalImageUrl} variant={entry.id} height={78} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{entry.commonName}</Text>
            <Text style={styles.smallText}>{entry.speciesName}</Text>
          </View>
        </View>
      </PaperCard>
      <PaperCard>
        <Text style={styles.cardTitle}>记录信息</Text>
        <Text style={styles.smallText}>拍摄时间 · {new Date(entry.capturedAt).toLocaleDateString("zh-CN")}</Text>
        <Text style={styles.smallText}>拍摄地点 · {entry.locationName}</Text>
        <Text style={styles.smallText}>{entry.notes}</Text>
        <View style={styles.pillRow}>
          {entry.tags.map((tag) => (
            <Text style={styles.pill} key={tag}>{tag}</Text>
          ))}
        </View>
      </PaperCard>
      <PlantVisual imageUri={entry.originalImageUrl} variant={entry.id} height={170} />
      <ActionLink href={locationHref} label="编辑位置" />
      <ActionLink href={shareHref} label="分享图鉴" primary />
    </Screen>
  );
}
