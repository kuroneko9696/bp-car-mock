"use client";

import { useState, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, ShieldAlert, Zap, Leaf, Lightbulb, Camera, Navigation, Snowflake, Gauge, ClipboardList, CircleDot, Mountain, Factory, Store, CloudRain, Video, CreditCard, Sun, Wind, Ruler, RotateCcw, Footprints, ArrowRightLeft, SunDim, Phone, Battery, Sparkles } from "lucide-react";
import type { GlossaryEntry } from "@/data/glossary-data";
import { glossary, findGlossaryTerms, getExplanationForUser } from "@/data/glossary-data";
import { useUserAttributes } from "@/contexts/user-attributes-context";
import { useTypewriter } from "@/hooks/use-typewriter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Navigation,
  Camera,
  ShieldAlert,
  Snowflake,
  Zap,
  Leaf,
  Battery,
  Lightbulb,
  Gauge,
  ClipboardList,
  CircleDot,
  Mountain,
  Factory,
  Store,
  CloudRain,
  Video,
  CreditCard,
  Sun,
  Wind,
  Ruler,
  RotateCcw,
  Footprints,
  ArrowRightLeft,
  SunDim,
  Phone,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  safety: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", badge: "bg-red-100 text-red-600" },
  performance: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-600" },
  comfort: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", badge: "bg-green-100 text-green-600" },
  spec: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badge: "bg-purple-100 text-purple-600" },
};

const categoryLabels: Record<string, string> = {
  safety: "安全機能",
  performance: "走行性能",
  comfort: "快適装備",
  spec: "スペック用語",
};

// Single term tooltip with AI Advisor branding
function TermPopover({ entry, children }: { entry: GlossaryEntry; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasAnimatedRef = useRef(false);
  const IconComp = iconMap[entry.icon];
  const colors = categoryColors[entry.category];

  const { userAttributes } = useUserAttributes();
  const explanation = getExplanationForUser(entry, userAttributes);
  const isPersonalized = userAttributes.length > 0 && entry.explanations && userAttributes.some(a => entry.explanations![a]);

  // Typewriter: animate on first open and when explanation changes
  const shouldAnimate = open && !hasAnimatedRef.current;
  const { displayedText, isComplete } = useTypewriter(explanation, open, 15);

  // Mark as animated after first complete render
  if (isComplete && open) {
    hasAnimatedRef.current = true;
  }

  // Reset animation flag when popover closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      hasAnimatedRef.current = false;
    }
    setOpen(newOpen);
    setImgError(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 border-b border-dashed border-zinc-400 hover:border-indigo-500 text-inherit hover:text-indigo-600 transition-colors cursor-help group"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <Sparkles className="h-3 w-3 opacity-40 group-hover:opacity-100 shrink-0 inline-block ml-0.5 text-indigo-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="center" sideOffset={8}>
        <div className={`ai-popover-content ${colors.border} border rounded-lg overflow-hidden bg-white`}>
          {/* AI Advisor Header */}
          <div className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-700">AIアドバイザ</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${colors.badge}`}>
              {categoryLabels[entry.category]}
            </span>
          </div>

          {/* Image area */}
          {entry.imageUrl && !imgError ? (
            <div className="relative h-32 bg-zinc-100 overflow-hidden">
              <img
                src={entry.imageUrl}
                alt={entry.term}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          ) : (
            <div className={`flex items-center justify-center h-20 ${colors.bg}`}>
              <div className={`${colors.badge} p-3 rounded-xl`}>
                {IconComp ? <IconComp className="h-8 w-8" /> : <HelpCircle className="h-8 w-8" />}
              </div>
            </div>
          )}

          {/* Term name */}
          <div className="px-3 pt-2.5 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{entry.emoji}</span>
              <div className="min-w-0">
                <p className={`font-bold text-sm ${colors.text}`}>{entry.simpleLabel}</p>
                {entry.reading && (
                  <p className="text-[10px] text-zinc-500">{entry.term}（{entry.reading}）</p>
                )}
              </div>
            </div>
          </div>

          {/* Explanation area */}
          <div className="px-3 pb-3 pt-1">
            <div className="flex items-center gap-1 mb-1">
              {isPersonalized ? (
                <span className="text-[10px] text-indigo-500 font-medium">あなた向けの説明</span>
              ) : (
                <span className="text-[10px] text-zinc-400">一般向けの説明</span>
              )}
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {displayedText}
              {!isComplete && <span className="ai-cursor" />}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Inline component for a single known term
export function Term({ term, children }: { term: string; children?: React.ReactNode }) {
  const entry = glossary[term];
  if (!entry) return <>{children || term}</>;
  return <TermPopover entry={entry}>{children || term}</TermPopover>;
}

// Auto-detect and annotate terms in a text string
export function AnnotatedText({ text, className }: { text: string; className?: string }) {
  const matches = findGlossaryTerms(text);

  if (matches.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, i) => {
    // Add text before this match
    if (match.startIndex > lastIndex) {
      parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, match.startIndex)}</span>);
    }
    // Add the term tooltip
    parts.push(
      <TermPopover key={`term-${i}`} entry={match.entry}>
        {match.term}
      </TermPopover>
    );
    lastIndex = match.startIndex + match.term.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
  }

  return <span className={className}>{parts}</span>;
}
