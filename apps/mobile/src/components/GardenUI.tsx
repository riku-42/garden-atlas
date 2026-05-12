import type { ReactNode } from "react";
import { Link } from "expo-router";
import type { Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PlantEntry } from "@garden-atlas/shared";
import { colors, styles } from "../styles";
import { PlantVisual } from "./PlantVisual";

export function TopBar({ title, backHref = "/" }: { title: string; backHref?: Href }) {
  return (
    <View style={uiStyles.topBar}>
      <Link href={backHref} asChild>
        <Pressable style={uiStyles.iconButton}>
          <Text style={uiStyles.iconText}>‹</Text>
        </Pressable>
      </Link>
      <Text style={styles.screenTitle}>{title}</Text>
      <View style={uiStyles.iconButtonGhost} />
    </View>
  );
}

export function ActionLink({ href, label, primary = false }: { href: Href; label: string; primary?: boolean }) {
  return (
    <Link href={href} asChild>
      <Pressable style={primary ? styles.primaryButton : styles.secondaryButton}>
        <Text style={primary ? styles.primaryButtonText : styles.secondaryButtonText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

export function PaperCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function AtlasCard({ entry }: { entry: PlantEntry }) {
  return (
    <View style={uiStyles.atlasCard}>
      <Text style={uiStyles.specimenTitle}>{entry.commonName}</Text>
      <Text style={styles.smallText}>{entry.speciesName} · {entry.publicLocationLabel ?? entry.locationName}</Text>
      <View style={uiStyles.atlasVisual}>
        <PlantVisual variant={entry.id} height={210} />
      </View>
      <View style={styles.pillRow}>
        <Text style={styles.pill}>花期 12月-4月</Text>
        <Text style={styles.pill}>{entry.styleMode.replaceAll("_", " ")}</Text>
      </View>
      <View style={uiStyles.lineRow}>
        <View style={uiStyles.lineDrawing} />
        <View style={uiStyles.lineDrawing} />
        <View style={uiStyles.lineDrawing} />
        <View style={uiStyles.lineDrawing} />
      </View>
    </View>
  );
}

export function GalleryTile({ entry }: { entry: PlantEntry }) {
  return (
    <Link href="/detail" asChild>
      <Pressable style={uiStyles.galleryTile}>
        <PlantVisual variant={entry.id} height={104} />
        <View style={uiStyles.galleryCopy}>
          <Text style={uiStyles.galleryTitle}>{entry.commonName}</Text>
          <Text style={styles.smallText} numberOfLines={1}>{entry.speciesName}</Text>
          <Text style={styles.smallText}>{entry.publicLocationLabel ?? entry.locationName}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

export function SectionLabel({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={uiStyles.sectionLabel}>
      <Text style={uiStyles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.smallText}>{subtitle}</Text> : null}
    </View>
  );
}

const uiStyles = StyleSheet.create({
  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ivory
  },
  iconButtonGhost: {
    width: 40,
    height: 40
  },
  iconText: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 32
  },
  atlasCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    padding: 18,
    shadowColor: "#303a2a",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2
  },
  specimenTitle: {
    color: colors.ink,
    fontSize: 31,
    fontWeight: "700"
  },
  atlasVisual: {
    marginVertical: 16,
    borderRadius: 22,
    overflow: "hidden"
  },
  lineRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12
  },
  lineDrawing: {
    flex: 1,
    height: 42,
    borderBottomWidth: 2,
    borderColor: "#9e947e",
    borderRadius: 40
  },
  galleryTile: {
    flex: 1,
    minWidth: "47%",
    overflow: "hidden",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    marginBottom: 12
  },
  galleryCopy: {
    padding: 10
  },
  galleryTitle: {
    color: colors.ink,
    fontWeight: "800",
    marginBottom: 2
  },
  sectionLabel: {
    marginTop: 18,
    marginBottom: 10
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800"
  }
});
