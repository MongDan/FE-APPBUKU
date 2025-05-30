import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import BukuPage from "./pages/BukuPage";
import UserPage from "./pages/UserPage";
import StatusBukuPage from "./pages/StatusBukuPage";
import KategoriPage from "./pages/KategoriPage";
import BukuKategoriPage from "./pages/BukuKategoriPage";
import LandingPageAdmin from "./pages/LandingPageAdmin";
import LandingPageUser from "./pages/LandingPageUser";
import AdminRoute from "./Route/AdminRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kategori" element={<KategoriPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buku" element={<BukuPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/statusBuku" element={<StatusBukuPage />} />
        <Route path="/bukuKategori" element={<BukuKategoriPage />} />
        <Route path="/admin/dashboard" element={<LandingPageAdmin />} />
        <Route path="/user/home" element={<LandingPageUser />} />
      </Routes>
    </Router>
  );
}

export default App;
