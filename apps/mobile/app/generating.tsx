import { useEffect } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { uiCopy } from "@garden-atlas/shared";
import { Screen } from "../src/components/Screen";
import { colors, styles } from "../src/styles";

export default function Generating() {
  useEffect(() => {
    const id = setTimeout(() => router.replace("/result"), 1800);
    return () => clearTimeout(id);
  }, []);

  return (
    <Screen dark>
      <View style={genStyles.ring}>
        <Text style={genStyles.percent}>64%</Text>
      </View>
      <Text style={genStyles.title}>正在生成植物图鉴</Text>
      <Text style={genStyles.subtitle}>这通常需要几秒钟</Text>
      <View style={genStyles.list}>
        {uiCopy.generation.map((item) => (
          <View style={styles.card} key={item}>
            <Text style={styles.cardTitle}>{item}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const genStyles = StyleSheet.create({
  ring: {
    width: 160,
    height: 160,
    borderRadius: 999,
    borderWidth: 14,
    borderColor: "rgba(255,250,240,0.24)",
    borderTopColor: colors.ivory,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 72,
    marginBottom: 28
  },
  percent: {
    color: colors.ivory,
    fontSize: 34,
    fontWeight: "800"
  },
  title: {
    color: colors.ivory,
    textAlign: "center",
    fontSize: 27,
    fontWeight: "800"
  },
  subtitle: {
    color: "rgba(255,250,240,0.74)",
    textAlign: "center",
    marginTop: 8
  },
  list: {
    marginTop: 32
  }
});
