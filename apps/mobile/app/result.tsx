import { mockEntries } from "@garden-atlas/shared";
import { ActionLink, AtlasCard, TopBar } from "../src/components/GardenUI";
import { Screen } from "../src/components/Screen";

export default function Result() {
  const entry = mockEntries[0];

  return (
    <Screen>
      <TopBar title="图鉴" backHref="/capture" />
      <AtlasCard entry={entry} />
      <ActionLink href="/detail" label="保存图鉴" primary />
      <ActionLink href="/share" label="分享图鉴" />
    </Screen>
  );
}
