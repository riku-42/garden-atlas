import { Stack } from "expo-router";
import { PrototypeProvider } from "../src/domain/PrototypeStore";

export default function Layout() {
  return (
    <PrototypeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PrototypeProvider>
  );
}
