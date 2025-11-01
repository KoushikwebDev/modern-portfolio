"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const WelcomeCharacter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [aiMessage, setAiMessage] = useState("Loading something fun... 🤖");

  useEffect(() => { 
    async function fetchAIMessage() {
      try {
        // 1️⃣ Fetch location
        const locRes = await axios.get("/api/location");
        const locData = locRes.data;

        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // 2️⃣ Fetch Gemini greeting
        const greetRes = await axios.post("/api/greetings", {
          ...locData,
          time,
        });

        const { message } = greetRes.data;
        setAiMessage(message);
      } catch (err) {
        console.error("Error fetching AI greeting:", err);
        setAiMessage("Hello there 👋 Welcome to my portfolio!");
      }
    }

    fetchAIMessage();

    // Show character animation after 2s
    const timer = setTimeout(() => {
      setIsVisible(true);
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
          {/* Lottie Character */}
          <motion.div
            initial={{ x: 120, y: 80, rotate: 25, scale: 0.3, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            exit={{ x: 120, y: 80, rotate: 25, scale: 0.3, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              duration: 1.5,
            }}
            className="relative cursor-pointer"
            onClick={() => setShowMessage(!showMessage)}
          >
            <div className="w-48 h-48">
              <DotLottieReact
                src="https://lottie.host/bc0fb932-6515-4c81-8a3d-81965c181632/gMMU5ABNYx.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>

          {/* AI Speech Bubble */}
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
                    👋 Hey there!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {aiMessage}
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
