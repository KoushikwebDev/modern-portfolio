"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  ArrowRight,
  Music,
  Smartphone,
  Download,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesignRotator } from "@/components/DesignRotator";
import { DesignTheme } from "@/lib/designThemes";

const tools = [
  {
    id: "create-reel",
    name: "AI Reel Creator",
    description: "Create stunning social media reels with custom audio and effects. Perfect for Instagram, Facebook, and WhatsApp.",
    icon: Film,
    href: "/tools/create-reel",
    features: ["Custom Audio Upload", "Audio Trimming", "Multiple Platforms", "Video Export"],
    gradient: "from-violet-600 to-fuchsia-600",
    shadowColor: "shadow-violet-500/25",
    tag: "Popular",
    tagColor: "bg-emerald-500",
  },
  {
    id: "chat-room",
    name: "Live Chat Room",
    description: "Join a real-time chat room with random username. No registration needed. Connect instantly!",
    icon: Zap,
    href: "/tools/chat",
    features: ["Real-time Chat", "No Sign Up", "100 Messages", "Typing Indicator"],
    gradient: "from-emerald-600 to-teal-600",
    shadowColor: "shadow-emerald-500/25",
    tag: "New",
    tagColor: "bg-violet-500",
  },
  {
    id: "coming-soon-1",
    name: "Image Editor",
    description: "Advanced image editing with AI-powered enhancements, filters, and effects.",
    icon: Sparkles,
    href: "#",
    features: ["AI Enhancement", "Filters", "Crop & Resize", "Effects"],
    gradient: "from-blue-600 to-cyan-600",
    shadowColor: "shadow-blue-500/25",
    tag: "Coming Soon",
    tagColor: "bg-amber-500",
    disabled: true,
  },
  {
    id: "coming-soon-2",
    name: "Audio Mixer",
    description: "Mix and master audio tracks with professional-grade tools and effects.",
    icon: Music,
    href: "#",
    features: ["Multi-track", "Effects", "Export", "Presets"],
    gradient: "from-rose-600 to-orange-600",
    shadowColor: "shadow-rose-500/25",
    tag: "Coming Soon",
    tagColor: "bg-amber-500",
    disabled: true,
  },
];

export default function ToolsPage() {
  const { currentTheme } = useDesignRotator();

  if (currentTheme.layout === "minimalist") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-4xl font-light mb-6 transition-colors duration-700 ${currentTheme.textPrimary}`}>
              Tools
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 flex justify-between items-center">
                <div>
                  <h3 className={`text-xl mb-1 ${currentTheme.textPrimary}`}>{tool.name}</h3>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{tool.description}</p>
                </div>
                {!tool.disabled && (
                  <Link href={tool.href} className={`text-sm uppercase tracking-widest ${currentTheme.textPrimary} hover:opacity-50`}>
                    Open
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "brutalist") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-7xl mx-auto border-l-8 border-r-8 border-black">
          <div className="text-left mb-16 border-b-8 border-black pb-8">
            <h1 className={`text-7xl font-black uppercase tracking-tighter ${currentTheme.textPrimary}`}>
              TOOLS
            </h1>
          </div>
          <div className="flex flex-col gap-12">
            {tools.map((tool) => (
              <div key={tool.id} className={`border-4 border-black p-8 shadow-[12px_12px_0_0_#000] hover:-translate-y-2 hover:shadow-[16px_16px_0_0_#000] transition-all ${tool.disabled ? 'bg-gray-300' : 'bg-white'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-black uppercase mb-4 text-black">{tool.name}</h3>
                    <p className="text-xl font-bold mb-6 text-black">{tool.description}</p>
                  </div>
                  {!tool.disabled && (
                    <Link href={tool.href} className="border-4 border-black bg-black text-white px-8 py-4 font-black uppercase hover:bg-yellow-400 hover:text-black transition-colors">
                      Use
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {tool.features.map(f => (
                    <span key={f} className="border-2 border-black bg-yellow-400 px-4 py-1 font-bold text-black uppercase">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "retro") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className={`text-4xl font-mono mb-4 text-black bg-white inline-block border-2 border-black p-2 shadow-[4px_4px_0_0_#000]`}>Tools.exe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div key={tool.id} className="border-2 border-white shadow-[4px_4px_0_0_#000] bg-[#c0c0c0]">
                <div className="bg-blue-800 p-1 flex justify-between items-center text-white font-bold font-mono text-sm">
                  <span>{tool.id}.exe</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080]" />
                    <div className="w-3 h-3 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080]" />
                    <div className="w-3 h-3 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080] text-black text-[8px] flex justify-center items-center">X</div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white m-1">
                  <h3 className="font-mono text-black text-xl mb-2">{tool.name}</h3>
                  <p className="font-mono text-black text-sm mb-4">{tool.description}</p>
                  {!tool.disabled && (
                    <Link href={tool.href} className="inline-block font-mono px-4 py-1 text-xs border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black bg-[#c0c0c0] text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                      Run Program
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "3d") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`} style={{ perspective: "2000px" }}>
        <div className="relative max-w-7xl mx-auto" style={{ transformStyle: "preserve-3d" }}>
          <div className="text-center mb-20" style={{ transform: "translateZ(80px)" }}>
            <h1 className={`text-6xl font-black mb-6 ${currentTheme.textPrimary} drop-shadow-xl`}>
              3D Tools Area
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16" style={{ transformStyle: "preserve-3d" }}>
            {tools.map((tool, index) => (
              <motion.div 
                key={tool.id}
                initial={{ rotateX: 45, rotateY: 15, z: -300, opacity: 0 }}
                animate={{ rotateX: 20, rotateY: 0, z: 0, opacity: 1 }}
                transition={{ type: "spring", delay: index * 0.15 }}
                className={cn("p-8 relative", currentTheme.cardBg, currentTheme.cardBorder)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div style={{ transform: "translateZ(40px)" }}>
                  <tool.icon className={`w-12 h-12 mb-6 ${currentTheme.heroAccent} drop-shadow-md`} />
                  <h3 className={`text-2xl font-black mb-4 ${currentTheme.textPrimary}`}>{tool.name}</h3>
                  <p className={`mb-8 ${currentTheme.textSecondary}`}>{tool.description}</p>
                </div>
                
                <div style={{ transform: "translateZ(60px)" }} className="flex justify-between items-end mt-8 border-t border-white/10 pt-6">
                  <span className={`text-xs font-black uppercase ${currentTheme.heroAccent}`}>{tool.tag}</span>
                  {!tool.disabled && (
                    <Link href={tool.href} className={`px-6 py-2 ${currentTheme.btnPrimary}`}>
                      Launch
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "material") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-12 pb-6 border-b-2 border-[#e0e2ec] dark:border-[#44474e]">
            <h1 className={`text-5xl font-normal tracking-tight ${currentTheme.textPrimary}`}>
              Productivity Tools
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div 
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn("flex flex-col rounded-2xl overflow-hidden", currentTheme.cardBg)}
              >
                <div className={cn("h-32 w-full p-6 flex items-end", tool.gradient)}>
                  <tool.icon className="w-10 h-10 text-white" />
                </div>
                <div className="p-6 pt-8 relative flex flex-col flex-grow">
                  {!tool.disabled && (
                    <Link href={tool.href} className="absolute -top-7 right-6 w-14 h-14 rounded-full bg-[#0061a4] dark:bg-[#9ecafe] text-white dark:text-[#003258] shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <ArrowRight className="w-6 h-6" />
                    </Link>
                  )}
                  <h3 className={`text-xl font-medium mb-2 ${currentTheme.textPrimary}`}>{tool.name}</h3>
                  <p className={`text-sm mb-6 flex-grow ${currentTheme.textSecondary}`}>{tool.description}</p>
                  
                  <div className="flex gap-2">
                    {tool.features.slice(0, 2).map(f => (
                      <span key={f} className={`px-2 py-1 text-xs rounded-md ${currentTheme.tagBg} ${currentTheme.tagText}`}>{f}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "apple") {
    return (
      <div className={`relative min-h-screen py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h1 className={`text-7xl font-semibold tracking-tight mb-6 ${currentTheme.textPrimary}`}>
              Powerful apps.<br/>Made simple.
            </h1>
          </div>
          
          <div className="flex flex-col gap-24">
            {tools.map((tool, index) => (
              <motion.div 
                key={tool.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={cn("flex flex-col md:flex-row items-center gap-12 p-12 rounded-[40px]", currentTheme.cardBg)}
              >
                <div className={cn("w-32 h-32 rounded-[28px] flex items-center justify-center shadow-lg shrink-0", tool.gradient)}>
                  <tool.icon className="w-16 h-16 text-white" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-3xl font-semibold tracking-tight mb-4 ${currentTheme.textPrimary}`}>{tool.name}</h3>
                  <p className={`text-xl mb-6 ${currentTheme.textSecondary}`}>{tool.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                    {tool.features.map(f => (
                      <span key={f} className={`px-3 py-1 text-sm rounded-full ${currentTheme.tagBg} ${currentTheme.tagText}`}>{f}</span>
                    ))}
                  </div>
                  {!tool.disabled && (
                    <Link href={tool.href} className={`inline-block px-8 py-3 ${currentTheme.btnPrimary}`}>
                      Get Started
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "neumorphism") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className={`text-5xl font-bold mb-6 ${currentTheme.textPrimary}`}>
              My Tools
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
            {tools.map((tool, index) => (
              <motion.div 
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn("p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center text-center md:text-left", currentTheme.cardBg, currentTheme.cardShadow)}
              >
                <div className={cn("w-24 h-24 rounded-full flex items-center justify-center shadow-[inset_4px_4px_8px_rgb(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#1c1f23,inset_-3px_-3px_6px_#3a4147]", tool.disabled ? "opacity-50" : "")}>
                  <tool.icon className={`w-10 h-10 ${currentTheme.heroAccent}`} />
                </div>
                
                <div className="flex-1 flex flex-col h-full">
                  <h3 className={`text-2xl font-bold mb-3 ${currentTheme.textPrimary}`}>{tool.name}</h3>
                  <p className={`text-base mb-6 flex-grow ${currentTheme.textSecondary}`}>{tool.description}</p>
                  
                  {!tool.disabled && (
                    <Link href={tool.href} className={`px-6 py-3 mt-auto self-center md:self-start text-center ${currentTheme.btnPrimary}`}>
                      Launch Tool
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentTheme.layout === "micro-animations") {
    return (
      <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="mb-16 text-center"
          >
            <h2 className={`text-sm tracking-widest uppercase font-bold mb-2 ${currentTheme.heroAccent}`}>Interactive Suite</h2>
            <h1 className={`text-5xl font-bold ${currentTheme.textPrimary}`}>Explore Tools</h1>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={tool.id} className="group relative">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  className={cn("h-full p-8 rounded-3xl flex flex-col items-center text-center", currentTheme.cardBg, currentTheme.cardBorder)}
                >
                  <div className="relative w-16 h-16 mb-6">
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-indigo-500/20"
                      animate={{ rotate: tool.disabled ? 0 : [0, 90, 180, 270, 360] }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    />
                    <tool.icon className={`absolute inset-0 m-auto w-8 h-8 ${currentTheme.heroAccent} group-hover:scale-125 transition-transform duration-500`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${currentTheme.textPrimary} group-hover:text-indigo-500 transition-colors`}>{tool.name}</h3>
                  <p className={`text-sm mb-6 ${currentTheme.textSecondary}`}>{tool.description}</p>
                  
                  {!tool.disabled && (
                    <Link href={tool.href} className="mt-auto px-6 py-2 rounded-full border border-indigo-500/30 text-indigo-500 font-medium hover:bg-indigo-500 hover:text-white transition-all hover:scale-105 active:scale-95">
                      Open
                    </Link>
                  )}
                  {tool.disabled && (
                    <span className="mt-auto px-6 py-2 rounded-full border border-gray-500/30 text-gray-500 font-medium">Coming Soon</span>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback Grid layout (primarily used for Glassmorphism)
  return (
    <div className={`relative min-h-screen py-24 sm:py-32 px-4 transition-all duration-700 ${currentTheme.pageBg}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-6">
            <Wrench className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-400">Creative Tools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className={`transition-colors duration-700 ${currentTheme.accentColor}`}>
              Powerful Tools
            </span>
            <br />
            <span className={`transition-colors duration-700 ${currentTheme.textPrimary}`}>For Creators</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-700 ${currentTheme.textSecondary}`}>
            A collection of premium tools designed to help you create stunning content
            quickly and efficiently.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className={`grid gap-6 ${currentTheme.layout === "bento" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={currentTheme.layout === "bento" && index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              {tool.disabled ? (
                <div
                  className={cn(
                    "relative group h-full p-6 rounded-2xl border transition-all duration-300",
                    "bg-background/50 border-border opacity-60 cursor-not-allowed",
                    currentTheme.layout === "bento" ? "bg-zinc-900/80 rounded-3xl" : ""
                  )}
                >
                  <ToolCardContent tool={tool} currentTheme={currentTheme} />
                </div>
              ) : (
                <Link href={tool.href}>
                  <div
                    className={cn(
                      "relative group h-full p-6 rounded-2xl transition-all duration-700",
                      currentTheme.cardBg,
                      currentTheme.cardBorder,
                      currentTheme.cardShadow,
                      currentTheme.cardHover,
                      tool.shadowColor
                    )}
                  >
                    <ToolCardContent tool={tool} currentTheme={currentTheme} />
                    
                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className={cn(
                        "p-2 rounded-full bg-gradient-to-r",
                        tool.gradient
                      )}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Smartphone, label: "Platforms", value: "5+" },
            { icon: Music, label: "Audio Formats", value: "3+" },
            { icon: Download, label: "Export Quality", value: "HD" },
            { icon: Zap, label: "Processing", value: "Fast" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`p-6 rounded-2xl text-center transition-all duration-700 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 transition-colors duration-700 ${currentTheme.accentColor}`} />
              <p className={`text-2xl font-bold transition-colors duration-700 ${currentTheme.textPrimary}`}>{stat.value}</p>
              <p className={`text-sm transition-colors duration-700 ${currentTheme.textSecondary}`}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ToolCardContent({ tool, currentTheme }: { tool: typeof tools[0], currentTheme: DesignTheme }) {
  return (
    <>
      {/* Tag */}
      <div className="absolute top-4 right-4">
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-semibold text-white",
          tool.tagColor
        )}>
          {tool.tag}
        </span>
      </div>

      {/* Icon */}
      <div className={cn(
        "inline-flex p-3 rounded-xl bg-gradient-to-r mb-4",
        tool.gradient
      )}>
        <tool.icon className="w-6 h-6 text-white" />
      </div>

      {/* Title & Description */}
      <h3 className={`text-xl font-semibold mb-2 transition-colors duration-700 ${currentTheme.textPrimary}`}>{tool.name}</h3>
      <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-700 ${currentTheme.textSecondary}`}>{tool.description}</p>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {tool.features.map((feature) => (
          <span
            key={feature}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-700 ${currentTheme.tagBg} ${currentTheme.tagText} ${currentTheme.tagBorder}`}
          >
            {feature}
          </span>
        ))}
      </div>
    </>
  );
}
