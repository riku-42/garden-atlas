import { useLocalSearchParams } from "expo-router";
import { ActionLink, AtlasCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";
import { usePrototypeStore } from "../src/domain/PrototypeStore";

export default function Result() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { entries, getEntry } = usePrototypeStore();
  const entry = getEntry(id) ?? entries[0];
  const detailHref = { pathname: "/detail", params: { id: entry.id } } as const;
  const shareHref = { pathname: "/share", params: { id: entry.id } } as const;

  return (
    <Screen>
      <TopBar title="图鉴" backHref="/capture" />
      <AtlasCard entry={entry} />
      <ActionLink href={detailHref} label="保存图鉴" primary />
      <ActionLink href={shareHref} label="分享图鉴" />
    </Screen>
  );
}
