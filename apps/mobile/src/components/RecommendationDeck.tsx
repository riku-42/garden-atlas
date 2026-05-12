import { useMemo, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { getRecommendableEntries, uiCopy } from "@garden-atlas/shared";
import { colors, styles } from "../styles";
import { PlantVisual } from "./PlantVisual";

export function RecommendationDeck() {
  const entries = useMemo(() => getRecommendableEntries(), []);
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const current = entries[index % entries.length];

  function advance(direction: "left" | "right") {
    const toValue = direction === "right" ? 460 : -460;
    Animated.timing(position, {
      toValue: { x: toValue, y: 0 },
      duration: 160,
      useNativeDriver: false
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setIndex((value) => value + 1);
    });
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 14,
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 90) {
          advance("right");
        } else if (gesture.dx < -90) {
          advance("left");
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }).start();
        }
      }
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-220, 0, 220],
    outputRange: ["-5deg", "0deg", "5deg"]
  });

  return (
    <View style={deckStyles.wrap}>
      <View style={styles.row}>
        <View>
          <Text style={deckStyles.title}>{uiCopy.home.coverTitle}</Text>
          <Text style={styles.smallText}>{uiCopy.home.coverHint}</Text>
        </View>
        <Text style={deckStyles.infinity}>∞</Text>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[deckStyles.card, { transform: [{ translateX: position.x }, { rotate }] }]}
      >
        <PlantVisual variant={current.id} height={340} />
        <View style={deckStyles.copy}>
          <Text style={deckStyles.plantName}>{current.commonName}</Text>
          <Text style={deckStyles.plantMeta}>{current.speciesName} · {current.publicLocationLabel}</Text>
          <Text style={deckStyles.plantMeta}>来自 {current.ownerDisplayName}</Text>
        </View>
      </Animated.View>
      <View style={deckStyles.actions}>
        <Pressable style={deckStyles.passButton} onPress={() => advance("left")}>
          <Text style={deckStyles.passText}>{uiCopy.recommendation.pass}</Text>
        </Pressable>
        <Pressable style={deckStyles.likeButton} onPress={() => advance("right")}>
          <Text style={deckStyles.likeText}>{uiCopy.recommendation.like}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const deckStyles = StyleSheet.create({
  wrap: {
    marginTop: 24
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800"
  },
  infinity: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: "800"
  },
  card: {
    marginTop: 12,
    height: 340,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: colors.forest,
    shadowColor: colors.forest,
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 4
  },
  copy: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18
  },
  plantName: {
    color: colors.ivory,
    fontSize: 30,
    fontWeight: "800"
  },
  plantMeta: {
    color: "rgba(255,253,246,0.78)",
    fontSize: 13,
    marginTop: 2
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14
  },
  passButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.ivory,
    alignItems: "center",
    justifyContent: "center"
  },
  passText: {
    color: colors.ink,
    fontWeight: "800"
  },
  likeButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: colors.moss,
    alignItems: "center",
    justifyContent: "center"
  },
  likeText: {
    color: colors.ivory,
    fontWeight: "800"
  }
});
