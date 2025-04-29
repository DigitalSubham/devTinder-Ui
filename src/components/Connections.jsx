import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import DevCard from "./UserFeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/ConnectionSlice";

const Connections = () => {
  const connectionsData = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(connectionsData);

  useEffect(() => {
    setUsers(connectionsData);
  }, [connectionsData]);

  const fetchConnections = async () => {
    try {
      console.log("clall2");
      const response = await axios.get(`${BASE_URL}/users/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-24 px-4">
      <div className="max-w-full mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Your Connection</h1>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1">
          {users &&
            users.length > 0 &&
            users.map((user, i) => (
              <div key={i}>
                <DevCard user={user} showButtons={false} />
              </div>
            ))}
        </div>

        {/* Remaining count */}
        {users && users.length > 0 && (
          <div className="mt-6 text-center text-gray-400">
            {users.length} developer
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
