import { uiCopy, type EntryVisibility, type PlantEntry, type UserRecommendationSettings } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { StatusRow } from "../components/StatusRow";

type RecommendationSettingsScreenProps = {
  entries: PlantEntry[];
  onNavigate: (screen: ScreenName) => void;
  onReset: () => void;
  onSetSharing: (enabled: boolean) => void;
  onSetVisibility: (entryId: string, visibility: EntryVisibility) => void;
  settings: UserRecommendationSettings;
};

export function RecommendationSettingsScreen({
  entries,
  onNavigate,
  onReset,
  onSetSharing,
  onSetVisibility,
  settings
}: RecommendationSettingsScreenProps) {
  const recommendableEntries = entries.filter((entry) => entry.visibility === "recommendable");

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
          <button
            className={`toggle ${settings.recommendationSharingEnabled ? "toggle-on" : ""}`}
            type="button"
            onClick={() => onSetSharing(!settings.recommendationSharingEnabled)}
            aria-label="toggle recommendation sharing"
          >
            <span />
          </button>
          <p>{settings.recommendationSharingEnabled ? "当前已开放推荐" : "当前保持私密"}</p>
        </div>
        <div className="meta-card" style={{ marginTop: 14 }}>
          <strong>{uiCopy.recommendation.privateDefault}</strong>
          <p>每张图鉴保存后默认为私密。你可以单独选择设为可推荐。</p>
        </div>
        <div className="meta-card" style={{ marginTop: 14 }}>
          <strong>公开信息</strong>
          <p>生成图、植物名称、大致地点、标签和展示名。</p>
        </div>
        <div className="meta-card" style={{ marginTop: 14 }}>
          <strong>可推荐图鉴</strong>
          <p>{recommendableEntries.length} 张植物卡片可出现在他人的封面植物中。</p>
          <div className="settings-entry-list">
            {entries.slice(0, 4).map((entry) => (
              <button
                className="settings-entry-row"
                key={entry.id}
                type="button"
                onClick={() =>
                  onSetVisibility(entry.id, entry.visibility === "recommendable" ? "private" : "recommendable")
                }
              >
                <span>
                  <strong>{entry.commonName}</strong>
                  <small>{entry.visibility === "recommendable" ? " 可推荐" : " 私密"}</small>
                </span>
                <span>{entry.visibility === "recommendable" ? "移除" : "开放"}</span>
              </button>
            ))}
          </div>
        </div>
        <button className="secondary-action" type="button" onClick={onReset} style={{ width: "100%", marginTop: 14 }}>
          重置演示数据
        </button>
      </div>
    </section>
  );
}
