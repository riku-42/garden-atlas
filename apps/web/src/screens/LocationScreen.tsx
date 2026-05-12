import type { ScreenName } from "../App";
import { StatusRow } from "../components/StatusRow";

type LocationScreenProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function LocationScreen({ onNavigate }: LocationScreenProps) {
  return (
    <section className="screen" aria-label="Location picker">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("detail")} aria-label="返回">
            ‹
          </button>
          <h3>选择位置</h3>
          <span />
        </div>
        <div className="pill" style={{ width: "100%", color: "#9b9384" }}>
          ⌕ 搜索地点
        </div>
        <div className="map-visual" style={{ marginTop: 16 }}>
          <div className="pin" />
        </div>
        <div className="meta-card" style={{ marginTop: 16 }}>
          <strong>已选择位置</strong>
          <p>浙江省杭州市西湖区满觉陇路</p>
          <p>纬度 30.2475 / 经度 120.1215</p>
        </div>
        <button className="primary-action" type="button" style={{ width: "100%", marginTop: 14 }} onClick={() => onNavigate("detail")}>
          确认
        </button>
      </div>
    </section>
  );
}
