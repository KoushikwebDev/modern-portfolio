"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WelcomeCharacter from "@/components/WelcomeCharacter";
import { useDesignRotator } from "@/components/DesignRotator";

export default function Home() {
  const { currentTheme } = useDesignRotator();
  
  return (
    <main className={`min-h-screen transition-all duration-700 ${currentTheme.pageBg}`}>
      <Hero />
      <Projects />
      <Skills />
      <WelcomeCharacter />
    </main>
  );
}