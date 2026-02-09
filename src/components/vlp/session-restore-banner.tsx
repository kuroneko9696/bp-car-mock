"use client";

import { Clock, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SessionRestoreBannerProps {
  lastVisited: number;
  hasSelections: boolean;
  onDismiss: () => void;
  onClearSession: () => void;
}

export function SessionRestoreBanner({
  lastVisited,
  hasSelections,
  onDismiss,
  onClearSession,
}: SessionRestoreBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !hasSelections) return null;

  const now = Date.now();
  const diff = now - lastVisited;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeAgo = "";
  if (days > 0) timeAgo = `${days}日前`;
  else if (hours > 0) timeAgo = `${hours}時間前`;
  else if (minutes > 0) timeAgo = `${minutes}分前`;
  else return null; // Too recent, don't show

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss();
  };

  return (
    <div className="glass border-b border-[#0C1B2A]/5 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#C3002F]/10 rounded-lg">
            <Clock className="h-4 w-4 text-[#C3002F] shrink-0" />
          </div>
          <p className="text-sm text-[#0C1B2A]/80">
            <span className="font-medium">{timeAgo}の選択内容</span>が保存されています。
            続きから始められます。
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#0C1B2A]/40 hover:text-[#0C1B2A]/70"
            onClick={() => {
              onClearSession();
              handleDismiss();
            }}
          >
            リセット
          </Button>
          <Button
            size="sm"
            className="gradient-nissan-red hover-shine text-white text-xs rounded-full px-4 shadow-md"
            onClick={handleDismiss}
          >
            続きから
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDismiss}>
            <X className="h-3.5 w-3.5 text-[#0C1B2A]/30" />
          </Button>
        </div>
      </div>
    </div>
  );
}
