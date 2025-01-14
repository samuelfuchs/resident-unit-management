import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl font-semibold">150</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Active Residents</h2>
          <p className="text-2xl font-semibold">120</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Receptionists</h2>
          <p className="text-2xl font-semibold">15</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
