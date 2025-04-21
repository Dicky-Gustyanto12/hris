import React, { useEffect, useState } from "react";
import Sidebar from "../pages/Sidebar";
import axios from "axios";

// Reusable Stat Card
const StatCard = ({ title, count }) => (
  <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{count}</p>
    </div>
    <button className="text-indigo-500 text-2xl font-bold">+</button>
  </div>
);

// Empty Content Placeholder
const EmptyCard = ({ title, desc }) => (
  <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-center items-center text-center min-h-[220px]">
    <p className="text-xl font-bold text-gray-800">{title}</p>
    <p className="text-gray-400 mt-2 mb-5">{desc}</p>
    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
      Upload File
    </button>
  </div>
);

const Dashboard = () => {
  const [employees, setEmployees] = useState(0);
  const [teams, setTeams] = useState(0);
  const [projects, setProjects] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [empRes, teamRes, projRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/employee", { headers }),
          axios.get("http://127.0.0.1:8000/api/team", { headers }),
          axios.get("http://127.0.0.1:8000/api/role", { headers }),
        ]);

        // Log JSON data
        console.log("👤 Employees JSON:", empRes.data);
        console.log("👥 Teams JSON:", teamRes.data);
        console.log("🛠 Roles JSON:", projRes.data);

        // If API returns { data: [...] }, use .data.data
        const employeeList = empRes.data.data || empRes.data;
        const teamList = teamRes.data.data || teamRes.data;
        const projectList = projRes.data.data || projRes.data;

        setEmployees(employeeList.length || 0);
        setTeams(teamList.length || 0);
        setProjects(projectList.length || 0);
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="drawer drawer-mobile lg:drawer-open min-h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content bg-gray-50 p-6">
        {/* Hamburger for Mobile */}
        <div className="lg:hidden mb-4">
          <label htmlFor="my-drawer" className="btn btn-ghost p-2">
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-10">Overview</h1>

        {/* Statistics Section */}
        <section className="mb-12">
          <h2 className="text-lg font-medium text-gray-800 mb-1">Statistics</h2>
          <p className="text-sm text-gray-400 mb-6">Your business growth</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard title="Employees" count={employees} />
            <StatCard title="Teams" count={teams} />
            <StatCard title="Projects" count={projects} />
          </div>
        </section>

        {/* Placeholder Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-1">
              Documents
            </h2>
            <p className="text-sm text-gray-400 mb-4">Standard procedure</p>
            <EmptyCard
              title="No Documents"
              desc="Add guidance or design style for your employees in company"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-1">History</h2>
            <p className="text-sm text-gray-400 mb-4">Track the flow</p>
            <EmptyCard
              title="No History"
              desc="Information of employees added and promoting shown here"
            />
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
