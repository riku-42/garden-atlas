import { Image, RotateCcw, X, Zap } from "lucide-react";
import type { ScreenName } from "../App";
import { StatusRow } from "../components/StatusRow";

type CaptureScreenProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function CaptureScreen({ onNavigate }: CaptureScreenProps) {
  return (
    <section className="screen dark" aria-label="Capture">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("home")} aria-label="关闭">
            <X size={20} />
          </button>
          <button className="icon-button" type="button" aria-label="闪光灯">
            <Zap size={19} />
          </button>
        </div>
      </div>
      <div className="camera-preview" />
      <div className="camera-footer">
        <div className="camera-controls">
          <button className="icon-button" type="button" aria-label="相册">
            <Image size={20} />
          </button>
          <button className="shutter" type="button" onClick={() => onNavigate("generating")} aria-label="拍照" />
          <button className="icon-button" type="button" aria-label="识别历史">
            <RotateCcw size={20} />
          </button>
        </div>
        <div className="camera-tab">
          <strong>拍照</strong>
          <span>从相册选择</span>
        </div>
      </div>
    </section>
  );
}
