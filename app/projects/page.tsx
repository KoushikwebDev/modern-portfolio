"use client";
import React from "react";


import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../utils/index";
import { useDesignRotator } from "@/components/DesignRotator";

function page() {
  const { currentTheme } = useDesignRotator();
  return (
    <section id="projects" className={`py-20 min-h-screen transition-all duration-700 ${currentTheme.pageBg}`}>
      {currentTheme.layout === "minimalist" && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-light mb-4 transition-colors duration-700 ${currentTheme.textPrimary}`}>Projects</h2>
          </div>
          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-b border-gray-200 dark:border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-baseline gap-4">
                <div>
                  <h3 className={`text-2xl mb-2 ${currentTheme.textPrimary}`}>{project.title}</h3>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{project.tags.join(" / ")}</p>
                </div>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`text-sm uppercase tracking-widest ${currentTheme.textPrimary} hover:opacity-50`}>View Project</a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "brutalist" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-l-8 border-r-8 border-black">
          <div className="text-left mb-16 border-b-8 border-black pb-8">
            <h2 className={`text-7xl font-black uppercase tracking-tighter ${currentTheme.textPrimary}`}>WORK</h2>
          </div>
          <div className="flex flex-col gap-16">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className={`border-4 border-black p-8 shadow-[12px_12px_0_0_#000] hover:-translate-y-2 hover:shadow-[16px_16px_0_0_#000] transition-all bg-white`}>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2 border-4 border-black relative h-64 lg:h-auto">
                    <Image src={project.image} alt={project.title} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                  </div>
                  <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-5xl font-black uppercase mb-4 text-black`}>{project.title}</h3>
                      <p className={`text-xl font-bold mb-6 text-black`}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map(tag => (
                          <span key={tag} className="border-2 border-black bg-yellow-400 px-4 py-1 font-bold text-black uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="border-4 border-black bg-black text-white px-8 py-4 font-black uppercase hover:bg-yellow-400 hover:text-black transition-colors">Launch</a>}
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="border-4 border-black bg-white text-black px-8 py-4 font-black uppercase hover:bg-black hover:text-white transition-colors">Source</a>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "bento" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 ${currentTheme.textPrimary}`}>Selected Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className={`p-6 rounded-3xl flex flex-col ${index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1"} ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                <div className={`relative w-full rounded-2xl overflow-hidden mb-6 ${index === 0 ? "h-80" : "h-48"}`}>
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${currentTheme.textPrimary}`}>{project.title}</h3>
                <p className={`mb-4 ${currentTheme.textSecondary}`}>{project.description}</p>
                <div className="mt-auto pt-4 flex gap-4 border-t border-zinc-800">
                  {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={currentTheme.heroAccent}>Live Site</a>}
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={currentTheme.textSecondary}>Code</a>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "retro" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className={`text-4xl font-mono mb-4 text-black bg-white inline-block border-2 border-black p-2 shadow-[4px_4px_0_0_#000]`}>Projects.dir</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="border-2 border-white shadow-[4px_4px_0_0_#000] bg-[#c0c0c0]">
                <div className="bg-blue-800 p-1 flex justify-between items-center text-white font-bold font-mono text-sm">
                  <span>{project.title}.exe</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080]" />
                    <div className="w-3 h-3 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080]" />
                    <div className="w-3 h-3 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black shadow-[inset_-1px_-1px_0_0_#808080] text-black text-[8px] flex justify-center items-center">X</div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white m-1">
                  <div className="relative h-48 mb-4 border-2 border-black">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                  <p className="font-mono text-black text-sm mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="font-mono px-4 py-1 text-xs border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black bg-[#c0c0c0] text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">Run Program</a>}
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="font-mono px-4 py-1 text-xs border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black bg-[#c0c0c0] text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">View Source</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "3d" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: "1500px" }}>
          <div className="text-center mb-20" style={{ transform: "translateZ(100px)" }}>
            <h2 className={`text-6xl font-black mb-4 ${currentTheme.textPrimary} drop-shadow-xl`}>Projects</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" style={{ transformStyle: "preserve-3d" }}>
            {projects.map((project, index) => (
              <motion.div 
                key={project.title} 
                initial={{ rotateX: 30, rotateY: 10, opacity: 0, z: -200 }} 
                whileInView={{ rotateX: 15, rotateY: 0, opacity: 1, z: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.2, type: "spring" }} 
                className={`flex flex-col p-8 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-64 w-full mb-8 shadow-2xl" style={{ transform: "translateZ(40px)" }}>
                  <Image src={project.image} alt={project.title} fill className="object-cover border-4 border-slate-800" />
                </div>
                <div style={{ transform: "translateZ(60px)" }}>
                  <h3 className={`text-3xl font-black mb-4 ${currentTheme.textPrimary}`}>{project.title}</h3>
                  <p className={`mb-6 ${currentTheme.textSecondary}`}>{project.description}</p>
                  <div className="flex gap-4">
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`px-6 py-2 ${currentTheme.btnPrimary}`}>Live Demo</a>}
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={`px-6 py-2 ${currentTheme.btnSecondary}`}>Code</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "material" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12 border-b-2 border-[#e0e2ec] dark:border-[#44474e] pb-4">
            <h2 className={`text-4xl font-medium ${currentTheme.textPrimary}`}>Portfolio Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`flex flex-col overflow-hidden ${currentTheme.cardBg}`}>
                <div className="relative h-48 w-full">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-[#0061a4] dark:bg-[#9ecafe] text-white dark:text-[#003258] shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-10">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <div className="p-6 pt-8 flex flex-col flex-grow">
                  <h3 className={`text-2xl font-medium mb-2 ${currentTheme.textPrimary}`}>{project.title}</h3>
                  <p className={`mb-6 flex-grow ${currentTheme.textSecondary}`}>{project.description}</p>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${currentTheme.heroAccent} hover:underline uppercase`}>View Code</a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "apple" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className={`text-6xl font-semibold tracking-tight ${currentTheme.textPrimary}`}>Apps.</h2>
          </div>
          <div className="flex flex-col gap-24">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-12 md:p-16 rounded-[40px] ${currentTheme.cardBg} flex flex-col md:flex-row gap-12 items-center`}>
                <div className="w-full md:w-1/2">
                  <h3 className={`text-4xl font-semibold tracking-tight mb-4 ${currentTheme.textPrimary}`}>{project.title}</h3>
                  <p className={`text-xl mb-8 ${currentTheme.textSecondary}`}>{project.description}</p>
                  <div className="flex gap-4">
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 ${currentTheme.btnPrimary}`}>View Live</a>}
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 ${currentTheme.btnSecondary}`}>Source Code</a>}
                  </div>
                </div>
                <div className="w-full md:w-1/2 relative h-[300px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "neumorphism" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 ${currentTheme.textPrimary}`}>My Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`p-10 rounded-[2rem] flex flex-col ${currentTheme.cardBg} ${currentTheme.cardShadow}`}>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8 shadow-[inset_4px_4px_8px_rgb(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#1c1f23,inset_-3px_-3px_6px_#3a4147] p-2">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${currentTheme.textPrimary}`}>{project.title}</h3>
                <p className={`mb-8 ${currentTheme.textSecondary}`}>{project.description}</p>
                <div className="flex gap-4 mt-auto">
                  {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 text-center flex-1 ${currentTheme.btnPrimary}`}>Live Demo</a>}
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 text-center flex-1 ${currentTheme.btnSecondary}`}>Code</a>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {currentTheme.layout === "micro-animations" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className={`text-sm tracking-widest uppercase font-bold mb-2 ${currentTheme.heroAccent}`}>Selected Work</h2>
            <p className={`text-4xl font-bold ${currentTheme.textPrimary}`}>Explore my latest projects</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div key={project.title} className="group relative">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className={`absolute -inset-4 rounded-3xl ${currentTheme.cardBg} ${currentTheme.cardShadow} opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 -z-10`} 
                />
                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }} className="w-full sm:w-1/3 relative h-32 sm:h-auto rounded-2xl overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </motion.div>
                  <div className="w-full sm:w-2/3 flex flex-col justify-center">
                    <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className={`text-2xl font-bold mb-2 ${currentTheme.textPrimary} group-hover:text-indigo-500 transition-colors`}>{project.title}</motion.h3>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className={`text-sm mb-4 ${currentTheme.textSecondary}`}>{project.description}</motion.p>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex gap-4">
                      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`text-sm font-bold flex items-center gap-1 ${currentTheme.textPrimary} group-hover:text-indigo-500`}><ExternalLink className="w-4 h-4" /> Live</a>}
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={`text-sm font-bold flex items-center gap-1 ${currentTheme.textSecondary} hover:text-indigo-400`}><Github className="w-4 h-4" /> Source</a>}
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback layout primarily used for Glassmorphism now */}
      {!["minimalist", "brutalist", "bento", "retro", "3d", "material", "apple", "neumorphism", "micro-animations"].includes(currentTheme.layout) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-700 ${currentTheme.textPrimary}`}>Live Projects</h2>
            <p className={`text-lg transition-colors duration-700 ${currentTheme.textSecondary}`}>Some of my work that showcases my skills</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className={`rounded-xl overflow-hidden transition-all duration-700 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover}`}>
                <div className="relative h-48">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-700 ${currentTheme.textPrimary}`}>{project.title}</h3>
                  <p className={`mb-4 transition-colors duration-700 ${currentTheme.textSecondary}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-sm transition-colors duration-700 ${currentTheme.tagBg} ${currentTheme.tagText} ${currentTheme.tagBorder}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center hover:opacity-80 transition-colors duration-700 ${currentTheme.textSecondary}`}><Github className="w-5 h-5 mr-2" />Code</a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`flex items-center hover:opacity-80 transition-colors duration-700 ${currentTheme.accentColor}`}><ExternalLink className="w-5 h-5 mr-2" />Live Demo</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default page;
