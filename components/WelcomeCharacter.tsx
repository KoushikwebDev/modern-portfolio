"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const WelcomeCharacter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show character after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show message AFTER character appears (increased delay)
      setTimeout(() => setShowMessage(true), 2000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowMessage(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="hidden md:block fixed bottom-4 right-4 z-50">
          {/* Lottie Character Container - Loads First */}
          <motion.div
            initial={{ 
              x: 120, 
              y: 80, 
              rotate: 25,
              scale: 0.3,
              opacity: 0 
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              rotate: 0,
              scale: 1,
              opacity: 1 
            }}
            exit={{ 
              x: 120, 
              y: 80, 
              rotate: 25,
              scale: 0.3,
              opacity: 0 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 15,
              duration: 1.5 
            }}
            className="relative cursor-pointer"
            onClick={() => setShowMessage(!showMessage)}
          >
            {/* Lottie Animation */}
            <div className="w-48 h-48">
              <DotLottieReact
                src="https://lottie.host/bc0fb932-6515-4c81-8a3d-81965c181632/gMMU5ABNYx.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>

          {/* Speech Bubble - Rectangular Shape */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="absolute bottom-10 right-40 bg-white dark:bg-gray-800 shadow-lg p-4 w-96 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={16} />
                </button>
                <div className="pr-6 text-box">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Welcome! 👋
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hi there! I'm excited to show you around my portfolio. 
                    Feel free to explore my projects and get in touch!
                  </p>
                </div>
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeCharacter;
