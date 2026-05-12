import { Link, router } from "expo-router";
import { useState } from "react";
import { Directory, File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { colors } from "../src/styles";

export default function Capture() {
  const [message, setMessage] = useState("将植物放在取景框中，拍照或从相册选择。");
  const [isPicking, setIsPicking] = useState(false);

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setMessage("需要相机权限才能拍摄植物。");
      return;
    }

    await pickImage(() =>
      ImagePicker.launchCameraAsync({
        allowsEditing: false,
        mediaTypes: ["images"],
        quality: 0.92
      })
    );
  }

  async function openLibrary() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setMessage("需要照片权限才能选择植物照片。");
      return;
    }

    await pickImage(() =>
      ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ["images"],
        quality: 0.92
      })
    );
  }

  async function pickImage(
    picker: () => Promise<ImagePicker.ImagePickerResult>
  ) {
    if (isPicking) {
      return;
    }

    setIsPicking(true);
    setMessage("正在打开照片来源...");

    try {
      const result = await picker();
      const asset = result.canceled ? null : result.assets[0];

      if (!asset) {
        setMessage("已取消选择。");
        return;
      }

      setMessage("正在保存植物照片...");
      const imageUri = await persistPickedImage(asset.uri);
      router.push({ pathname: "/generating", params: { imageUri } });
    } catch {
      setMessage("无法读取照片，请重试。");
    } finally {
      setIsPicking(false);
    }
  }

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
        <Text style={captureStyles.guideText}>{message}</Text>
        <View style={captureStyles.footer}>
          <View style={captureStyles.controls}>
            <Pressable style={captureStyles.sideControl} onPress={openLibrary} disabled={isPicking}>
              <Text style={captureStyles.controlIcon}>□</Text>
              <Text style={captureStyles.controlText}>相册</Text>
            </Pressable>
            <Pressable
              accessibilityLabel="拍摄植物照片"
              disabled={isPicking}
              onPress={openCamera}
              style={[captureStyles.shutter, isPicking && captureStyles.shutterDisabled]}
            />
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

async function persistPickedImage(uri: string) {
  const directory = new Directory(Paths.document, "garden-atlas");
  directory.create({ intermediates: true, idempotent: true });

  const extension = uri.match(/\.(jpe?g|png|heic|webp)(?:\?|$)/i)?.[1] ?? "jpg";
  const destination = new File(directory, `plant-${Date.now()}.${extension.toLowerCase()}`);
  new File(uri).copy(destination);

  return destination.uri;
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
  guideText: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 210,
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center"
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
  shutterDisabled: {
    opacity: 0.55
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
