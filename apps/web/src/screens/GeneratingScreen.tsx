import { useEffect } from "react";
import { uiCopy } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { StatusRow } from "../components/StatusRow";

type GeneratingScreenProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function GeneratingScreen({ onNavigate }: GeneratingScreenProps) {
  useEffect(() => {
    const id = window.setTimeout(() => onNavigate("result"), 1800);
    return () => window.clearTimeout(id);
  }, [onNavigate]);

  return (
    <section className="screen dark" aria-label="Generating">
      <div className="screen-scroll">
        <StatusRow />
        <div className="progress-ring">64%</div>
        <h2 style={{ textAlign: "center" }}>正在生成植物图鉴</h2>
        <p style={{ textAlign: "center" }}>这通常需要几秒钟</p>
        <div className="progress-list">
          {uiCopy.generation.map((item) => (
            <div className="paper-panel" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
