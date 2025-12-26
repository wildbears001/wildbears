import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkCoins, setBulkCoins] = useState(0);
  const [bulkWallet, setBulkWallet] = useState(0);
  const [bulkReason, setBulkReason] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const usersData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.users)
        ? res.data.users
        : [];

      const mappedUsers = usersData.map((user) => ({
        ...user,
        coins: user.coins_balance || 0,
        walletBalance: user.wallet_balance || 0,
      }));

      setUsers(mappedUsers);
      setFilteredUsers(mappedUsers);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      console.error("❌ Error fetching users:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/api/admin/users/${userId}`);
      const user = res.data.user;
      if (!user) return;

      const mappedUser = {
        ...user,
        coins: user.coins_balance || 0,
        walletBalance: user.wallet_balance || 0,
      };

      setSelectedUserId(userId);
      setSelectedUser(mappedUser);
      setCoins(mappedUser.coins);
      setWalletBalance(mappedUser.walletBalance);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("❌ Error fetching user details:", err.response?.data || err.message);
    }
  };

const updateBalance = async (userId, coinsChange, walletChange, reason = "Admin Adjustment") => {
  try {
    await axios.put(
      `${backendUrl}/api/admin/users/${userId}`,
      { 
        coins_change: coinsChange,   // +50 or -20
        wallet_change: walletChange, // +100 or -50
        reason 
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    fetchUsers();
    alert("Balance updated successfully!");
  } catch (err) {
    console.error("❌ Error updating balance:", err.response?.data || err.message);
    alert("Failed to update balance");
  }
};


  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user._id.includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleBulkAdd = async () => {
    if (bulkCoins === 0 && bulkWallet === 0) return;

    try {
      await axios.post(
        `${backendUrl}/api/admin/users/bulk-update`,
        {
          coins: Number(bulkCoins),
          walletBalance: Number(bulkWallet),
          reason: bulkReason || "Admin Update",
          source: "Admin",
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert(
        `Added ${bulkCoins} coins and ₹${bulkWallet} free cash to all users!`
      );
      setBulkCoins(0);
      setBulkWallet(0);
      setBulkReason("");
      fetchUsers();
    } catch (err) {
      console.error("❌ Error adding bulk balance:", err.response?.data || err.message);
      alert("Failed to add bulk balance");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">👥 User Management</h2>

      <div className="mb-4 inline-block bg-black text-white px-4 py-2 rounded">
        Total Users: {users.length}
      </div>

      {/* Bulk add section */}
      <div className="mb-4 flex gap-2 items-center flex-wrap">
        <input
          type="number"
          placeholder="Coins to add"
          value={bulkCoins}
          onChange={(e) => setBulkCoins(Number(e.target.value))}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Free Cash to add"
          value={bulkWallet}
          onChange={(e) => setBulkWallet(Number(e.target.value))}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="Reason"
          value={bulkReason}
          onChange={(e) => setBulkReason(e.target.value)}
          className="border p-2 rounded w-48"
        />
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={handleBulkAdd}
        >
          Add to All Users
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by ID, name, or email"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="border w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Coins</th>
            <th className="p-2 border">Free Cash</th>
            <th className="p-2 border">View</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td className="p-2 border">{user._id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.coins}</td>
                  <td className="p-2 border">₹{user.walletBalance}</td>
                  <td className="p-2 border">
                    <button
                      className="px-2 py-1 bg-black text-white rounded"
                      onClick={() => handleView(user._id)}
                    >
                      {selectedUserId === user._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {selectedUserId === user._id && selectedUser && (
                  <tr>
                    <td colSpan="6" className="p-4 bg-gray-50 border">
                      <div>
                        <p><strong>ID:</strong> {selectedUser._id}</p>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>

                        <div className="mt-2">
                          <label>Coins:</label>
                          <input
                            type="number"
                            value={coins}
                            onChange={(e) => setCoins(Number(e.target.value))}
                            className="border p-1 rounded ml-2"
                          />
                        </div>

                        <div className="mt-2">
                          <label>Wallet Balance:</label>
                          <input
                            type="number"
                            value={walletBalance}
                            onChange={(e) => setWalletBalance(Number(e.target.value))}
                            className="border p-1 rounded ml-2"
                          />
                        </div>

                        <button
                          className="mt-2 px-3 py-1 bg-black text-white rounded"
                          onClick={() =>
                            updateBalance(selectedUser._id, coins, walletBalance)
                          }
                        >
                          Save Changes
                        </button>

                        <h4 className="mt-4 font-semibold">Orders:</h4>
                        {orders.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {orders.map((order) => (
                              <li key={order._id}>
                                 <strong>Order #{order._id}</strong> – <strong className="text-red-600"> ₹{order.amount} </strong> – {order.status} – 
                                        Payment: {order.payment ? "Done ✅" : "Pending ❌"}
                                        <br />
                                          Date: {new Date(order.createdAt).toLocaleString()
}
                                        <br />
                                        Items: {order.items.join(", ")}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No orders found.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
