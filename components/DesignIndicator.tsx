"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, Palette } from "lucide-react";
import { useDesignRotator } from "./DesignRotator";

export function DesignIndicator() {
  const { currentTheme, currentIndex, totalThemes, isPaused, togglePause, nextTheme, prevTheme } = useDesignRotator();
  const [showProgress, setShowProgress] = useState(!isPaused);
  const [progressKey, setProgressKey] = useState(0);

  // Restart progress bar when theme changes or unpaused
  useEffect(() => {
    if (!isPaused) {
      setShowProgress(true);
      setProgressKey((prev) => prev + 1);
    } else {
      setShowProgress(false);
    }
  }, [currentIndex, isPaused]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 overflow-hidden rounded-full border border-white/20 bg-slate-950/80 p-1.5 shadow-xl backdrop-blur-xl"
      >
        <button
          onClick={prevTheme}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Previous theme"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <button
          onClick={togglePause}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 relative"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play className="h-3.5 w-3.5 ml-0.5" /> : <Pause className="h-3.5 w-3.5" />}
          
          {/* Progress ring when playing */}
          <AnimatePresence>
            {!isPaused && showProgress && (
              <motion.svg
                key={progressKey}
                className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
                viewBox="0 0 32 32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.circle
                  cx="16"
                  cy="16"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/40"
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: "100 100" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
        
        <button
          onClick={nextTheme}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Next theme"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 px-3 pl-2 pr-4 border-l border-white/20 text-sm font-medium text-white">
          <Palette className="h-3.5 w-3.5 text-white/60" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] text-white/60 font-mono tracking-widest uppercase">
              {currentIndex + 1} / {totalThemes}
            </span>
            <span className="min-w-[120px] text-left">
              {currentTheme.name}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
