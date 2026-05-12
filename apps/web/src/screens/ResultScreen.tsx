import { Download, Share2 } from "lucide-react";
import type { PlantEntry } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { AtlasCard } from "../components/AtlasCard";
import { StatusRow } from "../components/StatusRow";

type ResultScreenProps = {
  entry: PlantEntry;
  onNavigate: (screen: ScreenName) => void;
};

export function ResultScreen({ entry, onNavigate }: ResultScreenProps) {
  return (
    <section className="screen" aria-label="Result">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("capture")} aria-label="返回">
            ‹
          </button>
          <h3>图鉴</h3>
          <button className="icon-button" type="button" aria-label="下载">
            <Download size={19} />
          </button>
        </div>
        <AtlasCard entry={entry} />
        <div className="action-row">
          <button className="secondary-action" type="button">
            对比原图
          </button>
          <button className="primary-action" type="button" onClick={() => onNavigate("detail")}>
            保存图鉴
          </button>
        </div>
        <button className="secondary-action" style={{ width: "100%", marginTop: 12 }} type="button" onClick={() => onNavigate("share")}>
          <Share2 size={18} />
          分享
        </button>
      </div>
    </section>
  );
}
