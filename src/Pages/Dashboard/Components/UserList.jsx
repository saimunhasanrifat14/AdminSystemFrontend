import React, { useEffect, useState } from "react";
import api from "../../../api/client";
import EditUser from "./EditUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/auth/users");
        setUsers(res.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSave = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
    setSelectedUser(null);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-TextGray">Loading users...</div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500">{error}</div>
    );

  return (
    <div className="bg-BGWhite rounded-lg relative">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-TextGray">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-GrayBorder text-TextBlack last:border-none"
            >
              <td className="py-2">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status || "Active"}</td>
              <td>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <EditUser
          user={selectedUser}
          onSave={handleSave}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserList;
