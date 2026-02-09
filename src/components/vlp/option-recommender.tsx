"use client";

import { StickyNote, Check, ShieldCheck, Wrench, Cpu, Sofa, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { options } from "@/data/vehicle-data";
import { AnnotatedText } from "@/components/vlp/term-tooltip";

const typeIcons: Record<string, React.ReactNode> = {
  safety: <ShieldCheck className="h-4 w-4" />,
  technology: <Cpu className="h-4 w-4" />,
  comfort: <Sofa className="h-4 w-4" />,
  interior: <Palette className="h-4 w-4" />,
  exterior: <Wrench className="h-4 w-4" />,
};

const typeLabels: Record<string, string> = {
  safety: "安全装備",
  technology: "テクノロジー",
  comfort: "快適装備",
  interior: "インテリア",
  exterior: "エクステリア",
};

const categoryLabels: Record<string, string> = {
  MOP: "メーカーオプション",
  DOP: "ディーラーオプション",
};

const typeBorderColors: Record<string, string> = {
  safety: "#2563EB",
  technology: "#7C3AED",
  comfort: "#D97706",
  interior: "#C3002F",
  exterior: "#0C1B2A",
};

interface OptionRecommenderProps {
  selectedScene: string | null;
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  onAddNote: (text: string, category: "option", relatedId: string, sectionId: string) => void;
}

export function OptionRecommender({
  selectedScene,
  selectedOptions,
  onToggleOption,
  onAddNote,
}: OptionRecommenderProps) {
  const recommended = selectedScene
    ? options.filter((o) => o.recommendedFor.includes(selectedScene))
    : [];
  const otherOptions = selectedScene
    ? options.filter((o) => !o.recommendedFor.includes(selectedScene))
    : options;

  const totalCost = options
    .filter((o) => selectedOptions.includes(o.id))
    .reduce((sum, o) => sum + o.priceValue, 0);

  return (
    <section id="options" className="py-16 gradient-section-cool relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="section-divider mx-auto mb-4" />
          <Badge className="badge-premium mb-3">Step 3</Badge>
          <h2 className="text-3xl font-bold text-[#0C1B2A] tracking-tight">オプションを選ぶ</h2>
          <p className="text-[#0C1B2A]/50 mt-2">
            {selectedScene
              ? "あなたの利用シーンに合ったオプションをおすすめしています"
              : "利用シーンを選ぶと、おすすめオプションが表示されます"}
          </p>
        </div>

        {/* Selected Options Summary */}
        {selectedOptions.length > 0 && (
          <div className="glass rounded-xl shadow-[var(--shadow-soft)] border-0 p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="gradient-nissan-red text-white border-0">{selectedOptions.length}点選択中</Badge>
              <span className="text-sm text-[#0C1B2A]/60">
                選択中オプション合計:
              </span>
              <span className="font-[family-name:var(--font-geist-sans)] font-bold text-[#C3002F] text-lg">
                {totalCost > 0 ? `${totalCost.toLocaleString()}円` : "標準装備に含まれます"}
              </span>
            </div>
          </div>
        )}

        <Tabs defaultValue={selectedScene ? "recommended" : "all"} className="space-y-6">
          <TabsList className="bg-[#F5F3EF] p-1 rounded-xl grid w-full max-w-md mx-auto grid-cols-2 h-auto">
            {selectedScene && (
              <TabsTrigger
                value="recommended"
                className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-[#0C1B2A]"
              >
                おすすめ
              </TabsTrigger>
            )}
            <TabsTrigger
              value="all"
              className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-[#0C1B2A]"
            >
              すべて
            </TabsTrigger>
            <TabsTrigger
              value="by-type"
              className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-[#0C1B2A]"
            >
              カテゴリ別
            </TabsTrigger>
          </TabsList>

          {/* Recommended Tab */}
          {selectedScene && (
            <TabsContent value="recommended" className="space-y-4">
              {recommended.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {recommended.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedOptions.includes(option.id)}
                      isRecommended
                      reason={selectedScene ? option.reasons[selectedScene] : undefined}
                      onToggle={() => onToggleOption(option.id)}
                      onAddNote={() =>
                        onAddNote(`${option.name} - ${option.price}`, "option", option.id, "options")
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-[#0C1B2A]/50 py-8">利用シーンを選択してください</p>
              )}
            </TabsContent>
          )}

          {/* All Tab */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {options.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.includes(option.id)}
                  isRecommended={selectedScene ? option.recommendedFor.includes(selectedScene) : false}
                  reason={selectedScene ? option.reasons[selectedScene] : undefined}
                  onToggle={() => onToggleOption(option.id)}
                  onAddNote={() =>
                    onAddNote(`${option.name} - ${option.price}`, "option", option.id, "options")
                  }
                />
              ))}
            </div>
          </TabsContent>

          {/* By Type Tab */}
          <TabsContent value="by-type" className="space-y-10">
            {Object.entries(typeLabels).map(([type, label]) => {
              const filtered = options.filter((o) => o.type === type);
              if (filtered.length === 0) return null;
              return (
                <div key={type}>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-white"
                      style={{ backgroundColor: typeBorderColors[type] || "#0C1B2A" }}
                    >
                      {typeIcons[type]}
                    </div>
                    <h3 className="font-semibold text-lg text-[#0C1B2A]">
                      {label}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#0C1B2A]/10 to-transparent" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {filtered.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        isSelected={selectedOptions.includes(option.id)}
                        isRecommended={
                          selectedScene ? option.recommendedFor.includes(selectedScene) : false
                        }
                        reason={selectedScene ? option.reasons[selectedScene] : undefined}
                        onToggle={() => onToggleOption(option.id)}
                        onAddNote={() =>
                          onAddNote(`${option.name} - ${option.price}`, "option", option.id, "options")
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface OptionCardProps {
  option: (typeof options)[0];
  isSelected: boolean;
  isRecommended: boolean;
  reason?: string;
  onToggle: () => void;
  onAddNote: () => void;
}

function OptionCard({ option, isSelected, isRecommended, reason, onToggle, onAddNote }: OptionCardProps) {
  return (
    <Card
      className={`card-premium rounded-xl transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-[#C3002F] shadow-[var(--shadow-glow-red)] bg-[#C3002F]/[0.02]"
          : isRecommended
          ? "border-accent-left shadow-[var(--shadow-soft)]"
          : ""
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-[#0C1B2A] font-semibold"><AnnotatedText text={option.name} /></h4>
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0.5 rounded-full border-[#0C1B2A]/15 text-[#0C1B2A]/60"
              >
                <AnnotatedText text={categoryLabels[option.category]} />
              </Badge>
              {isRecommended && (
                <Badge className="gradient-nissan-red text-white text-[10px] px-2 py-0.5 border-0 rounded-full">
                  おすすめ
                </Badge>
              )}
            </div>

            <p className="text-sm text-[#0C1B2A]/50"><AnnotatedText text={option.description} /></p>

            {isRecommended && reason && (
              <div className="bg-gradient-to-r from-[#C3002F]/5 to-[#C3002F]/10 p-3 rounded-lg">
                <p className="text-xs text-[#C3002F] font-medium">
                  {reason}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#0C1B2A] font-bold text-lg">{option.price}</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-[#0C1B2A]/30 hover:text-[#C3002F] hover:bg-[#C3002F]/5"
                  data-memo-target={option.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNote();
                  }}
                  title="メモに追加"
                >
                  <StickyNote className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  className={
                    isSelected
                      ? "gradient-nissan-red hover-shine text-white border-0 rounded-lg px-4"
                      : "bg-transparent border border-[#0C1B2A]/15 text-[#0C1B2A]/70 hover:border-[#C3002F] hover:text-[#C3002F] hover:bg-[#C3002F]/5 rounded-lg px-4"
                  }
                  onClick={onToggle}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1" />
                      選択中
                    </>
                  ) : (
                    "選択する"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
