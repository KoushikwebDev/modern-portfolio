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
    tag: "New",
    tagColor: "bg-emerald-500",
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
  return (
    <div className="relative min-h-screen py-24 sm:py-32 px-4">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">
              Powerful Tools
            </span>
            <br />
            <span className="text-foreground">For Creators</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of premium tools designed to help you create stunning content
            quickly and efficiently.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {tool.disabled ? (
                <div
                  className={cn(
                    "relative group h-full p-6 rounded-2xl border transition-all duration-300",
                    "bg-background/50 border-border opacity-60 cursor-not-allowed"
                  )}
                >
                  <ToolCardContent tool={tool} />
                </div>
              ) : (
                <Link href={tool.href}>
                  <div
                    className={cn(
                      "relative group h-full p-6 rounded-2xl border transition-all duration-300",
                      "bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm",
                      "border-violet-500/20 hover:border-violet-500/50",
                      "hover:shadow-2xl",
                      tool.shadowColor
                    )}
                  >
                    <ToolCardContent tool={tool} />
                    
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
              className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/10 text-center"
            >
              <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ToolCardContent({ tool }: { tool: typeof tools[0] }) {
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
      <h3 className="text-xl font-semibold text-foreground mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tool.description}</p>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {tool.features.map((feature) => (
          <span
            key={feature}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20"
          >
            {feature}
          </span>
        ))}
      </div>
    </>
  );
}
