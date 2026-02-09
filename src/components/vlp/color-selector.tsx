"use client";

import { Check, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { colors } from "@/data/vehicle-data";

interface ColorSelectorProps {
  selectedColor: string | null;
  onSelectColor: (colorId: string) => void;
  onAddNote: (text: string, category: "color", relatedId: string, sectionId: string) => void;
}

export function ColorSelector({ selectedColor, onSelectColor, onAddNote }: ColorSelectorProps) {
  const standardColors = colors.filter((c) => c.type === "standard");
  const premiumColors = colors.filter((c) => c.type === "premium");
  const twoToneColors = colors.filter((c) => c.type === "two-tone");

  const selectedColorData = colors.find((c) => c.id === selectedColor);

  return (
    <section id="colors" className="py-16 gradient-section-warm relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="section-divider mx-auto mb-4" />
          <Badge className="badge-premium mb-3">カラー</Badge>
          <h2 className="text-3xl font-bold text-[#0C1B2A] tracking-tight">ボディカラー</h2>
          <p className="text-[#0C1B2A]/50 mt-2">お好みのカラーをお選びください</p>
        </div>

        <TooltipProvider>
          {/* Standard Colors */}
          <div className="mb-10">
            <h3 className="text-[#0C1B2A]/60 uppercase tracking-wider text-xs font-semibold mb-5 text-center">スタンダードカラー</h3>
            <div className="flex flex-wrap gap-5 justify-center">
              {standardColors.map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color}
                  isSelected={selectedColor === color.id}
                  onSelect={() => onSelectColor(color.id)}
                  onAddNote={() => onAddNote(`カラー: ${color.name}`, "color", color.id, "colors")}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0C1B2A]/10 to-transparent" />
          </div>

          {/* Premium Colors */}
          <div className="mb-10">
            <h3 className="text-[#0C1B2A]/60 uppercase tracking-wider text-xs font-semibold mb-1 text-center">
              プレミアムカラー
            </h3>
            <p className="text-[11px] text-[#0C1B2A]/40 text-center mb-5">特別塗装色</p>
            <div className="flex flex-wrap gap-5 justify-center">
              {premiumColors.map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color}
                  isSelected={selectedColor === color.id}
                  onSelect={() => onSelectColor(color.id)}
                  onAddNote={() =>
                    onAddNote(`カラー: ${color.name} (+${color.extraCost})`, "color", color.id, "colors")
                  }
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0C1B2A]/10 to-transparent" />
          </div>

          {/* Two-tone Colors */}
          <div className="mb-8">
            <h3 className="text-[#0C1B2A]/60 uppercase tracking-wider text-xs font-semibold mb-1 text-center">
              2トーンカラー
            </h3>
            <p className="text-[11px] text-[#0C1B2A]/40 text-center mb-5">特別塗装色</p>
            <div className="flex flex-wrap gap-5 justify-center">
              {twoToneColors.map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color}
                  isSelected={selectedColor === color.id}
                  onSelect={() => onSelectColor(color.id)}
                  onAddNote={() =>
                    onAddNote(`カラー: ${color.name} (+${color.extraCost})`, "color", color.id, "colors")
                  }
                />
              ))}
            </div>
          </div>
        </TooltipProvider>

        {/* Selected Color Info */}
        {selectedColorData && (
          <div className="mt-8 glass rounded-2xl shadow-[var(--shadow-elevated)] p-5">
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-full shadow-[var(--shadow-soft)] ring-1 ring-black/5"
                style={{
                  backgroundColor: selectedColorData.hex,
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15), var(--shadow-soft)",
                }}
              />
              <div>
                <p className="font-semibold text-[#0C1B2A] text-lg">{selectedColorData.name}</p>
                {selectedColorData.extraCost && (
                  <p className="text-sm text-[#0C1B2A]/50">+{selectedColorData.extraCost}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ColorSwatch({
  color,
  isSelected,
  onSelect,
  onAddNote,
}: {
  color: (typeof colors)[0];
  isSelected: boolean;
  onSelect: () => void;
  onAddNote: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center gap-2 group">
          <button
            onClick={onSelect}
            className={`relative w-16 h-16 rounded-full transition-all duration-300 ease-out ${
              isSelected
                ? "ring-2 ring-[#C3002F] ring-offset-4 ring-offset-white shadow-[var(--shadow-glow-red)] scale-110"
                : "border-2 border-[#0C1B2A]/10 hover:shadow-[var(--shadow-elevated)] hover:scale-110"
            }`}
            style={{
              backgroundColor: color.hex,
              boxShadow: isSelected
                ? undefined
                : "inset 0 2px 4px rgba(0,0,0,0.1), var(--shadow-soft)",
            }}
          >
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check
                  className="h-5 w-5 drop-shadow-sm transition-transform duration-300"
                  style={{
                    color:
                      color.hex === "#1A1A1A" || color.hex === "#4A4A4A"
                        ? "white"
                        : "#C3002F",
                  }}
                />
              </div>
            )}
            {color.type === "two-tone" && (
              <div
                className="absolute top-0 left-0 w-full h-1/2 rounded-t-full"
                style={{
                  backgroundColor: "#1A1A1A",
                  boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.1)",
                }}
              />
            )}
          </button>
          <div className="text-center">
            <p className="text-[11px] text-[#0C1B2A]/60 font-medium max-w-[80px] leading-tight">{color.name}</p>
            {color.extraCost && (
              <p className="text-[9px] text-[#0C1B2A]/40 mt-0.5">+{color.extraCost}</p>
            )}
          </div>
          <button
            data-memo-target={color.id}
            onClick={(e) => {
              e.stopPropagation();
              onAddNote();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <StickyNote className="h-3 w-3 text-[#0C1B2A]/20 hover:text-[#C3002F]" />
          </button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{color.name}</p>
        {color.extraCost && <p className="text-xs text-zinc-400">+{color.extraCost}</p>}
      </TooltipContent>
    </Tooltip>
  );
}
