import { StyleSheet, Text, View } from "react-native";
import { GalleryTile, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { usePrototypeStore } from "../src/domain/PrototypeStore";
import { colors, styles } from "../src/styles";

export default function Gallery() {
  const { entries } = usePrototypeStore();

  return (
    <Screen>
      <TopBar title="图鉴全览" />
      <View style={galleryStyles.filters}>
        <Text style={[styles.pill, galleryStyles.active]}>全部</Text>
        <Text style={styles.pill}>已识别</Text>
        <Text style={styles.pill}>未识别</Text>
        <Text style={styles.pill}>收藏</Text>
      </View>
      <View style={galleryStyles.grid}>
        {entries.map((entry) => (
          <GalleryTile
            entry={entry}
            href={{ pathname: "/detail", params: { id: entry.id } }}
            key={entry.id}
          />
        ))}
      </View>
    </Screen>
  );
}

const galleryStyles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14
  },
  active: {
    backgroundColor: "#e8f0dc",
    borderColor: colors.moss
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  }
});
