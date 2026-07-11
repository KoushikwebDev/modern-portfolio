"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";
import { useDesignRotator } from "./DesignRotator";
import { DEFAULT_HOME_DESIGN } from "@/lib/homeDesign";

export default function Hero() {
  const design = DEFAULT_HOME_DESIGN;
  const status: "idle" | "loading" = "idle";
  const { currentTheme } = useDesignRotator();

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/files/FullStack_Koushik_Saha.pdf";
    link.download = "Koushik-Saha-resume.pdf";
    link.click();
  };

  // Sub-components for different layouts
  if (currentTheme.layout === "minimalist") {
    return (
      <section className={`relative flex items-center justify-center min-h-screen ${currentTheme.heroBg} px-5 transition-all duration-700`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center max-w-3xl">
          <h1 className={`text-5xl font-light sm:text-6xl md:text-7xl transition-colors duration-700 ${currentTheme.textPrimary}`}>
            {design.headlineBefore} <span className={`font-semibold ${currentTheme.heroAccent}`}>{design.headlineAccent}</span> {design.headlineAfter}
          </h1>
          <p className={`mt-8 text-lg ${currentTheme.textSecondary}`}>{design.description}</p>
          <div className="mt-12">
            <a href="#projects" className={`px-8 py-3 text-sm tracking-widest uppercase transition-all duration-700 ${currentTheme.heroButton}`}>
              {design.primaryCta}
            </a>
          </div>
        </motion.div>
      </section>
    );
  }

  if (currentTheme.layout === "brutalist") {
    return (
      <section className={`relative min-h-screen border-b-8 border-black ${currentTheme.heroBg} transition-all duration-700 overflow-hidden`}>
        <div className="absolute top-0 w-full border-b-4 border-black bg-yellow-400 py-2 overflow-hidden whitespace-nowrap">
          <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="flex gap-10 font-bold text-black uppercase tracking-widest text-xl">
            <span>{design.focusLine}</span>
            <span>{design.focusLine}</span>
            <span>{design.focusLine}</span>
          </motion.div>
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 h-full flex flex-col justify-center">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} 
            className={`text-7xl sm:text-8xl md:text-9xl font-black uppercase leading-none tracking-tighter ${currentTheme.textPrimary}`}
          >
            {design.headlineBefore.split(" ")[0]}<br/>
            <span className={`bg-black text-white px-4 inline-block transform -rotate-2 my-4 ${currentTheme.heroAccent.replace('text-', 'bg-')}`}>{design.headlineAccent}</span><br/>
            {design.headlineAfter}
          </motion.h1>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t-8 border-black pt-8">
            <p className={`text-2xl font-bold ${currentTheme.textSecondary}`}>{design.description}</p>
            <div className="flex flex-col gap-4">
              <a href="#projects" className={`border-4 border-black px-8 py-6 text-2xl font-black uppercase text-center transform hover:translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000] transition-all ${currentTheme.heroButton}`}>
                {design.primaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "bento") {
    return (
      <section className={`relative min-h-screen pt-32 pb-16 px-5 ${currentTheme.heroBg} transition-all duration-700`}>
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-[80vh]">
          {/* Main Title Box */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`md:col-span-3 md:row-span-2 p-10 flex flex-col justify-center rounded-3xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
            <div className={`mb-6 inline-block px-4 py-2 rounded-full text-sm font-medium ${currentTheme.tagBg} ${currentTheme.tagText}`}>
              {design.eyebrow}
            </div>
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${currentTheme.textPrimary}`}>
              {design.headlineBefore} <span className={currentTheme.heroAccent}>{design.headlineAccent}</span> {design.headlineAfter}
            </h1>
          </motion.div>

          {/* Action Box */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className={`md:col-span-1 md:row-span-2 p-8 flex flex-col justify-between rounded-3xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
            <Sparkles className={`w-12 h-12 ${currentTheme.heroAccent}`} />
            <div>
              <p className={`mb-6 font-medium ${currentTheme.textSecondary}`}>{design.focusLine}</p>
              <a href="#projects" className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${currentTheme.heroButton}`}>
                {design.primaryCta}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Desc Box */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className={`md:col-span-2 md:row-span-1 p-8 rounded-3xl flex items-center ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
            <p className={`text-xl ${currentTheme.textSecondary}`}>{design.description}</p>
          </motion.div>

          {/* Metrics Boxes */}
          {design.metrics.slice(0, 2).map((metric, i) => (
            <motion.div key={metric.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + (i * 0.1) }} className={`md:col-span-1 md:row-span-1 p-8 rounded-3xl flex flex-col justify-center items-center text-center ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
              <h3 className={`text-4xl font-black mb-2 ${currentTheme.heroAccent}`}>{metric.value}</h3>
              <p className={`text-sm font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "retro") {
    return (
      <section className={`relative min-h-screen pt-32 pb-16 px-5 ${currentTheme.heroBg} flex items-center justify-center transition-all duration-700 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`w-full max-w-5xl border-2 border-white shadow-[4px_4px_0_0_#000] bg-[#c0c0c0]`}>
          <div className="bg-blue-800 p-2 flex justify-between items-center text-white font-bold font-mono">
            <span>Portfolio.exe</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080]" />
              <div className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080]" />
              <div className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080] flex items-center justify-center text-black text-xs">X</div>
            </div>
          </div>
          <div className="p-8 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-600 m-2 bg-white">
            <h1 className="text-4xl sm:text-5xl font-mono text-black mb-6">
              {design.headlineBefore} <span className="bg-pink-300 px-2">{design.headlineAccent}</span> {design.headlineAfter}
            </h1>
            <div className="border border-dotted border-gray-400 p-4 mb-6 bg-[#ffffcc]">
              <p className="font-mono text-black">{design.description}</p>
            </div>
            <div className="flex gap-4">
              <a href="#projects" className={`font-mono px-6 py-2 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black bg-[#c0c0c0] text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white`}>
                {design.primaryCta}
              </a>
              <button onClick={handleDownloadResume} className={`font-mono px-6 py-2 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black bg-[#c0c0c0] text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white`}>
                {design.secondaryCta}
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  if (currentTheme.layout === "3d") {
    return (
      <section className={`relative min-h-screen pt-32 pb-16 px-5 ${currentTheme.heroBg} transition-all duration-700 overflow-hidden flex items-center justify-center`} style={{ perspective: "1000px" }}>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <motion.div 
          initial={{ rotateX: 20, rotateY: -20, opacity: 0, z: -500 }}
          animate={{ rotateX: 10, rotateY: -10, opacity: 1, z: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className={`relative z-10 w-full max-w-5xl p-12 ${currentTheme.heroPanel} flex flex-col md:flex-row gap-12 items-center`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex-1" style={{ transform: "translateZ(50px)" }}>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 ${currentTheme.textPrimary} drop-shadow-xl`}>
              {design.headlineBefore} <span className={currentTheme.heroAccent}>{design.headlineAccent}</span> {design.headlineAfter}
            </h1>
            <p className={`text-xl mb-8 ${currentTheme.textSecondary}`}>{design.description}</p>
            <div className="flex gap-4">
              <a href="#projects" className={`px-8 py-4 ${currentTheme.heroButton}`} style={{ transform: "translateZ(20px)" }}>
                {design.primaryCta}
              </a>
              <button onClick={handleDownloadResume} className={`px-8 py-4 ${currentTheme.btnSecondary}`} style={{ transform: "translateZ(20px)" }}>
                {design.secondaryCta}
              </button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4" style={{ transform: "translateZ(80px)" }}>
            {design.metrics.map((metric, i) => (
              <motion.div 
                key={metric.label}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                className={`p-6 flex flex-col items-center justify-center text-center ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
              >
                <h3 className={`text-3xl font-black mb-2 ${currentTheme.heroAccent}`}>{metric.value}</h3>
                <p className={`text-xs font-bold ${currentTheme.textSecondary}`}>{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  if (currentTheme.layout === "material") {
    return (
      <section className={`relative min-h-screen pt-24 ${currentTheme.heroBg} transition-all duration-700 flex flex-col`}>
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32`}>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${currentTheme.tagBg} ${currentTheme.tagText}`}>
                {design.eyebrow}
              </span>
              <h1 className={`text-5xl sm:text-7xl font-normal tracking-tight mb-8 ${currentTheme.textPrimary}`}>
                {design.headlineBefore} <span className={`font-semibold ${currentTheme.heroAccent}`}>{design.headlineAccent}</span> {design.headlineAfter}
              </h1>
              <p className={`text-xl mb-10 max-w-2xl ${currentTheme.textSecondary}`}>
                {design.description}
              </p>
              <div className="flex gap-4 items-center">
                <a href="#projects" className={`px-8 py-4 shadow-md ${currentTheme.heroButton}`}>
                  {design.primaryCta}
                </a>
                <button onClick={handleDownloadResume} className={`px-8 py-4 ${currentTheme.btnSecondary}`}>
                  {design.secondaryCta}
                </button>
              </div>
            </div>
            
            <div className={`flex-1 w-full p-8 ${currentTheme.heroPanel}`}>
              <h3 className={`text-2xl mb-8 ${currentTheme.textPrimary}`}>“{design.focusLine}”</h3>
              <div className="grid grid-cols-2 gap-4">
                {design.metrics.map(metric => (
                  <div key={metric.label} className={`p-4 rounded-2xl ${currentTheme.cardBg}`}>
                    <div className={`text-3xl font-medium mb-1 ${currentTheme.heroAccent}`}>{metric.value}</div>
                    <div className={`text-sm ${currentTheme.textSecondary}`}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "apple") {
    return (
      <section className={`relative min-h-screen pt-40 pb-20 px-5 flex flex-col items-center justify-center text-center ${currentTheme.heroBg} transition-all duration-700`}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-4xl mx-auto">
          <h1 className={`text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight mb-6 ${currentTheme.textPrimary}`}>
            {design.headlineBefore}<br/>
            <span className={currentTheme.heroAccent}>{design.headlineAccent}</span><br/>
            {design.headlineAfter}
          </h1>
          <p className={`text-2xl sm:text-3xl font-medium tracking-tight mb-12 max-w-3xl mx-auto ${currentTheme.textSecondary}`}>
            {design.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#projects" className={`px-8 py-4 text-lg ${currentTheme.heroButton}`}>
              {design.primaryCta}
            </a>
            <button onClick={handleDownloadResume} className={`px-8 py-4 text-lg ${currentTheme.btnSecondary} flex items-center gap-2`}>
              {design.secondaryCta} <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className={`mt-24 w-full max-w-5xl p-10 ${currentTheme.heroPanel}`}>
          <div className="flex flex-col md:flex-row justify-around items-center gap-8">
            {design.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className={`text-5xl font-semibold tracking-tight mb-2 ${currentTheme.textPrimary}`}>{metric.value}</div>
                <div className={`text-lg font-medium ${currentTheme.textSecondary}`}>{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  if (currentTheme.layout === "neumorphism") {
    return (
      <section className={`relative min-h-screen pt-32 pb-20 px-5 flex items-center justify-center ${currentTheme.heroBg} transition-all duration-700`}>
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className={`p-12 ${currentTheme.heroPanel}`}>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${currentTheme.textPrimary} leading-tight`}>
              {design.headlineBefore} <span className={currentTheme.heroAccent}>{design.headlineAccent}</span> {design.headlineAfter}
            </h1>
            <p className={`text-lg mb-10 ${currentTheme.textSecondary}`}>
              {design.description}
            </p>
            <div className="flex gap-6">
              <a href="#projects" className={`px-8 py-4 ${currentTheme.heroButton}`}>
                {design.primaryCta}
              </a>
              <button onClick={handleDownloadResume} className={`px-8 py-4 ${currentTheme.btnSecondary}`}>
                {design.secondaryCta}
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className={`col-span-2 p-8 ${currentTheme.cardBg} ${currentTheme.cardShadow} rounded-3xl flex items-center justify-center text-center`}>
              <h3 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>“{design.focusLine}”</h3>
            </motion.div>
            {design.metrics.map((metric, i) => (
              <motion.div key={metric.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + (i*0.1) }} className={`p-8 ${currentTheme.cardBg} ${currentTheme.cardShadow} rounded-3xl flex flex-col items-center justify-center text-center`}>
                <div className={`text-4xl font-black mb-2 ${currentTheme.heroAccent}`}>{metric.value}</div>
                <div className={`text-sm font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "micro-animations") {
    return (
      <section className={`relative min-h-screen pt-32 pb-20 px-5 flex flex-col justify-center items-center overflow-hidden ${currentTheme.heroBg} transition-all duration-700`}>
        {/* Background particle-like elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className={`absolute w-2 h-2 rounded-full ${currentTheme.heroDot}`}
              animate={{ 
                y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                opacity: [0, 0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: Math.random() * 5 + 3 }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl w-full relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`inline-block mb-8 px-6 py-2 rounded-full ${currentTheme.tagBg} ${currentTheme.tagText} cursor-pointer hover:scale-110 transition-transform`}
          >
            {design.eyebrow}
          </motion.div>
          
          <h1 className={`text-5xl sm:text-7xl md:text-8xl font-bold mb-8 ${currentTheme.textPrimary}`}>
            {design.headlineBefore.split("").map((char, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="inline-block hover:-translate-y-2 hover:text-indigo-500 transition-all cursor-default">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {" "}
            <span className={currentTheme.heroAccent}>
              {design.headlineAccent.split("").map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (design.headlineBefore.length * 0.05) + (i * 0.05), type: "spring" }} className="inline-block hover:scale-125 transition-all cursor-default">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            {" "}
            {design.headlineAfter.split("").map((char, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ((design.headlineBefore.length + design.headlineAccent.length) * 0.05) + (i * 0.05) }} className="inline-block hover:-translate-y-2 hover:text-indigo-500 transition-all cursor-default">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className={`text-xl mb-12 max-w-2xl mx-auto ${currentTheme.textSecondary}`}>
            {design.description}
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex justify-center gap-6">
            <a href="#projects" className={`px-8 py-4 flex items-center gap-2 group ${currentTheme.heroButton}`}>
              <span>{design.primaryCta}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 group-hover:scale-125 transition-all" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  // Fallback to the original polished layout (ideal for glassmorphism and any unseen theme)
  return (
    <section
      className={`relative isolate overflow-hidden bg-gradient-to-br ${currentTheme.heroBg} px-5 pb-16 pt-32 transition-all duration-700 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:min-h-screen lg:px-12 lg:pt-36`}
    >
      <div
        aria-hidden="true"
        className={`absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700 ${currentTheme.heroGlow}`}
      />
      <div
        aria-hidden="true"
        className={`absolute -right-32 bottom-0 h-96 w-96 rounded-full blur-3xl transition-colors duration-700 ${currentTheme.heroGlow}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={`mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-700 ${currentTheme.textSecondary}`}>
            <span className={`h-2 w-2 rounded-full transition-colors duration-700 ${currentTheme.heroDot}`} />
            {design.eyebrow}
          </div>

          <h1 className={`max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl transition-colors duration-700 ${currentTheme.textPrimary}`}>
            {design.headlineBefore} <span className={`transition-colors duration-700 ${currentTheme.heroAccent}`}>{design.headlineAccent}</span>{" "}
            {design.headlineAfter}
          </h1>

          <p className={`mt-8 max-w-2xl text-lg leading-8 transition-colors duration-700 sm:text-xl ${currentTheme.textSecondary}`}>
            {design.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold transition-all duration-700 hover:-translate-y-0.5 ${currentTheme.heroButton}`}
            >
              {design.primaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleDownloadResume}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold transition-colors ${currentTheme.btnSecondary}`}
            >
              <Download className="h-4 w-4" />
              {design.secondaryCta}
            </button>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
          className={`relative overflow-hidden p-6 backdrop-blur-xl sm:p-8 transition-all duration-700 ${currentTheme.heroPanel}`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-700 ${currentTheme.textSecondary}`}>
              <Sparkles className={`h-4 w-4 transition-colors duration-700 ${currentTheme.heroAccent}`} />
              Studio signal
            </div>
            <span className={`font-mono text-xs transition-colors duration-700 ${currentTheme.textSecondary}`}>01—26</span>
          </div>

          <p className={`mt-11 max-w-sm text-2xl font-medium leading-tight tracking-[-0.035em] transition-colors duration-700 sm:text-3xl ${currentTheme.textPrimary}`}>
            “{design.focusLine}”
          </p>

          <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            {design.metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className={`truncate text-sm font-bold transition-colors duration-700 ${currentTheme.heroAccent}`}>{metric.value}</p>
                <p className={`mt-1 text-[11px] leading-4 transition-colors duration-700 ${currentTheme.textSecondary}`}>{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
