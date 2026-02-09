"use client";

import { Briefcase, Users, ShoppingBag, Mountain, Car, Sparkles, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usageScenes } from "@/data/vehicle-data";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="h-7 w-7" />,
  Users: <Users className="h-7 w-7" />,
  ShoppingBag: <ShoppingBag className="h-7 w-7" />,
  Mountain: <Mountain className="h-7 w-7" />,
  Car: <Car className="h-7 w-7" />,
  Sparkles: <Sparkles className="h-7 w-7" />,
};

interface PersonalizeWizardProps {
  selectedScene: string | null;
  onSelectScene: (sceneId: string) => void;
  onClear: () => void;
}

export function PersonalizeWizard({ selectedScene, onSelectScene, onClear }: PersonalizeWizardProps) {
  return (
    <section id="personalize" className="py-16 gradient-section-warm relative texture-grain">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <Badge variant="outline" className="badge-premium rounded-full px-4 py-1 mb-3">Step 1</Badge>
          <div className="section-divider mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#0C1B2A] tracking-tight">あなたの使い方を教えてください</h2>
          <p className="text-[#0C1B2A]/60 mt-2 max-w-xl mx-auto">
            利用シーンに合わせて、最適なグレードやオプションをご提案します。
            選択した内容はメモに保存できます。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto stagger-children">
          {usageScenes.map((scene) => (
            <Card
              key={scene.id}
              className={`cursor-pointer card-premium rounded-xl overflow-hidden border-0 ${
                selectedScene === scene.id
                  ? "ring-2 ring-[#C3002F] shadow-[var(--shadow-glow-red)]"
                  : ""
              }`}
              onClick={() => onSelectScene(scene.id)}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div
                  className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedScene === scene.id
                      ? "gradient-nissan-red text-white shadow-lg"
                      : "bg-gradient-to-br from-[#F5F3EF] to-[#EDE9E3] text-[#0C1B2A]/60"
                  }`}
                >
                  {iconMap[scene.icon]}
                </div>
                <div>
                  <p className="font-semibold text-[#0C1B2A]">{scene.label}</p>
                  <p className="text-xs text-[#0C1B2A]/50 mt-1">{scene.description}</p>
                </div>
                {selectedScene === scene.id && (
                  <span className="inline-block gradient-nissan-red text-white text-[10px] px-3 py-0.5 rounded-full font-medium">
                    選択中
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedScene && (
          <div className="flex justify-center mt-8 gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#0C1B2A]/60 hover:text-[#0C1B2A] hover:bg-[#0C1B2A]/5"
              onClick={onClear}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              リセット
            </Button>
            <Button
              size="sm"
              className="gradient-nissan-red hover-shine text-white shadow-md"
              onClick={() => document.getElementById("grades")?.scrollIntoView({ behavior: "smooth" })}
            >
              おすすめを見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
