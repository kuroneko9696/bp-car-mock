"use client";

import { useState, useEffect, useCallback } from "react";

export type UserAttribute =
  | "first-car"
  | "car-expert"
  | "cost-focused"
  | "family"
  | "outdoor"
  | "safety-focused";

export const USER_ATTRIBUTE_LABELS: Record<UserAttribute, string> = {
  "first-car": "はじめての車",
  "car-expert": "車に詳しい",
  "cost-focused": "コスト重視",
  family: "ファミリー",
  outdoor: "アウトドア派",
  "safety-focused": "安全重視",
};

export interface StickyNote {
  id: string;
  text: string;
  category: "grade" | "color" | "option" | "memo";
  reason?: string;
  sectionId?: string;
  relatedId?: string;
  createdAt: number;
}

export interface SessionData {
  selectedScene: string | null;
  selectedGrade: string | null;
  selectedColor: string | null;
  selectedOptions: string[];
  stickyNotes: StickyNote[];
  lastVisited: number;
  aiChatHistory: { agentId: string; message: string; isAgent: boolean }[];
  userAttributes: UserAttribute[];
}

const STORAGE_KEY = "nissan-dayz-vlp-session";

const defaultSession: SessionData = {
  selectedScene: null,
  selectedGrade: null,
  selectedColor: null,
  selectedOptions: [],
  stickyNotes: [],
  lastVisited: Date.now(),
  aiChatHistory: [],
  userAttributes: [],
};

export function useSessionStorage() {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSession({ ...defaultSession, ...parsed });
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...session, lastVisited: Date.now() }));
    }
  }, [session, isLoaded]);

  const updateSession = useCallback((updates: Partial<SessionData>) => {
    setSession((prev) => ({ ...prev, ...updates }));
  }, []);

  const addStickyNote = useCallback((note: Omit<StickyNote, "id" | "createdAt">) => {
    setSession((prev) => ({
      ...prev,
      stickyNotes: [
        ...prev.stickyNotes,
        { ...note, id: crypto.randomUUID(), createdAt: Date.now() },
      ],
    }));
  }, []);

  const removeStickyNote = useCallback((id: string) => {
    setSession((prev) => ({
      ...prev,
      stickyNotes: prev.stickyNotes.filter((n) => n.id !== id),
    }));
  }, []);

  const toggleOption = useCallback((optionId: string) => {
    setSession((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(optionId)
        ? prev.selectedOptions.filter((id) => id !== optionId)
        : [...prev.selectedOptions, optionId],
    }));
  }, []);

  const toggleUserAttribute = useCallback((attr: UserAttribute) => {
    setSession((prev) => ({
      ...prev,
      userAttributes: prev.userAttributes.includes(attr)
        ? prev.userAttributes.filter((a) => a !== attr)
        : [...prev.userAttributes, attr],
    }));
  }, []);

  const clearSession = useCallback(() => {
    setSession(defaultSession);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    session,
    isLoaded,
    updateSession,
    addStickyNote,
    removeStickyNote,
    toggleOption,
    toggleUserAttribute,
    clearSession,
  };
}
