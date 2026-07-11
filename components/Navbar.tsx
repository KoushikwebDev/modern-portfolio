"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Wand2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import personalinfo from "@/lib/personalInfo";
import { useDesignRotator } from "./DesignRotator";
import { DEFAULT_HOME_DESIGN } from "@/lib/homeDesign";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Tools", path: "/tools" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const design = DEFAULT_HOME_DESIGN;
  const { currentTheme, isFunkyMode, toggleFunkyMode } = useDesignRotator();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  const navClass = currentTheme.navBg;
  const mutedLinkClass = currentTheme.navText;
  const activeLinkClass = currentTheme.navActive;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${navClass}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link
              href="/"
              className={`text-base font-bold tracking-[-0.04em] sm:text-lg transition-colors duration-700 ${currentTheme.textPrimary}`}
            >
              {personalinfo.name}
            </Link>
          </motion.div>

          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-700 ${
                  pathname === item.path ? activeLinkClass : mutedLinkClass
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isHome && (
              <Link
                href="/contact"
                className={`ml-3 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all duration-700 hover:-translate-y-0.5 rounded-full ${currentTheme.navCta}`}
              >
                {design.navbarCta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <div className="ml-2 flex items-center gap-2">
              <button
                onClick={toggleFunkyMode}
                title={isFunkyMode ? "Disable Funky Mode" : "Enable Funky Mode"}
                className={`p-2 rounded-lg transition-colors ${
                  isFunkyMode 
                    ? "bg-purple-500 text-white" 
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Wand2 size={20} className={isFunkyMode ? "animate-pulse" : ""} />
              </button>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={toggleFunkyMode}
              title={isFunkyMode ? "Disable Funky Mode" : "Enable Funky Mode"}
              className={`p-2 rounded-lg transition-colors ${
                isFunkyMode 
                  ? "bg-purple-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}
            >
              <Wand2 size={20} />
            </button>
            <ThemeToggle />
            <button
              type="button"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setIsOpen((open) => !open)}
              className={`rounded-lg p-2 transition-colors duration-700 ${currentTheme.textPrimary}`}
            >
              {isOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute left-0 top-[4.5rem] w-full p-4 shadow-xl sm:hidden transition-all duration-700 ${navClass}`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-all duration-700 ${
                    pathname === item.path ? activeLinkClass : mutedLinkClass
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isHome && (
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold transition-all duration-700 ${currentTheme.navCta}`}
                >
                  {design.navbarCta}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
