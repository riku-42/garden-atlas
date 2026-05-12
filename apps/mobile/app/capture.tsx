import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/styles";

export default function Capture() {
  return (
    <Screen dark padded={false}>
      <View style={captureStyles.root}>
        <View style={captureStyles.top}>
          <Link href="/" asChild>
            <Pressable style={captureStyles.darkButton}>
              <Text style={captureStyles.darkButtonText}>×</Text>
            </Pressable>
          </Link>
          <View style={captureStyles.darkButton}>
            <Text style={captureStyles.darkButtonText}>⚡</Text>
          </View>
        </View>
        <View style={captureStyles.focusBox} />
        <View style={captureStyles.footer}>
          <View style={captureStyles.controls}>
            <View style={captureStyles.sideControl}>
              <Text style={captureStyles.controlIcon}>□</Text>
              <Text style={captureStyles.controlText}>相册</Text>
            </View>
            <Link href="/generating" asChild>
              <Pressable style={captureStyles.shutter} />
            </Link>
            <View style={captureStyles.sideControl}>
              <Text style={captureStyles.controlIcon}>◎</Text>
              <Text style={captureStyles.controlText}>识别历史</Text>
            </View>
          </View>
          <View style={captureStyles.tabs}>
            <Text style={captureStyles.activeTab}>拍照</Text>
            <Text style={captureStyles.inactiveTab}>从相册选择</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const captureStyles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 780,
    backgroundColor: colors.forest
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 22,
    paddingTop: 30
  },
  darkButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center"
  },
  darkButtonText: {
    color: colors.ivory,
    fontSize: 22,
    fontWeight: "800"
  },
  focusBox: {
    position: "absolute",
    left: 28,
    right: 28,
    top: 118,
    bottom: 190,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)"
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    backgroundColor: "rgba(5,10,5,0.7)"
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sideControl: {
    alignItems: "center",
    gap: 6,
    width: 80
  },
  controlIcon: {
    color: colors.ivory,
    fontSize: 24
  },
  controlText: {
    color: colors.ivory,
    fontSize: 12
  },
  shutter: {
    width: 78,
    height: 78,
    borderRadius: 999,
    borderWidth: 5,
    borderColor: colors.ivory
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
    marginTop: 20
  },
  activeTab: {
    color: "#d9e9c4",
    fontWeight: "800"
  },
  inactiveTab: {
    color: "rgba(255,255,255,0.64)"
  }
});
