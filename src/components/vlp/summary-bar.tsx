"use client";

import { Calculator, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { grades, options, colors as colorData } from "@/data/vehicle-data";

interface SummaryBarProps {
  selectedGrade: string | null;
  selectedColor: string | null;
  selectedOptions: string[];
  onClearAll: () => void;
}

export function SummaryBar({ selectedGrade, selectedColor, selectedOptions, onClearAll }: SummaryBarProps) {
  const grade = grades.find((g) => g.id === selectedGrade);
  const color = colorData.find((c) => c.id === selectedColor);

  const gradePrice = grade?.priceValue || 0;
  const optionsPrice = options
    .filter((o) => selectedOptions.includes(o.id))
    .reduce((sum, o) => sum + o.priceValue, 0);
  const colorExtra = color?.extraCost
    ? parseInt(color.extraCost.replace(/[^0-9]/g, ""))
    : 0;
  const totalPrice = gradePrice + optionsPrice + colorExtra;

  const hasSelections = selectedGrade || selectedColor || selectedOptions.length > 0;

  if (!hasSelections) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-[#0C1B2A]/5 shadow-[0_-4px_30px_rgba(12,27,42,0.08)]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Selected Items */}
          <div className="flex items-center gap-3 overflow-x-auto flex-1 min-w-0">
            {grade && (
              <Badge variant="outline" className="shrink-0 bg-blue-50/80 text-blue-700 border-blue-200/50 rounded-full px-3 shadow-sm">
                {grade.name} {grade.subName || ""}
              </Badge>
            )}
            {color && (
              <Badge variant="outline" className="shrink-0 bg-purple-50/80 text-purple-700 border-purple-200/50 rounded-full px-3 shadow-sm">
                <div
                  className="w-3 h-3 rounded-full mr-1.5 border border-purple-200/50 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </Badge>
            )}
            {selectedOptions.length > 0 && (
              <Badge variant="outline" className="shrink-0 bg-emerald-50/80 text-emerald-700 border-emerald-200/50 rounded-full px-3 shadow-sm">
                オプション {selectedOptions.length}点
              </Badge>
            )}
          </div>

          {/* Price & Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {totalPrice > 0 && (
              <div className="text-right">
                <p className="text-[10px] text-[#0C1B2A]/40 font-medium tracking-wide uppercase">概算価格</p>
                <p className="font-[family-name:var(--font-geist-sans)] text-xl font-bold text-[#C3002F]">
                  {totalPrice.toLocaleString()}
                  <span className="text-xs font-normal text-[#0C1B2A]/40 ml-0.5">円〜</span>
                </p>
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-[#0C1B2A]/30 hover:text-[#0C1B2A]/60 rounded-lg">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>

            <Button className="gradient-nissan-red hover-shine text-white shadow-[var(--shadow-elevated)] rounded-xl px-6">
              <Calculator className="h-4 w-4 mr-2" />
              見積りへ進む
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
