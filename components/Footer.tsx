"use client";

import personalinfo from "@/lib/personalInfo";
import Link from "next/link";
import { useDesignRotator } from "./DesignRotator";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "GitHub", href: personalinfo.github },
    { name: "LinkedIn", href: personalinfo.linkedin },
    { name: "Twitter", href: "https://twitter.com" },
  ],
};

export default function Footer() {
  const { currentTheme } = useDesignRotator();

  return (
    <footer className={`border-t transition-all duration-700 ${currentTheme.footerBg} ${currentTheme.footerBorder}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-lg font-semibold transition-colors duration-700 ${currentTheme.textPrimary} mb-4`}>Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={`transition-colors duration-700 ${currentTheme.textSecondary} hover:${currentTheme.accentColor.replace('text-', 'text-')}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold transition-colors duration-700 ${currentTheme.textPrimary} mb-4`}>Connect</h3>
            <ul className="space-y-2">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={`transition-colors duration-700 ${currentTheme.textSecondary} hover:${currentTheme.accentColor.replace('text-', 'text-')}`}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold transition-colors duration-700 ${currentTheme.textPrimary} mb-4`}>Contact</h3>
            <p className={`transition-colors duration-700 ${currentTheme.textSecondary}`}>
              Email: {personalinfo.email}<br />
              Location: {personalinfo.location} <br />
              Phone: {personalinfo.ph}
            </p>
          </div>
        </div>
        <div className={`mt-8 pt-8 border-t transition-all duration-700 ${currentTheme.footerBorder}`}>
          <p className={`text-center transition-colors duration-700 ${currentTheme.textSecondary}`}>
            © {new Date().getFullYear()} {personalinfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}