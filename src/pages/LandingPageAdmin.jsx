<<<<<<< HEAD
import { useNavigate } from "react-router";
=======
import { useNavigate, Link } from "react-router-dom";
>>>>>>> 5579d1b115b656fe5fb5edb7776e0ac32fef0069
import { useEffect, useState } from "react";


function LandingPageAdmin() {
<<<<<<< HEAD
  const [adminName, setAdminName] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
=======
  const [adminName, setAdminName] = useState(" ");
>>>>>>> 5579d1b115b656fe5fb5edb7776e0ac32fef0069
  const navigate = useNavigate();

  useEffect(() => {
    const nameAdmin = localStorage.getItem("adminName");
    setAdminName(nameAdmin);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    document.removeItem("adminName");
    navigate("/login");
  };

  function FormBuku() {
    return (
      <div className="bg-white p-6 rounded shadow p-1/2">
        <h2 className="text-xl font-bold mb-4">Form Buku</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Judul Buku"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Pengarang"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Penerbit"
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Tahun Terbit"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-emerald-700 text-white py-2 rounded hover:bg-emerald-600"
          >
            Simpan
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-emerald-900 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6">BookNest Admin</h2>
          <nav className="flex flex-col gap-2 p-4">
            <button
              onClick={() => setActiveSection("dashboard")}
              className="text-left p-2 hover:bg-emerald-700 rounded "
            >
              🏡 Dashboard
            </button>
            <button
              onClick={() => setActiveSection("formBuku")}
              className="text-left p-2 hover:bg-emerald-700 rounded"
            >
              📚 Buku
            </button>
            <button
              onClick={() => setActiveSection("kategori")}
              className="text-left p-2 hover:bg-emerald-700 rounded"
            >
              🗂️ Kategori
            </button>
            <button
              onClick={() => navigate("/statusBuku")}
              className="text-left p-2 hover:bg-emerald-700 rounded"
            >
              📌 Status Buku
            </button>
          </nav>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-500"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
<<<<<<< HEAD
        {activeSection === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-4">  
              Selamat Datang, {adminName.split("@")[0]}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded shadow text-center">
                <h2 className="text-xl font-bold mb-2">📚 Buku</h2>
                <p className="text-gray-600">
                  Kelola daftar buku yang tersedia.
                </p>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <h2 className="text-xl font-bold mb-2">🗂️ Kategori</h2>
                <p className="text-gray-600">Atur kategori buku.</p>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <h2 className="text-xl font-bold mb-2">📌 Status Buku</h2>
                <p className="text-gray-600">
                  Tentukan status (tersedia, dipinjam, dll).
                </p>
              </div>
            </div>
          </>
        )}

        {activeSection === "formBuku" && (
          <>
            <FormBuku />
          </>
        )}

        {activeSection === "kategori" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Kategori</h1>
            <div className="bg-white p-6 rounded shadow">
              <p className="text-gray-600">
                (Halaman kategori dalam pengembangan)
              </p>
            </div>
          </>
        )}
=======
        <h1 className="text-3xl font-bold mb-4">Selamat Datang, {adminName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/buku">
            <div className="bg-white p-6 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-bold mb-2">📚 Buku</h2>
              <p className="text-gray-600">Kelola daftar buku yang tersedia.</p>
            </div>
          </Link>

          <Link to="/kategori">
            <div className="bg-white p-6 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-bold mb-2">🗂️ Kategori</h2>
              <p className="text-gray-600">Atur kategori buku.</p>
            </div>
          </Link>

          <Link to="/statusbuku">
            <div className="bg-white p-6 rounded shadow text-center hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-bold mb-2">📌 Status Buku</h2>
              <p className="text-gray-600">
                Tentukan status (tersedia, dipinjam, dll).
              </p>
            </div>
          </Link>
        </div>
>>>>>>> 5579d1b115b656fe5fb5edb7776e0ac32fef0069
      </div>
    </div>
  );
}

export default LandingPageAdmin;
