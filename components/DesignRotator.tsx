"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { themes, DesignTheme, getTheme } from "@/lib/designThemes";

type DesignRotatorContextType = {
  currentTheme: DesignTheme;
  currentIndex: number;
  totalThemes: number;
  themeName: string;
  isPaused: boolean;
  isFunkyMode: boolean;
  togglePause: () => void;
  toggleFunkyMode: () => void;
  goToTheme: (index: number) => void;
  nextTheme: () => void;
  prevTheme: () => void;
};

const DesignRotatorContext = createContext<DesignRotatorContextType | null>(null);

export function DesignRotator({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFunkyMode, setIsFunkyMode] = useState(false);
  const totalThemes = themes.length;

  useEffect(() => {
    // Try to restore from localStorage
    const savedIndex = localStorage.getItem("portfolio-theme-index");
    if (savedIndex !== null) {
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && idx >= 0 && idx < totalThemes) {
        setCurrentIndex(idx);
      }
    }
    
    const savedFunkyMode = localStorage.getItem("portfolio-funky-mode");
    if (savedFunkyMode !== null) {
      setIsFunkyMode(savedFunkyMode === "true");
    }
  }, [totalThemes]);

  const nextTheme = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % totalThemes;
      localStorage.setItem("portfolio-theme-index", next.toString());
      return next;
    });
  }, [totalThemes]);

  const prevTheme = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + totalThemes) % totalThemes;
      localStorage.setItem("portfolio-theme-index", next.toString());
      return next;
    });
  }, [totalThemes]);

  const goToTheme = useCallback((index: number) => {
    if (index >= 0 && index < totalThemes) {
      setCurrentIndex(index);
      localStorage.setItem("portfolio-theme-index", index.toString());
    }
  }, [totalThemes]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const toggleFunkyMode = useCallback(() => {
    setIsFunkyMode((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio-funky-mode", next.toString());
      return next;
    });
  }, []);

  useEffect(() => {
    if (isPaused || !isFunkyMode) return;
    
    // Change UI every 5 seconds in funky mode
    const intervalId = setInterval(nextTheme, 5000);
    return () => clearInterval(intervalId);
  }, [isPaused, isFunkyMode, nextTheme]);

  // If not funky mode, force default layout (index 0 - Glassmorphism)
  const activeThemeIndex = isFunkyMode ? currentIndex : 0;
  const currentTheme = getTheme(activeThemeIndex);

  const value = {
    currentTheme,
    currentIndex: activeThemeIndex,
    totalThemes,
    themeName: currentTheme.name,
    isPaused,
    isFunkyMode,
    togglePause,
    toggleFunkyMode,
    goToTheme,
    nextTheme,
    prevTheme
  };

  return (
    <DesignRotatorContext.Provider value={value}>
      {children}
    </DesignRotatorContext.Provider>
  );
}

export function useDesignRotator() {
  const context = useContext(DesignRotatorContext);
  if (!context) {
    throw new Error("useDesignRotator must be used within a DesignRotator");
  }
  return context;
}
