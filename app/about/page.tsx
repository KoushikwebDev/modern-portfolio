"use client";

import { motion } from "framer-motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "ReactJS",
  "NextJS",
  "Redux",
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
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      {/* Animated Introduction */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Hello, I'm Koushik Saha
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-gray-300">
          Software Engineer at Indus Net Technologies
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-3xl text-center"
      >
        <p className="text-gray-300 text-lg leading-relaxed">
          I have 3+ years of experience in web development, specializing in
          building real-time applications like eCommerce, insurance platforms,
          and commission-based websites using the latest technologies. My
          passion for crafting seamless user experiences and scalable
          applications drives me to stay updated with modern web trends. I'm
          always eager to take on challenging projects and push the boundaries
          of innovation.
        </p>
        <p className="mt-4 text-xl font-semibold text-blue-400">
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
  <h2 className="text-2xl font-bold text-gray-100">My Skills</h2>
  <div className="mt-4 flex flex-wrap justify-center gap-3">
    {skills.map((skill, index) => (
      <motion.span
        key={index}
        whileHover={{
          scale: 1.1,
          backgroundColor: ["#1f2937", "#2563eb", "#9333ea", "#f43f5e", "#1f2937"], // Colors cycle
          transition: { duration: 1.5, repeat: Infinity, ease: "linear" } // Smooth looping animation
        }}
        className="px-4 py-2 rounded-full bg-gray-800 text-gray-200 text-sm sm:text-base border border-gray-600 cursor-pointer transition"
      >
        {skill}
      </motion.span>
    ))}
  </div>
</motion.div>

    </div>
  );
}
