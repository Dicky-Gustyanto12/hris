import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "./api"; // axios instance with baseURL & withCredentials
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const companyId = localStorage.getItem("company_id");

    if (!companyId) {
      Swal.fire({
        icon: "warning",
        title: "Perusahaan Belum Dipilih",
        text: "Silakan pilih perusahaan terlebih dahulu.",
      }).then(() => navigate("/company"));
      return;
    }

    api
      .get(`/api/role?company_id=${companyId}`)
      .then((res) => {
        console.log("Roles API response:", res.data);

        // Handle Laravel-style pagination or flat array
        const data =
          res.data?.data?.data || // if paginated: { data: { data: [...] } }
          res.data?.data || // if: { data: [...] }
          res.data?.roles || // if: { roles: [...] }
          res.data; // fallback

        if (Array.isArray(data)) {
          setRoles(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Format Data Tidak Valid",
            text: "Struktur data roles tidak dikenali.",
          });
          setRoles([]);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data roles:", err);
        Swal.fire({
          icon: "error",
          title: "Gagal Memuat Roles",
          text: "Terjadi kesalahan saat memuat roles.",
        });
        setRoles([]);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="drawer drawer-mobile lg:drawer-open min-h-screen bg-gray-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Konten Utama */}
      <div className="drawer-content p-6">
        {/* Hamburger icon */}
        <div className="lg:hidden mb-4">
          <label htmlFor="my-drawer" className="btn btn-ghost p-2">
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Company Roles
            </h1>
            <p className="text-sm text-gray-400">
              Daftar roles di perusahaan ini
            </p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm hover:bg-indigo-700 transition">
            New Role
          </button>
        </div>

        {/* Role Cards */}
        {loading ? (
          <p className="text-gray-400">Memuat roles...</p>
        ) : roles.length === 0 ? (
          <p className="text-gray-400">Belum ada roles tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition"
              >
                <div className="p-3 bg-indigo-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-indigo-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12H7v6H5v-6H3v-2l3-5h2l3 5v2H9z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{role.name}</p>
                  <p className="text-sm text-gray-400">
                    {role.assigned_count || 0} people assigned
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default Roles;
