"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WelcomeCharacter from "@/components/WelcomeCharacter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Projects />
      <Skills />
      <WelcomeCharacter />
    </main>
  );
}