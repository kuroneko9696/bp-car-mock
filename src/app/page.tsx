"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/vlp/header";
import { HeroSection } from "@/components/vlp/hero-section";
import { PersonalizeWizard } from "@/components/vlp/personalize-wizard";
import { GradeSelector } from "@/components/vlp/grade-selector";
import { ColorSelector } from "@/components/vlp/color-selector";
import { SpecsTable } from "@/components/vlp/specs-table";
import { OptionRecommender } from "@/components/vlp/option-recommender";
import { AiDiscussionPanel } from "@/components/vlp/ai-discussion-panel";
import { StickyNotesPanel } from "@/components/vlp/sticky-notes-panel";
import { SummaryBar } from "@/components/vlp/summary-bar";
import { SessionRestoreBanner } from "@/components/vlp/session-restore-banner";
import { Footer } from "@/components/vlp/footer";
import { useSessionStorage } from "@/hooks/use-session-storage";
import type { StickyNote } from "@/hooks/use-session-storage";
import { UserAttributesProvider } from "@/contexts/user-attributes-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StickyNote as StickyNoteIcon, MessageSquareQuote } from "lucide-react";

export default function Home() {
  const {
    session,
    isLoaded,
    updateSession,
    addStickyNote,
    removeStickyNote,
    toggleOption,
    toggleUserAttribute,
    clearSession,
  } = useSessionStorage();

  const [stickyPanelOpen, setStickyPanelOpen] = useState(false);

  // Reason dialog state
  const [pendingNote, setPendingNote] = useState<{
    text: string;
    category: StickyNote["category"];
    relatedId?: string;
    sectionId?: string;
  } | null>(null);
  const [noteReason, setNoteReason] = useState("");

  const handleSelectScene = useCallback(
    (sceneId: string) => {
      updateSession({ selectedScene: sceneId });
    },
    [updateSession]
  );

  const handleSelectGrade = useCallback(
    (gradeId: string) => {
      updateSession({
        selectedGrade: session.selectedGrade === gradeId ? null : gradeId,
      });
    },
    [updateSession, session.selectedGrade]
  );

  const handleSelectColor = useCallback(
    (colorId: string) => {
      updateSession({
        selectedColor: session.selectedColor === colorId ? null : colorId,
      });
    },
    [updateSession, session.selectedColor]
  );

  // Opens reason dialog instead of directly adding
  const handleAddNote = useCallback(
    (text: string, category: StickyNote["category"], relatedId?: string, sectionId?: string) => {
      setPendingNote({ text, category, relatedId, sectionId });
      setNoteReason("");
    },
    []
  );

  // Confirm adding note (with optional reason)
  const handleConfirmNote = useCallback(() => {
    if (pendingNote) {
      addStickyNote({
        text: pendingNote.text,
        category: pendingNote.category,
        relatedId: pendingNote.relatedId,
        sectionId: pendingNote.sectionId,
        reason: noteReason.trim() || undefined,
      });
      setPendingNote(null);
      setNoteReason("");
    }
  }, [addStickyNote, pendingNote, noteReason]);

  // Skip reason and add note directly
  const handleSkipReason = useCallback(() => {
    if (pendingNote) {
      addStickyNote({
        text: pendingNote.text,
        category: pendingNote.category,
        relatedId: pendingNote.relatedId,
        sectionId: pendingNote.sectionId,
      });
      setPendingNote(null);
      setNoteReason("");
    }
  }, [addStickyNote, pendingNote]);

  // Click on note in panel → scroll to section + glow memo icon
  const handleNoteClick = useCallback((note: StickyNote) => {
    if (note.sectionId) {
      const section = document.getElementById(note.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        // After scroll animation, find and glow the memo button
        setTimeout(() => {
          if (note.relatedId) {
            const btn = document.querySelector(`[data-memo-target="${note.relatedId}"]`);
            if (btn) {
              btn.classList.add("memo-glow");
              setTimeout(() => btn.classList.remove("memo-glow"), 1500);
            }
          }
        }, 600);
      }
    }
  }, []);

  const handleClearScene = useCallback(() => {
    updateSession({ selectedScene: null });
  }, [updateSession]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-section-warm">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin h-10 w-10 border-2 border-[#C3002F]/20 border-t-[#C3002F] rounded-full mx-auto" />
            <div className="absolute inset-0 animate-ping h-10 w-10 border border-[#C3002F]/10 rounded-full mx-auto" style={{ animationDuration: '2s' }} />
          </div>
          <p className="text-sm text-[#0C1B2A]/40 tracking-wide">読み込み中...</p>
        </div>
      </div>
    );
  }

  const hasSelections =
    !!session.selectedGrade ||
    !!session.selectedColor ||
    session.selectedOptions.length > 0;

  return (
    <UserAttributesProvider userAttributes={session.userAttributes} toggleUserAttribute={toggleUserAttribute}>
    <div className="min-h-screen bg-[#FAFAF8]">
      <Header
        stickyNotesCount={session.stickyNotes.length}
        onToggleStickyPanel={() => setStickyPanelOpen((prev) => !prev)}
      />

      <SessionRestoreBanner
        lastVisited={session.lastVisited}
        hasSelections={hasSelections}
        onDismiss={() => {}}
        onClearSession={clearSession}
      />

      <main className={`transition-all duration-500 ease-out ${stickyPanelOpen ? "mr-80" : ""}`}>
        <HeroSection />

        <PersonalizeWizard
          selectedScene={session.selectedScene}
          onSelectScene={handleSelectScene}
          onClear={handleClearScene}
        />

        <GradeSelector
          selectedGrade={session.selectedGrade}
          selectedScene={session.selectedScene}
          onSelectGrade={handleSelectGrade}
          onAddNote={handleAddNote}
        />

        <ColorSelector
          selectedColor={session.selectedColor}
          onSelectColor={handleSelectColor}
          onAddNote={handleAddNote}
        />

        <OptionRecommender
          selectedScene={session.selectedScene}
          selectedOptions={session.selectedOptions}
          onToggleOption={toggleOption}
          onAddNote={handleAddNote}
        />

        <SpecsTable />

        <AiDiscussionPanel
          selectedGrade={session.selectedGrade}
          selectedScene={session.selectedScene}
        />

        <Footer />
      </main>

      <StickyNotesPanel
        isOpen={stickyPanelOpen}
        onClose={() => setStickyPanelOpen(false)}
        notes={session.stickyNotes}
        onAddNote={(text, category) => addStickyNote({ text, category })}
        onRemoveNote={removeStickyNote}
        onClearAll={() => updateSession({ stickyNotes: [] })}
        onNoteClick={handleNoteClick}
        userAttributes={session.userAttributes}
        onToggleAttribute={toggleUserAttribute}
      />

      <SummaryBar
        selectedGrade={session.selectedGrade}
        selectedColor={session.selectedColor}
        selectedOptions={session.selectedOptions}
        onClearAll={clearSession}
      />

      {/* Reason Dialog */}
      <Dialog open={!!pendingNote} onOpenChange={(open) => !open && setPendingNote(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-[var(--shadow-dramatic)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#0C1B2A]">
              <div className="p-1.5 bg-amber-50 rounded-lg">
                <StickyNoteIcon className="h-4 w-4 text-amber-600" />
              </div>
              メモに追加
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-[#F5F3EF] p-4 rounded-xl text-sm text-[#0C1B2A]/80 border border-[#0C1B2A]/5">
              {pendingNote?.text}
            </div>
            <div className="space-y-2">
              <Label htmlFor="note-reason" className="text-sm flex items-center gap-1.5 text-[#0C1B2A]/60">
                <MessageSquareQuote className="h-3.5 w-3.5 text-[#0C1B2A]/30" />
                メモの理由（任意）
              </Label>
              <Textarea
                id="note-reason"
                value={noteReason}
                onChange={(e) => setNoteReason(e.target.value)}
                placeholder="例：燃費がいいので候補に入れたい"
                className="text-sm resize-none rounded-xl border-[#0C1B2A]/10 focus:ring-[#C3002F]/20 focus:border-[#C3002F]/30"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleConfirmNote();
                  }
                }}
              />
              <p className="text-[10px] text-[#0C1B2A]/30">Ctrl+Enter で保存</p>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button variant="ghost" onClick={handleSkipReason} className="text-[#0C1B2A]/40 hover:text-[#0C1B2A]/60">
              理由なしで追加
            </Button>
            <Button onClick={handleConfirmNote} className="gradient-nissan-red hover-shine text-white shadow-md rounded-xl">
              保存する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </UserAttributesProvider>
  );
}
