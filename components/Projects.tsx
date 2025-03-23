"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import greenGalli from "../public/images/project/Green-Galli.png";
import commissionGG from "../public/images/project/Commission-GG.png";
import sbiGeneral from "../public/images/project/sbi-general.png";



const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, TypeScript, and Node.js.",
    image: greenGalli,
    github: "",
    demo: "https://mamakidsntails-dev.dedicateddevelopers.us/",
    tags: ["Next.js", "TypeScript", "Material UI", "Node.js", "MongoDB"]
  },
  {
    title: "SBI General Insurance",
    description: "A feature-rich insurance platform built with Next.js and React, offering seamless policy browsing, claims management, and user-friendly interfaces for customers to explore various insurance plans.",
    image: sbiGeneral,
    github: "",
    demo: "https://www.sbigeneral.in/",
    tags: ["React", "Next.js"]
  },
  {
    title: "Creators Hub",
    description: "An AI-powered image generation tool using DALL-E API and modern web technologies.",
    image: commissionGG,
    github: "",
    demo: "https://commission-gg-ui.dedicateddevelopers.us/",
    tags: ["OpenAI", "React", "Express", "AWS"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Some of my recent work that showcases my skills</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  {
                    project.github &&                   <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  }

                  {
                    project.demo &&   <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                  }

                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}