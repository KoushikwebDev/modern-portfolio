"use client";

import personalinfo from "@/lib/personalInfo";
import { motion } from "framer-motion";
import { useDesignRotator } from "@/components/DesignRotator";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "ReactJS",
  "NextJS",
  "Redux Toolkit",
  "NodeJS",
  "Express",
  "MongoDB",
  "TypeScript",
  "Git",
  "Python",
  "Material UI",
  "Google Maps API",
  "OpenAI API",
  "Firebase",
  "NextAuth",
  "Java",
  "Spring Boot",
  "MySQL",
  "PostgreSQL",
];

export default function Page() {
  const { currentTheme } = useDesignRotator();

  return (
    <div className={`min-h-screen ${currentTheme.pageBg} transition-all duration-700 flex flex-col items-center justify-center px-4 pt-20 lg:pt-0`}>
      {/* Animated Introduction */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className={`text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 transition-colors duration-700 ${currentTheme.accentColor}`}>
          Hello, I'm {personalinfo.name}
        </h1>
        <p className={`mt-2 text-lg sm:text-xl transition-colors duration-700 ${currentTheme.textSecondary}`}>
          Software Engineer at {personalinfo.company}
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`mt-8 ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardShadow} transition-all duration-700 rounded-lg p-6 sm:p-8 w-full max-w-3xl text-center`}
      >
        <p className={`text-lg leading-relaxed transition-colors duration-700 ${currentTheme.textSecondary}`}>
          I have 3+ years of experience in web development, specializing in
          building real-time applications like eCommerce, insurance platforms,
          and commission-based websites using the latest technologies. My
          passion for crafting seamless user experiences and scalable
          applications drives me to stay updated with modern web trends. I'm
          always eager to take on challenging projects and push the boundaries
          of innovation.
        </p>
        <p className={`mt-4 text-xl font-semibold transition-colors duration-700 ${currentTheme.accentColor}`}>
          Let's discuss over coffee ☕!
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-10 text-center"
      >
        <h2 className={`text-2xl font-bold transition-colors duration-700 ${currentTheme.textPrimary}`}>
          My Skills
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm sm:text-base cursor-pointer transition-all duration-700 ${currentTheme.tagBg} ${currentTheme.tagText} ${currentTheme.tagBorder}`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
