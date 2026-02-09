"use client";

import { X, StickyNote, Trash2, Plus, Tag, Palette, Settings, FileText, ArrowRight, MousePointerClick, MessageSquareQuote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import type { StickyNote as StickyNoteType, UserAttribute } from "@/hooks/use-session-storage";
import { USER_ATTRIBUTE_LABELS } from "@/hooks/use-session-storage";

const categoryIcons: Record<string, React.ReactNode> = {
  grade: <Tag className="h-3 w-3" />,
  color: <Palette className="h-3 w-3" />,
  option: <Settings className="h-3 w-3" />,
  memo: <FileText className="h-3 w-3" />,
};

const categoryLabels: Record<string, string> = {
  grade: "グレード",
  color: "カラー",
  option: "オプション",
  memo: "メモ",
};

const categoryColors: Record<string, string> = {
  grade: "bg-blue-50/80 text-blue-700 border-blue-200/60",
  color: "bg-purple-50/80 text-purple-700 border-purple-200/60",
  option: "bg-emerald-50/80 text-emerald-700 border-emerald-200/60",
  memo: "bg-amber-50/80 text-amber-700 border-amber-200/60",
};

interface StickyNotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notes: StickyNoteType[];
  onAddNote: (text: string, category: StickyNoteType["category"]) => void;
  onRemoveNote: (id: string) => void;
  onClearAll: () => void;
  onNoteClick?: (note: StickyNoteType) => void;
  userAttributes: UserAttribute[];
  onToggleAttribute: (attr: UserAttribute) => void;
}

const allAttributes: UserAttribute[] = [
  "first-car",
  "car-expert",
  "cost-focused",
  "family",
  "outdoor",
  "safety-focused",
];

export function StickyNotesPanel({
  isOpen,
  onClose,
  notes,
  onAddNote,
  onRemoveNote,
  onClearAll,
  onNoteClick,
  userAttributes,
  onToggleAttribute,
}: StickyNotesPanelProps) {
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddMemo = () => {
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText.trim(), "memo");
    setNewNoteText("");
  };

  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.category]) acc[note.category] = [];
    acc[note.category].push(note);
    return acc;
  }, {} as Record<string, StickyNoteType[]>);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-white border-l border-[#0C1B2A]/5 shadow-[var(--shadow-dramatic)] z-40 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-amber-100/60 flex items-center justify-between bg-gradient-to-r from-amber-50/80 to-orange-50/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
            <StickyNote className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-[#0C1B2A]">マイメモ</h3>
          <Badge variant="secondary" className="text-xs bg-amber-100/80 text-amber-700 border-0">{notes.length}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#0C1B2A]/40 hover:text-[#0C1B2A]/70" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Description */}
      <div className="px-4 py-3 bg-amber-50/30 border-b border-amber-100/40">
        <p className="text-xs text-amber-700/80">
          気になるグレード、オプション、カラーをメモとして保存。クリックでメモした位置に移動します。
        </p>
      </div>

      {/* User Attributes */}
      <div className="px-4 py-3 border-b border-[#0C1B2A]/5">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-[#C3002F]" />
          <span className="text-xs font-semibold text-[#0C1B2A]/80">あなたの属性</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {allAttributes.map((attr) => {
            const isSelected = userAttributes.includes(attr);
            return (
              <label
                key={attr}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-[#C3002F]/20 bg-[#C3002F]/5 text-[#C3002F] shadow-sm"
                    : "border-[#0C1B2A]/10 bg-white text-[#0C1B2A]/60 hover:border-[#0C1B2A]/20 hover:bg-[#0C1B2A]/[0.02]"
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggleAttribute(attr)}
                  className="h-3.5 w-3.5"
                />
                <span className="truncate">{USER_ATTRIBUTE_LABELS[attr]}</span>
              </label>
            );
          })}
        </div>
        <p className="text-[10px] text-[#0C1B2A]/35 mt-1.5">
          属性に合わせてAIアドバイザの説明が変わります
        </p>
      </div>

      {/* Notes List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                <StickyNote className="h-8 w-8 text-amber-300" />
              </div>
              <p className="text-sm text-[#0C1B2A]/40 font-medium">メモはまだありません</p>
              <p className="text-xs text-[#0C1B2A]/25">
                各セクションの<StickyNote className="h-3 w-3 inline mx-0.5" />ボタンで追加
              </p>
            </div>
          ) : (
            <>
              {Object.entries(groupedNotes).map(([category, categoryNotes]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-2">
                    {categoryIcons[category]}
                    <span className="text-xs font-semibold text-[#0C1B2A]/50 uppercase tracking-wider">
                      {categoryLabels[category]}
                    </span>
                    <Badge variant="outline" className="text-[10px] h-4 border-[#0C1B2A]/10">{categoryNotes.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {categoryNotes.map((note) => {
                      const isClickable = !!note.sectionId;
                      return (
                        <div
                          key={note.id}
                          className={`group p-2.5 rounded-xl border text-sm transition-all shadow-[var(--shadow-soft)] ${categoryColors[category]} ${
                            isClickable ? "cursor-pointer hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]" : ""
                          }`}
                          onClick={() => isClickable && onNoteClick?.(note)}
                          role={isClickable ? "button" : undefined}
                          tabIndex={isClickable ? 0 : undefined}
                          onKeyDown={(e) => {
                            if (isClickable && (e.key === "Enter" || e.key === " ")) {
                              e.preventDefault();
                              onNoteClick?.(note);
                            }
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <span className="flex-1 break-words">{note.text}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              {isClickable && (
                                <MousePointerClick className="h-3 w-3 text-current opacity-40 group-hover:opacity-80 transition-opacity" />
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveNote(note.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                          {note.reason && (
                            <div className="mt-1.5 flex items-start gap-1.5 text-xs opacity-70">
                              <MessageSquareQuote className="h-3 w-3 shrink-0 mt-0.5" />
                              <span className="break-words italic">{note.reason}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Add Memo */}
      <div className="border-t border-[#0C1B2A]/5 p-4 space-y-3 bg-gradient-to-t from-[#0C1B2A]/[0.02] to-transparent">
        <div className="flex gap-2">
          <Input
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddMemo()}
            placeholder="メモを追加..."
            className="text-sm border-[#0C1B2A]/10 focus:border-[#C3002F]/30 focus:ring-[#C3002F]/20 rounded-lg"
          />
          <Button size="sm" onClick={handleAddMemo} disabled={!newNoteText.trim()} className="bg-[#0C1B2A]/80 hover:bg-[#0C1B2A] text-white rounded-lg">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Separator className="bg-[#0C1B2A]/5" />

        <div className="flex items-center justify-between">
          {notes.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-[#0C1B2A]/35 hover:text-[#0C1B2A]/60" onClick={onClearAll}>
              <Trash2 className="h-3 w-3 mr-1" />
              すべて削除
            </Button>
          )}
          <Button
            size="sm"
            className="gradient-nissan-red hover-shine text-white ml-auto rounded-lg shadow-md"
          >
            見積りに反映
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
