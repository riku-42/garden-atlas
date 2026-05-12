import { MapPin, Share2, Tag } from "lucide-react";
import type { PlantEntry } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { PlantVisual } from "../components/PlantVisual";
import { StatusRow } from "../components/StatusRow";

type EntryDetailScreenProps = {
  entry: PlantEntry;
  onNavigate: (screen: ScreenName) => void;
};

export function EntryDetailScreen({ entry, onNavigate }: EntryDetailScreenProps) {
  return (
    <section className="screen" aria-label="Entry detail">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("gallery")} aria-label="返回">
            ‹
          </button>
          <h3>详情</h3>
          <button className="icon-button" type="button" onClick={() => onNavigate("share")} aria-label="分享">
            <Share2 size={18} />
          </button>
        </div>
        <div className="meta-card detail-header">
          <div className="detail-thumb">
            <PlantVisual variant={entry.id} />
          </div>
          <div>
            <h3>{entry.commonName}</h3>
            <p>{entry.speciesName}</p>
          </div>
        </div>
        <div className="detail-list">
          <div className="meta-card">
            <strong>记录信息</strong>
            <p>拍摄时间 · {new Date(entry.capturedAt).toLocaleDateString("zh-CN")}</p>
            <p>
              <MapPin size={14} /> 拍摄地点 · {entry.locationName}
            </p>
            <p>{entry.notes}</p>
          </div>
          <div className="meta-card">
            <strong>
              <Tag size={14} /> 标签
            </strong>
            <div className="pill-row">
              {entry.tags.map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="atlas-hero">
            <PlantVisual variant={entry.id} />
          </div>
        </div>
        <div className="action-row">
          <button className="secondary-action" type="button" onClick={() => onNavigate("location")}>
            编辑位置
          </button>
          <button className="primary-action" type="button">
            编辑
          </button>
        </div>
      </div>
    </section>
  );
}
