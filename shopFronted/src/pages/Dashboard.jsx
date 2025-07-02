// src/components/Dashboard.jsx
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProductDashboard from "./AdminDashboard"

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      alert("⚠️ No token found. Please log in.");
      window.location.href = "/login"; // Redirect to login
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Error decoding token:", err);
        alert("⚠️ Invalid token. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }, []);

  if (!user) return <div className="text-center mt-20 text-xl text-gray-600">Loading...</div>;

  return (
    // <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
    //   <h1 className="text-3xl font-bold text-indigo-600">👋 Welcome, {user.firstname}!</h1>
    //   <p className="mt-4 text-gray-700 text-lg">You're logged in as <strong>{user.email}</strong></p>
    //   <p className="text-gray-500">Username: <em>{user.username}</em></p>
    //   <p className="text-gray-500">User type: {user.userType}</p>
    //   <p className="text-gray-400 text-sm mt-4">Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
    //   <div className="mt-6">
    //     <button
    //       className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    //       onClick={() => {
    //         localStorage.removeItem('token');
    //         window.location.href = '/login';
    //       }}
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div>
    <ProductDashboard/>
  );
}
