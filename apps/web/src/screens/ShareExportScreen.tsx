import type { PlantEntry } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { AtlasCard } from "../components/AtlasCard";
import { StatusRow } from "../components/StatusRow";

type ShareExportScreenProps = {
  entry: PlantEntry;
  onNavigate: (screen: ScreenName) => void;
};

export function ShareExportScreen({ entry, onNavigate }: ShareExportScreenProps) {
  return (
    <section className="screen" aria-label="Share export">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("detail")} aria-label="返回">
            ‹
          </button>
          <h3>分享图鉴</h3>
          <span />
        </div>
        <AtlasCard entry={entry} />
        <h3 style={{ marginTop: 18 }}>导出格式</h3>
        <div className="share-format">
          <div className="format-card">方形<br />社交卡</div>
          <div className="format-card">故事<br />9:16</div>
          <div className="format-card">海报<br />打印</div>
        </div>
        <button className="primary-action" type="button" style={{ width: "100%", marginTop: 16 }}>
          保存海报
        </button>
      </div>
    </section>
  );
}
