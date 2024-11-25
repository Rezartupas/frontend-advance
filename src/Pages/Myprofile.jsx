import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Myprofile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
      setNewUsername(currentUser.username);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Kata sandi tidak cocok');
      return;
    }

    try {
      const updatedData = {
        ...user,
        username: newUsername,
        password: newPassword || user.password
      };

      const updatedUser = await api.updateUser(user.id, updatedData);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setMessage('Profil berhasil diperbarui');
      setUser(updatedUser);
    } catch (err) {
      setError('Gagal memperbarui profil');
    }
  };
  const handleDeleteAccount = async () => {
    if (window.confirm('Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        await api.deleteUser(user.id);
        localStorage.removeItem('currentUser');
        navigate('/login');
      } catch (err) {
        setError('Gagal menghapus akun');
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <div className="max-w-md mx-auto bg-zinc-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Profil Saya</h2>
        
        {message && <div className="bg-green-500 text-white p-3 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Kata Sandi Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700"
              placeholder="Biarkan kosong jika tidak ingin mengubah"
            />
          </div>

          <div>
            <label className="block mb-2">Konfirmasi Kata Sandi Baru</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-700"
              placeholder="Konfirmasi kata sandi baru"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Perbarui Profil
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-700">
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Hapus Akun
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Myprofile;