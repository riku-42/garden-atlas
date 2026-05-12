import { Camera, Home, Settings } from "lucide-react";
import type { ScreenName } from "../App";

type BottomNavProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function BottomNav({ onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <button type="button" onClick={() => onNavigate("home")}>
        <Home size={19} />
        首页
      </button>
      <button type="button" className="capture-nav" onClick={() => onNavigate("capture")} aria-label="拍照">
        <Camera size={25} />
      </button>
      <button type="button" onClick={() => onNavigate("settings")}>
        <Settings size={19} />
        设置
      </button>
    </nav>
  );
}
