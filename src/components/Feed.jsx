import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../store/FeedSlice";
import DevCard from "./UserFeedCard";
import { motion } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(feed);
  const [matches, setMatches] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setUsers(feed);
  }, [feed]);

  const handleAccept = async (userId) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/send/interested/${userId}`,
        null,
        { withCredentials: true }
      );
    } catch (error) {}
    setMatches([...matches, userId]);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/send/ignored/${userId}`,
        null,
        { withCredentials: true }
      );
    } catch (error) {}
    setRejected([...rejected, userId]);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (!feed) return;

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-24 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">DevTinder Feed</h1>
          <p className="text-gray-400 mt-2">
            Swipe right to connect, left to pass
          </p>
        </div>

        {users && users.length > 0 ? (
          <DevCard
            user={users[0]}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ) : (
          <motion.div
            className="bg-gray-800 rounded-2xl p-8 text-center shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">👨‍💻</div>
            <h2 className="text-xl font-bold text-white mb-2">
              No more developers!
            </h2>
            <p className="text-gray-300 mb-6">
              You've gone through all available developers in your area.
            </p>

            <button
              onClick={() => setShowStats(!showStats)}
              className="text-purple-400 hover:text-purple-300 mb-4"
            >
              {showStats ? "Hide stats" : "Show stats"}
            </button>

            {showStats && (
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Matches:</span>
                  <span className="text-green-400">{matches.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Passed:</span>
                  <span className="text-red-400">{rejected.length}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Remaining count */}
        {users && users.length > 0 && (
          <div className="mt-6 text-center text-gray-400">
            {users.length} developer{users.length !== 1 ? "s" : ""} remaining
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
