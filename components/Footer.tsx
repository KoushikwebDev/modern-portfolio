import personalinfo from "@/lib/personalInfo";
import Link from "next/link";


export default function Footer() {
  return (
    <footer id="footer" className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  About
                </a>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href={personalinfo.github} target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href={personalinfo.linkedin} target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Email: {personalinfo.email}<br />
              Location: {personalinfo.location} <br />
              Phone: {personalinfo.ph}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {personalinfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}