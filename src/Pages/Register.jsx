import { useState } from 'react';
import { api } from '../services/api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    try {
      // Check if username already exists
      const users = await api.getUsers();
      const existingUser = users.find(user => user.username === username);
      
      if (existingUser) {
        alert("Username sudah terpakai!");
        return;
      }

      // Create new user
      await api.createUser({ username, password });
      alert("Pendaftaran berhasil!");
      navigate('/login');
    } catch (error) {
      alert("Terjadi kesalahan saat mendaftar!");
      console.error(error);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('../src/assets/bg register.jpeg')" }}
    >
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-2xl w-full max-w-md text-center">
        <div className="mb-6">
          <img
            src="../src/assets/Logo.png"
            alt="Logo"
            className="mx-auto w-40 h-20 mb-4"
          />
        </div>
        <div className="text-white mb-6">
          <h4 className="text-2xl font-semibold mb-2">Daftar</h4>
          <p className="text-sm font-light">Selamat Datang!</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="name" className="block text-white text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-full border border-white bg-transparent text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="text-left">
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-full border border-white bg-transparent text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="confirm-password"
              className="block text-white text-sm mb-2"
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Masukkan Kata Sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-full border border-white bg-transparent text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center text-white text-sm mt-2">
            <p>
              Sudah Punya Akun?{" "}
              <a href="/login" className="font-bold underline">
                Masuk
              </a>
            </p>
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-gray-700 hover:bg-blue-600 text-white rounded-full font-semibold transition duration-300">
            Daftar
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-gray-400 text-sm">Atau</h2>
          <button className="flex justify-center items-center gap-4 w-full py-3 mt-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold transition duration-300">
            <img src="../src/assets/goggle.webp" alt="Google" className="w-5 h-5" />
            Daftar dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;