import bgImage from "../assets/bg-login.png";
import logo from "/logo.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Tentukan URL API berdasarkan environment
// Untuk Vite, Anda bisa menggunakan variabel env seperti import.meta.env.VITE_API_URL
// Untuk Create React App, process.env.REACT_APP_API_URL
// Ini adalah cara sederhana:
const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000" // URL Backend Development Anda (sesuai port di index.ts)
  : "https://be-appbuku-production.up.railway.app"; // URL Backend Produksi Anda

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset pesan setiap kali submit

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include", // Penting untuk mengirim dan menerima cookie lintas domain
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json" // Baik untuk ditambahkan
        },
        body: JSON.stringify({ email, password })
      });

      const responseData = await res.json(); // Selalu coba parse JSON respons

      if (!res.ok) {
        setMessage(responseData.message || `Login gagal (HTTP ${res.status})`);
        return;
      }

      // Jika res.ok, login berhasil
      setMessage(responseData.message || "Login berhasil!");

      // Simpan informasi user dari respons body
      // Token dari body bisa digunakan jika diperlukan (misalnya untuk header Auth di request lain)
      if (responseData.data && responseData.data.token) {
        localStorage.setItem("authToken", responseData.data.token); // Contoh penyimpanan token dari body
      }
      if (responseData.data) {
        localStorage.setItem("adminName", responseData.data.email); // Sesuaikan key jika perlu
        localStorage.setItem("userName", responseData.data.email); // Sesuaikan key jika perlu
        localStorage.setItem("userRole", responseData.data.role);
      }

      // Cookie HttpOnly sudah di-set oleh server dan akan dikirim otomatis oleh browser
      // Tidak perlu: document.cookie = ...

      console.log(
        "Login berhasil, server seharusnya sudah set cookie HttpOnly."
      );
      console.log("Data dari server:", responseData.data);

      const role = responseData.data?.role; // Gunakan optional chaining
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "USER" || role) {
        // Asumsikan role USER atau role lain yang valid
        navigate("/user/home");
      } else {
        // Role tidak diketahui, mungkin tetap di halaman login atau halaman error
        setMessage("Role pengguna tidak diketahui, tidak dapat mengarahkan.");
      }
    } catch (error) {
      console.error("Error saat fetch:", error);
      // Cek apakah error karena network atau lainnya
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setMessage("Gagal terhubung ke server. Periksa koneksi atau URL API.");
      } else {
        setMessage("Terjadi kesalahan pada aplikasi.");
      }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen raleway-general">
      <img
        src={bgImage}
        alt="Background"
        className="absolute w-full h-full object-cover -z-10"
        style={{ objectPosition: "center right" }}
      />

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left - Welcome Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden sm:flex w-full lg:w-1/2 flex-col justify-center p-6 md:p-12 xl:mb-[600px] lg:pl-20 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Selamat Datang di
          </h1>
          <p className="text-4xl md:text-8xl lg:text-10xl font-bold mb-4">
            BookNest
          </p>
          <p className="text-lg md:text-xl text-orange-100">
            Cari dan jelajahi berbagai buku yang ingin Anda temukan!
          </p>
        </motion.div>

        {/* Logo dan Intro untuk Mobile */}
        <div className="w-full flex flex-col sm:hidden items-center pt-6 pb-4 text-emerald-900">
          <h1 className="text-3xl font-bold">BookNest</h1>
          <p className="text-sm text-center">
            Cari dan jelajahi buku yang ingin anda temukan!
          </p>
        </div>

        {/* Right - Form Login */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:px-10 md:px-16 lg:px-24">
          <img
            src={logo}
            className="mb-6 w-24 sm:w-32 h-auto hidden sm:block"
            alt="BookNest Logo"
          />

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-xl p-6 sm:p-8 lg:p-10 shadow-md backdrop-blur-xl bg-orange-900/10"
          >
            {message && ( // Pastikan message ditampilkan dengan benar
              <div
                className={`mb-4 text-center p-2 rounded ${
                  !message.toLowerCase().includes("berhasil") &&
                  !message.toLowerCase().includes("success")
                    ? "text-red-700 bg-red-100"
                    : "text-green-700 bg-green-100"
                }`}
              >
                {message}
              </div>
            )}

            <h1 className="text-3xl font-semibold text-center mb-6">Masuk</h1>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-900 text-md font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="nama@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-900 text-md font-medium mb-2"
              >
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-sm text-gray-700">
              <label className="flex items-center mb-2 sm:mb-0">
                <input type="checkbox" className="mr-2" />
                Ingat Saya
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="w-full sm:w-40 bg-emerald-800 text-white py-2 rounded-md hover:bg-emerald-600 transition text-lg"
              >
                Masuk
              </button>
            </div>

            <p className="text-center text-sm text-gray-700 mb-2">
              Belum Punya Akun?
            </p>

            <div className="flex justify-center mb-4">
              <Link to="/register">
                <button
                  type="button"
                  className="w-full sm:w-40 text-emerald-900 border border-emerald-800 py-2 rounded-md hover:bg-emerald-700 hover:text-white transition text-lg "
                >
                  Daftar
                </button>
              </Link>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
