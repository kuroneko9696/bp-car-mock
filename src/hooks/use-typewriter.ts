"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, enabled: boolean, speed = 20) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const prevTextRef = useRef(text);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // Reset when text changes
    if (text !== prevTextRef.current) {
      prevTextRef.current = text;
      setDisplayedText("");
      setIsComplete(false);
    }

    if (isComplete && displayedText === text) return;

    let index = displayedText.length;
    if (index >= text.length) {
      setIsComplete(true);
      return;
    }

    const timer = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, enabled, speed, displayedText, isComplete]);

  // Reset when text changes externally
  useEffect(() => {
    if (text !== prevTextRef.current) {
      prevTextRef.current = text;
      setDisplayedText("");
      setIsComplete(false);
    }
  }, [text]);

  return { displayedText, isComplete };
}
