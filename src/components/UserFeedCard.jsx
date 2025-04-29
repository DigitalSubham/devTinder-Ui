"use client";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaHeart,
  FaTimes,
  FaGithub,
  FaDatabase,
  FaCalendarAlt,
  FaCode,
} from "react-icons/fa";

export default function DevCard({
  user,
  onAccept,
  onReject,
  showButtons = true,
}) {
  const [exitDirection, setExitDirection] = useState("");
  const [expanded, setExpanded] = useState(false);

  // For swipe functionality
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Transform x value to background color and icon opacity
  const acceptIconOpacity = useTransform(x, [0, 100, 200], [0, 0.8, 1]);
  const rejectIconOpacity = useTransform(x, [-200, -100, 0], [1, 0.8, 0]);
  const cardBgColor = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [
      "rgba(239, 68, 68, 0.2)", // Red with opacity
      "rgba(239, 68, 68, 0.1)",
      "rgba(0, 0, 0, 0)",
      "rgba(16, 185, 129, 0.1)",
      "rgba(16, 185, 129, 0.2)", // Green with opacity
    ]
  );

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      setExitDirection("right");
      onAccept(user._id);
    } else if (info.offset.x < -100) {
      setExitDirection("left");
      onReject(user._id);
    } else {
      x.set(0); // Reset position if not swiped far enough
    }
  };

  // Generate a random tech-related bio since one isn't provided
  const techBios = [
    `Passionate about ${user.techStack} development and building scalable applications.`,
    `Looking for collaborators on ${user.techStack} projects. Let's build something amazing!`,
    `${user.techStack} enthusiast with a love for clean code and efficient solutions.`,
    `Exploring the depths of ${user.techStack} and always eager to learn new technologies.`,
    `Building the future with ${user.techStack}, one line of code at a time.`,
  ];

  const randomBio = techBios[Math.floor(Math.random() * techBios.length)];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative w-full max-w-sm mx-auto h-[500px]"
        key={user._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          x:
            exitDirection === "left"
              ? -300
              : exitDirection === "right"
              ? 300
              : 0,
          opacity: 0,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
          style={{
            x,
            rotate,
            backgroundColor: cardBgColor,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Accept Icon Overlay */}
          <motion.div
            className="absolute top-8 right-8 bg-green-500 rounded-full p-4 border-4 border-white z-10 shadow-lg"
            style={{ opacity: acceptIconOpacity }}
          >
            <FaHeart className="text-white text-2xl" />
          </motion.div>

          {/* Reject Icon Overlay */}
          <motion.div
            className="absolute top-8 left-8 bg-red-500 rounded-full p-4 border-4 border-white z-10 shadow-lg"
            style={{ opacity: rejectIconOpacity }}
          >
            <FaTimes className="text-white text-2xl" />
          </motion.div>

          {/* Card Content */}
          <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col">
            {/* Profile Image */}
            <div className="h-1/2 bg-gradient-to-br from-purple-900 to-gray-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-gray-700 p-8 border-4 border-purple-500">
                  <FaCode className="text-6xl text-purple-400" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white capitalize">
                    {user.name}
                  </h2>
                  <div className="flex items-center mt-1 text-gray-300">
                    <FaDatabase className="mr-1 text-purple-400" />
                    <span className="text-sm">{user.techStack}</span>
                  </div>
                </div>
                <a
                  href={`https://github.com/${user.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <FaGithub className="text-xl text-white" />
                </a>
              </div>

              <div className="mt-4 text-gray-300 text-sm flex items-center">
                <FaGithub className="mr-2 text-gray-400" />
                <span>@{user.githubUsername}</span>
              </div>

              <div className="mt-4 bg-gray-800 rounded-lg p-4 flex-1">
                <p className="text-gray-300 text-sm">{randomBio}</p>

                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 text-sm text-gray-400"
                  >
                    <p className="mb-2">Email: {user.email}</p>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-purple-400" />
                      <span>Joined {formatDate(user.createdAt)}</span>
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 text-purple-400 text-sm hover:text-purple-300"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            {showButtons && (
              <div className="p-4 flex justify-center space-x-6">
                <motion.button
                  className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center border-2 border-red-500 text-red-500 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setExitDirection("left");
                    onReject(user._id);
                  }}
                >
                  <FaTimes className="text-2xl" />
                </motion.button>

                <motion.button
                  className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center border-2 border-green-500 text-green-500 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setExitDirection("right");
                    onAccept(user._id);
                  }}
                >
                  <FaHeart className="text-2xl" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
