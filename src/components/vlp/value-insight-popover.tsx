"use client";

import { useState, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart3, Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { SpecValueInsight } from "@/data/spec-insights-data";
import { getInsightForUser } from "@/data/spec-insights-data";
import { useUserAttributes } from "@/contexts/user-attributes-context";
import { useTypewriter } from "@/hooks/use-typewriter";

const verdictConfig = {
  advantage: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", label: "優位" },
  equal: { icon: Minus, color: "text-zinc-500", bg: "bg-zinc-50", label: "同等" },
  disadvantage: { icon: TrendingDown, color: "text-amber-600", bg: "bg-amber-50", label: "劣位" },
} as const;

export function ValueInsightPopover({
  insight,
  children,
}: {
  insight: SpecValueInsight;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const hasAnimatedRef = useRef(false);

  const { userAttributes } = useUserAttributes();
  const explanation = getInsightForUser(insight, userAttributes);
  const isPersonalized =
    userAttributes.length > 0 &&
    insight.personalizedInsights &&
    userAttributes.some((a) => insight.personalizedInsights![a]);

  const { displayedText, isComplete } = useTypewriter(explanation, open, 15);

  if (isComplete && open) {
    hasAnimatedRef.current = true;
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      hasAnimatedRef.current = false;
    }
    setOpen(newOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 border-b border-dashed border-zinc-300 hover:border-teal-500 text-inherit hover:text-teal-700 transition-colors cursor-help group font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <BarChart3 className="h-3 w-3 opacity-0 group-hover:opacity-100 shrink-0 inline-block ml-0.5 text-teal-500 transition-opacity" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="center" sideOffset={8}>
        <div className="ai-popover-content border-teal-200 border rounded-lg overflow-hidden bg-white">
          {/* Header */}
          <div className="px-3 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span className="text-xs font-semibold text-teal-700">AIアドバイザ</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-600">
              数値の読み方
            </span>
          </div>

          {/* Headline */}
          <div className="px-3 pt-2.5 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{insight.emoji}</span>
              <p className="font-bold text-sm text-teal-700">{insight.headline}</p>
            </div>
          </div>

          {/* Explanation */}
          <div className="px-3 pb-2 pt-1">
            <div className="flex items-center gap-1 mb-1">
              {isPersonalized ? (
                <span className="text-[10px] text-teal-500 font-medium">あなた向けの解説</span>
              ) : (
                <span className="text-[10px] text-zinc-400">一般向けの解説</span>
              )}
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {displayedText}
              {!isComplete && <span className="ai-cursor-teal" />}
            </p>
          </div>

          {/* Competitor comparison table */}
          {insight.competitors.length > 0 && (
            <div className="px-3 pb-2">
              <p className="text-[10px] text-zinc-400 mb-1">ライバル比較</p>
              <div className="border border-zinc-200 rounded-md overflow-hidden text-xs">
                {insight.competitors.map((comp) => {
                  const cfg = comp.verdict ? verdictConfig[comp.verdict] : verdictConfig.equal;
                  const VerdictIcon = cfg.icon;
                  return (
                    <div
                      key={comp.name}
                      className={`flex items-center justify-between px-2 py-1.5 ${cfg.bg} border-b border-zinc-100 last:border-b-0`}
                    >
                      <span className="text-zinc-700 font-medium">{comp.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-600">{comp.value}</span>
                        <VerdictIcon className={`h-3 w-3 ${cfg.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Practical note */}
          {insight.practicalNote && (
            <div className="px-3 pb-3">
              <p className="text-[10px] text-teal-600 bg-teal-50 rounded px-2 py-1.5 leading-relaxed">
                {insight.practicalNote}
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
