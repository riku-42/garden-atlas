import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { uiCopy } from "@garden-atlas/shared";
import { RecommendationDeck } from "../src/components/RecommendationDeck";
import { Screen } from "../src/components/Screen";
import { colors, styles } from "../src/styles";

export default function Home() {
  return (
    <Screen>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.brand}>{uiCopy.brand.zh}</Text>
          <Text style={styles.subtitle}>{uiCopy.home.tagline}</Text>
        </View>
        <Link href="/recommendation-settings" asChild>
          <Pressable style={homeStyles.profileButton}>
            <Text style={homeStyles.profileText}>设</Text>
          </Pressable>
        </Link>
      </View>
      <RecommendationDeck />
      <View style={homeStyles.quickGrid}>
        <Link href="/capture" asChild>
          <Pressable style={homeStyles.captureCard}>
            <Text style={homeStyles.captureIcon}>□</Text>
            <View>
              <Text style={styles.cardTitle}>{uiCopy.home.captureTitle}</Text>
              <Text style={styles.smallText}>{uiCopy.home.captureSubtitle}</Text>
            </View>
          </Pressable>
        </Link>
        <Link href="/gallery" asChild>
          <Pressable style={homeStyles.squareCard}>
            <Text style={styles.cardTitle}>{uiCopy.home.gallery}</Text>
            <Text style={styles.smallText}>查看所有图鉴</Text>
          </Pressable>
        </Link>
        <Link href="/gallery" asChild>
          <Pressable style={homeStyles.squareCard}>
            <Text style={styles.cardTitle}>{uiCopy.home.favorites}</Text>
            <Text style={styles.smallText}>收藏的植物</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const homeStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16
  },
  brand: {
    color: colors.ink,
    fontSize: 43,
    lineHeight: 50,
    fontWeight: "800"
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    alignItems: "center",
    justifyContent: "center"
  },
  profileText: {
    color: colors.ink,
    fontWeight: "800"
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 18
  },
  captureCard: {
    width: "100%",
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  captureIcon: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.moss,
    color: colors.ivory,
    textAlign: "center",
    lineHeight: 46,
    fontSize: 24
  },
  squareCard: {
    flex: 1,
    minHeight: 112,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    padding: 16,
    justifyContent: "flex-end"
  }
});
