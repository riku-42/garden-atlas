import { uiCopy } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { StatusRow } from "../components/StatusRow";

type RecommendationSettingsScreenProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function RecommendationSettingsScreen({ onNavigate }: RecommendationSettingsScreenProps) {
  return (
    <section className="screen" aria-label="Recommendation settings">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("home")} aria-label="返回">
            ‹
          </button>
          <h3>推荐设置</h3>
          <span />
        </div>
        <div className="meta-card">
          <h3>{uiCopy.recommendation.optInTitle}</h3>
          <p>{uiCopy.recommendation.optInBody}</p>
          <div className="toggle" aria-label="recommendation sharing on">
            <span />
          </div>
        </div>
        <div className="meta-card" style={{ marginTop: 14 }}>
          <strong>{uiCopy.recommendation.privateDefault}</strong>
          <p>每张图鉴保存后默认为私密。你可以单独选择设为可推荐。</p>
        </div>
        <div className="meta-card" style={{ marginTop: 14 }}>
          <strong>公开信息</strong>
          <p>生成图、植物名称、大致地点、标签和展示名。</p>
        </div>
      </div>
    </section>
  );
}
