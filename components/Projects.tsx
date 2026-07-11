"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useDesignRotator } from "./DesignRotator";

import greenGalli from "../public/images/project/Green-Galli.png";
import commissionGG from "../public/images/project/Commission-GG.png";
import sbiGeneral from "../public/images/project/sbi-general.png";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, TypeScript, and Node.js.",
    image: greenGalli,
    github: "",
    demo: "https://mamakidsntails-dev.dedicateddevelopers.us/",
    tags: ["Next.js", "TypeScript", "Material UI", "Node.js", "MongoDB"],
  },
  {
    title: "SBI General Insurance",
    description:
      "A feature-rich insurance platform built with Next.js and React, offering seamless policy browsing, claims management, and user-friendly interfaces for customers to explore various insurance plans.",
    image: sbiGeneral,
    github: "",
    demo: "https://www.sbigeneral.in/",
    tags: ["React", "Next.js"],
  },
  {
    title: "Creators Hub",
    description:
      "A modern platform for creative professionals to connect, collaborate, and grow their careers.",
    image: commissionGG,
    github: "",
    demo: "https://commission-gg-ui.dedicateddevelopers.us/",
    tags: ["OpenAI", "React", "Express", "AWS"],
  },
];

export default function Projects() {
  const { currentTheme } = useDesignRotator();

  if (currentTheme.layout === "brutalist") {
    return (
      <section id="projects" className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-5xl font-black uppercase tracking-tighter mb-6 ${currentTheme.textPrimary}`}>
              MY BRUTAL PROJECTS
            </h2>
            <div className={`w-32 h-2 mx-auto mb-4 ${currentTheme.heroAccent.replace('text-', 'bg-')} transform -rotate-2`}></div>
            <p className={`text-xl font-bold uppercase ${currentTheme.textSecondary}`}>
              SMASH YOUR EXPECTATIONS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} overflow-hidden transition-all duration-300`}
              >
                <div className="relative h-48 border-b-4 border-black dark:border-white">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-black uppercase mb-2 ${currentTheme.textPrimary}`}>
                    {project.title}
                  </h3>
                  <p className={`font-bold mb-4 ${currentTheme.textSecondary}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 font-black uppercase text-xs ${currentTheme.tagBg} ${currentTheme.tagText} ${currentTheme.tagBorder}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center font-black uppercase ${currentTheme.btnSecondary} px-4 py-2 transition-all duration-300`}
                      >
                        <Github className="w-5 h-5 mr-2" />
                        CODE
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center font-black uppercase ${currentTheme.btnPrimary} px-4 py-2 transition-all duration-300`}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        DEMO
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "bento") {
    return (
      <section id="projects" className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className={`inline-block px-4 py-2 rounded-full mb-4 ${currentTheme.tagBg} ${currentTheme.tagText}`}>
              Portfolio
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${currentTheme.textPrimary}`}>
              Featured Projects
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary}`}>
              Crafted with precision and attention to detail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} overflow-hidden transition-all duration-500 rounded-3xl`}
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-3xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${currentTheme.textPrimary}`}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 ${currentTheme.textSecondary}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-sm rounded-xl ${currentTheme.tagBg} ${currentTheme.tagText}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center ${currentTheme.btnSecondary} px-4 py-2 rounded-xl transition-all duration-300`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center ${currentTheme.btnPrimary} px-4 py-2 rounded-xl transition-all duration-300`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "3d") {
    return (
      <section id="projects" className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`} style={{ perspective: "2000px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${currentTheme.textPrimary} transform rotateX-2`}>
              CYBER PROJECTS
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary} font-mono`}>
              > Initializing project matrix...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} overflow-hidden transition-all duration-500 transform perspective-1000 hover:rotateY-5 hover:rotateX-5`}
              >
                <div className="relative h-48 border-b-2 border-green-400 dark:border-green-400">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-green-400/10 dark:bg-green-400/20"></div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${currentTheme.textPrimary} font-mono`}>
                    {"> " + project.title}
                  </h3>
                  <p className={`mb-4 ${currentTheme.textSecondary} font-mono text-sm`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-mono font-bold ${currentTheme.tagBg} ${currentTheme.tagText} ${currentTheme.tagBorder}`}
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center font-mono font-bold ${currentTheme.btnSecondary} px-4 py-2 transition-all duration-300`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        SOURCE
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center font-mono font-bold ${currentTheme.btnPrimary} px-4 py-2 transition-all duration-300`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        EXECUTE
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default layout for glassmorphism, minimalist, retro, material, apple, neumorphism, micro-animations
  return (
    <section id="projects" className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl font-bold mb-4 transition-all duration-700 ${currentTheme.textPrimary}`}>
            Featured Projects
          </h2>
          <p className={`text-lg transition-all duration-700 ${currentTheme.textSecondary}`}>
            Some of my recent work that showcases my skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} overflow-hidden transition-all duration-700`}
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 transition-all duration-700 ${currentTheme.textPrimary}`}>
                  {project.title}
                </h3>
                <p className={`mb-4 transition-all duration-700 ${currentTheme.textSecondary}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm transition-all duration-700 ${currentTheme.tagBg} ${currentTheme.tagText} ${currentTheme.tagBorder}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center transition-all duration-700 ${currentTheme.textSecondary} hover:${currentTheme.textPrimary}`}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center transition-all duration-700 ${currentTheme.accentColor}`}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
