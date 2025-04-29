"use client";

import { motion } from "framer-motion";
import {
  FaCode,
  FaHeart,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", to: "/features" },
        { name: "Pricing", to: "/pricing" },
        { name: "Premium", to: "/premium" },
        { name: "Mobile App", to: "/mobile" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", to: "/about" },
        { name: "Careers", to: "/careers" },
        { name: "Blog", to: "/blog" },
        { name: "Press", to: "/press" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Community", to: "/community" },
        { name: "Events", to: "/events" },
        { name: "Help Center", to: "/help" },
        { name: "Partners", to: "/partners" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", to: "/privacy" },
        { name: "Terms", to: "/terms" },
        { name: "Cookie Policy", to: "/cookies" },
        { name: "Guidelines", to: "/guidelines" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Top section with logo and newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-gray-700">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-purple-600 p-1.5 rounded-full flex items-center justify-center">
                <FaCode className="text-white text-sm mr-0.5" />
              </div>
              <span className=" text-white font-bold text-lg">DevTinder</span>
              <div className="bg-purple-600 p-1.5 rounded-full flex items-center justify-center">
                <FaHeart className="text-white text-xs" />
              </div>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              DevTinder connects developers based on coding preferences, tech
              stacks, and project interests. Find your perfect coding partner
              today.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a
                to="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Stay up to date
            </h3>
            <p className="text-gray-400 mb-4">
              Get notified about new features and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                required
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Middle section with links */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-400 text-sm mr-2">Made with</span>
            <FaCode className="text-purple-500 h-3 w-3 mx-1" />
            <span className="text-gray-400 text-sm mx-1">and</span>
            <FaHeart className="text-purple-500 h-3 w-3 mx-1" />
            <span className="text-gray-400 text-sm ml-1">
              by developers for developers
            </span>
          </div>
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="h-4 w-4 text-gray-400" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
