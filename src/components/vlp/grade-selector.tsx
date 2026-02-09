"use client";

import { Check, StickyNote, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { grades } from "@/data/vehicle-data";
import { AnnotatedText } from "@/components/vlp/term-tooltip";

interface GradeSelectorProps {
  selectedGrade: string | null;
  selectedScene: string | null;
  onSelectGrade: (gradeId: string) => void;
  onAddNote: (text: string, category: "grade", relatedId: string, sectionId: string) => void;
}

export function GradeSelector({
  selectedGrade,
  selectedScene,
  onSelectGrade,
  onAddNote,
}: GradeSelectorProps) {
  const sortedGrades = selectedScene
    ? [...grades].sort((a, b) => {
        const aMatch = a.recommendFor?.includes(selectedScene) ? 1 : 0;
        const bMatch = b.recommendFor?.includes(selectedScene) ? 1 : 0;
        return bMatch - aMatch;
      })
    : grades;

  return (
    <section id="grades" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="outline" className="badge-premium rounded-full px-4 py-1 mb-3">Step 2</Badge>
          <div className="section-divider mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#0C1B2A] tracking-tight">グレードを選ぶ</h2>
          <p className="text-[#0C1B2A]/60 mt-2">
            {selectedScene
              ? "あなたの利用シーンに合ったグレードを優先表示しています"
              : "全5グレードからお選びください"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGrades.map((grade) => {
            const isRecommended = selectedScene && grade.recommendFor?.includes(selectedScene);
            const isSelected = selectedGrade === grade.id;

            return (
              <Card
                key={grade.id}
                className={`relative card-premium overflow-hidden border-0 ${
                  isSelected
                    ? "ring-2 ring-[#C3002F] shadow-[var(--shadow-glow-red)]"
                    : isRecommended
                    ? "ring-1 ring-[#C3002F]/30 shadow-[var(--shadow-elevated)]"
                    : ""
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-4 z-10">
                    <span className="inline-flex items-center gradient-nissan-red text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
                      <Crown className="h-3 w-3 mr-1" />
                      おすすめ
                    </span>
                  </div>
                )}

                <CardHeader className="pb-3">
                  {/* Vehicle Image */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#F5F3EF] to-[#EDE9E3] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    <img
                      src={grade.image}
                      alt={grade.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        if (target.parentElement) {
                          const placeholder = document.createElement("div");
                          placeholder.className = "flex flex-col items-center justify-center h-full";
                          placeholder.innerHTML = `
                            <p class="text-[#0C1B2A]/40 font-semibold">${grade.name}</p>
                            <p class="text-[#0C1B2A]/25 text-xs mt-1">${grade.subName || ""}</p>
                          `;
                          target.parentElement.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#0C1B2A]">{grade.name}</h3>
                      {grade.subName && (
                        <p className="text-sm text-[#0C1B2A]/50">{grade.subName}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#0C1B2A]/30 hover:text-[#C3002F] hover:bg-[#C3002F]/5"
                      data-memo-target={grade.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddNote(
                          `${grade.name} ${grade.subName || ""} - ${grade.price}`,
                          "grade",
                          grade.id,
                          "grades"
                        );
                      }}
                      title="メモに追加"
                    >
                      <StickyNote className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#C3002F] font-[family-name:var(--font-geist-sans)]">{grade.price}</span>
                    <span className="text-xs text-[#0C1B2A]/50">（税込）〜</span>
                  </div>

                  <div className="flex gap-2 text-xs text-[#0C1B2A]/50">
                    <AnnotatedText text={grade.driveType} />
                    <span>|</span>
                    <AnnotatedText text={grade.fuelEconomy} />
                  </div>

                  <ul className="space-y-1.5">
                    {grade.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#0C1B2A]/70">
                        <Check className="h-4 w-4 text-[#C3002F] shrink-0 mt-0.5" />
                        <AnnotatedText text={hl} />
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full transition-all duration-300 ${
                      isSelected
                        ? "gradient-nissan-red hover-shine text-white shadow-md"
                        : "bg-[#F5F3EF] text-[#0C1B2A] hover:bg-[#EDE9E3] border-0"
                    }`}
                    onClick={() => onSelectGrade(grade.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        選択中
                      </>
                    ) : (
                      "このグレードを選ぶ"
                    )}
                  </Button>

                  {isRecommended && selectedScene && (
                    <p className="text-xs text-[#C3002F] bg-gradient-to-r from-[#C3002F]/5 to-[#C3002F]/10 p-3 rounded-lg text-center">
                      <Star className="h-3 w-3 inline mr-1" />
                      あなたの利用シーンにぴったりのグレードです
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
