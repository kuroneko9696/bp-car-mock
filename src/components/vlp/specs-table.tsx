"use client";

import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { specs } from "@/data/vehicle-data";
import { AnnotatedText } from "@/components/vlp/term-tooltip";
import { ValueInsightPopover } from "@/components/vlp/value-insight-popover";
import { getSpecInsight } from "@/data/spec-insights-data";

export function SpecsTable() {
  return (
    <section id="specs" className="py-16 gradient-section-warm relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="section-divider mx-auto mb-4" />
          <Badge className="badge-premium mb-3">仕様</Badge>
          <h2 className="text-3xl font-bold text-[#0C1B2A] tracking-tight">主要スペック</h2>
          <p className="text-[#0C1B2A]/50 mt-2">デイズの詳細な仕様をご確認いただけます（数値をクリックで解説）</p>
        </div>

        <Accordion type="multiple" defaultValue={["寸法・重量", "燃費性能"]} className="space-y-3">
          {specs.map((spec) => (
            <AccordionItem
              key={spec.category}
              value={spec.category}
              className="bg-white rounded-xl shadow-[var(--shadow-soft)] border-0 px-6 data-[state=open]:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
            >
              <AccordionTrigger className="text-lg font-semibold text-[#0C1B2A] hover:no-underline">
                {spec.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-0">
                  {spec.items.map((item, i) => {
                    const insight = getSpecInsight(spec.category, item.label);
                    return (
                      <div
                        key={i}
                        className="flex justify-between py-3 text-sm hover:bg-[#F5F3EF]/50 rounded-lg px-2 -mx-2 transition-colors"
                      >
                        <AnnotatedText text={item.label} className="text-[#0C1B2A]/60" />
                        {insight ? (
                          <ValueInsightPopover insight={insight}>
                            {item.value}
                          </ValueInsightPopover>
                        ) : (
                          <span className="font-[family-name:var(--font-geist-sans)] font-semibold text-[#0C1B2A]">
                            {item.value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
