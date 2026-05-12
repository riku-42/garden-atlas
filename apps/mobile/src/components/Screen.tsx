import type { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { colors } from "../styles";

type ScreenProps = PropsWithChildren<{
  dark?: boolean;
  padded?: boolean;
}>;

export function Screen({ children, dark = false, padded = true }: ScreenProps) {
  return (
    <SafeAreaView style={[screenStyles.safe, dark && screenStyles.darkSafe]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={[screenStyles.content, padded && screenStyles.padded]}
        showsVerticalScrollIndicator={false}
      >
        {children}
        <View style={screenStyles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const screenStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.paper
  },
  darkSafe: {
    backgroundColor: colors.forest
  },
  content: {
    flexGrow: 1
  },
  padded: {
    padding: 20
  },
  bottomSpacer: {
    height: 28
  }
});
