import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/RequestSlice";
import DevCard from "./UserFeedCard";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

const Requests = () => {
  const requestsData = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(requestsData);
  const [matches, setMatches] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [showStats, setShowStats] = useState(false);

  console.log("requestsData", requestsData);

  useEffect(() => {
    setUsers(requestsData);
  }, [requestsData]);

  const handleAccept = async (userId) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/review/accepted/${userId}`,
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
        BASE_URL + `/request/review/rejected/${userId}`,
        null,
        { withCredentials: true }
      );
    } catch (error) {}
    setRejected([...rejected, userId]);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/users/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    if (!requestsData) {
      getRequests();
    }
  }, []);

  if (!requestsData) return;
  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-24 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">
            Connection Request Recieved
          </h1>
          <p className="text-gray-400 mt-2">
            Swipe right to accept, left to reject
          </p>
        </div>

        {users && users.length > 0 ? (
          <DevCard
            user={users[0].fromUserId}
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

export default Requests;
