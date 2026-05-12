import { Image, StyleSheet, View } from "react-native";
import { colors } from "../styles";

type PlantVisualProps = {
  imageUri?: string | null;
  variant?: string;
  height?: number;
};

const palettes: Record<string, { petal: string; center: string; leaf: string; base: string }> = {
  entry_camellia: { petal: "#fffdf5", center: "#e7ca72", leaf: "#5f8147", base: "#193119" },
  entry_hydrangea: { petal: "#eeb8cf", center: "#b17695", leaf: "#64824b", base: "#203a22" },
  entry_lavender: { petal: "#c5b6f0", center: "#7d6dc0", leaf: "#667f50", base: "#21381f" },
  entry_rose: { petal: "#f2d265", center: "#d49941", leaf: "#78894b", base: "#243a21" },
  entry_fern: { petal: "#9fce7c", center: "#6c9a5a", leaf: "#55744b", base: "#1c311f" },
  entry_lotus: { petal: "#f1b3ca", center: "#e0c067", leaf: "#577b55", base: "#1a3325" }
};

export function PlantVisual({ imageUri, variant = "entry_camellia", height = 260 }: PlantVisualProps) {
  if (isDisplayableUri(imageUri)) {
    return (
      <Image
        resizeMode="cover"
        source={{ uri: imageUri }}
        style={[visualStyles.visual, { height }]}
      />
    );
  }

  const palette = palettes[variant] ?? palettes.entry_camellia;

  return (
    <View style={[visualStyles.visual, { height, backgroundColor: palette.base }]}>
      <View style={[visualStyles.leaf, visualStyles.leafLeft, { backgroundColor: palette.leaf }]} />
      <View style={[visualStyles.leaf, visualStyles.leafRight, { backgroundColor: palette.leaf }]} />
      <View style={[visualStyles.bloom, { backgroundColor: palette.petal }]}>
        <View style={[visualStyles.center, { backgroundColor: palette.center }]} />
      </View>
      <View style={visualStyles.shadow} />
    </View>
  );
}

function isDisplayableUri(uri?: string | null): uri is string {
  return Boolean(uri && /^(asset|content|file|https?):\/\//.test(uri));
}

const visualStyles = StyleSheet.create({
  visual: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 253, 246, 0.34)"
  },
  leaf: {
    position: "absolute",
    width: 160,
    height: 96,
    borderTopLeftRadius: 90,
    borderBottomRightRadius: 90,
    opacity: 0.86
  },
  leafLeft: {
    left: 26,
    bottom: 66,
    transform: [{ rotate: "-24deg" }]
  },
  leafRight: {
    right: 18,
    bottom: 72,
    transform: [{ rotate: "32deg" }]
  },
  bloom: {
    position: "absolute",
    left: "50%",
    top: "26%",
    width: 118,
    height: 118,
    marginLeft: -59,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.ivory,
    shadowOpacity: 0.26,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 }
  },
  center: {
    width: 34,
    height: 34,
    borderRadius: 999
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: "rgba(10, 18, 10, 0.34)"
  }
});
