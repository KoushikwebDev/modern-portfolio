"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useDesignRotator } from "./DesignRotator";

const skills = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  {
    name : "Material UI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg"
  },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

export default function Skills() {
  const { currentTheme } = useDesignRotator();

  if (currentTheme.layout === "brutalist") {
    return (
      <section className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-5xl font-black uppercase tracking-tighter mb-6 ${currentTheme.textPrimary}`}>
              BRUTAL SKILLS
            </h2>
            <div className={`w-32 h-2 mx-auto mb-4 ${currentTheme.heroAccent.replace('text-', 'bg-')} transform rotate-2`}></div>
            <p className={`text-xl font-bold uppercase ${currentTheme.textSecondary}`}>
              TECH STACK DOMINATION
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`flex flex-col items-center p-6 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} transition-all duration-300`}
              >
                <div className="relative w-16 h-16 mb-4 border-4 border-black dark:border-white p-2">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h3 className={`text-sm font-black uppercase text-center ${currentTheme.textPrimary}`}>
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "bento") {
    return (
      <section className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className={`inline-block px-4 py-2 rounded-full mb-4 ${currentTheme.tagBg} ${currentTheme.tagText}`}>
              Tech Stack
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${currentTheme.textPrimary}`}>
              Skills & Technologies
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary}`}>
              Technologies I work with to bring ideas to life
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`flex flex-col items-center p-4 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} rounded-2xl transition-all duration-500`}
              >
                <div className="relative w-12 h-12 mb-3">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className={`text-xs font-semibold text-center ${currentTheme.textPrimary}`}>
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "3d") {
    return (
      <section className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`} style={{ perspective: "2000px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${currentTheme.textPrimary} font-mono transform rotateX-2`}>
              TECH ARSENAL
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary} font-mono`}>
              > Loading skill modules...
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
                className={`flex flex-col items-center p-4 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} transition-all duration-500 transform perspective-1000 hover:rotateY-10`}
              >
                <div className="relative w-12 h-12 mb-3 p-2 border-2 border-green-400 dark:border-green-400 rounded">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain filter contrast-125"
                  />
                </div>
                <h3 className={`text-xs font-bold text-center ${currentTheme.textPrimary} font-mono`}>
                  [{skill.name}]
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentTheme.layout === "retro") {
    return (
      <section className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-black mb-4 ${currentTheme.textPrimary}`}>
              ✨ SKILLS MATRIX ✨
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary}`}>
              My cyber toolkit for digital creation
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.15, rotate: Math.random() * 10 - 5, y: -10 }}
                className={`flex flex-col items-center p-4 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} transition-all duration-500 rounded-3xl transform hover:animate-pulse`}
              >
                <div className="relative w-12 h-12 mb-3 rounded-full border-3 border-dashed border-current p-1">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <h3 className={`text-xs font-bold text-center ${currentTheme.textPrimary}`}>
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default layout for glassmorphism, minimalist, material, apple, neumorphism, micro-animations
  return (
    <section className={`py-20 transition-all duration-700 ${currentTheme.pageBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl font-bold mb-4 transition-all duration-700 ${currentTheme.textPrimary}`}>
            Skills & Technologies
          </h2>
          <p className={`text-lg transition-all duration-700 ${currentTheme.textSecondary}`}>
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex flex-col items-center p-4 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} ${currentTheme.cardHover} transition-all duration-700`}
            >
              <div className="relative w-12 h-12 mb-3">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className={`text-sm font-medium text-center transition-all duration-700 ${currentTheme.textPrimary}`}>
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}