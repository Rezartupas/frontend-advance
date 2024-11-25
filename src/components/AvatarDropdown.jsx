import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarDropdown = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    isAdmin: false
  });

  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          setUserData({
            username: user.username,
            isAdmin: user.isAdmin || false
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
    // Add event listener for storage changes
    window.addEventListener('storage', loadUserData);
    return () => window.removeEventListener('storage', loadUserData);
  }, []);

  // Handlers
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }, [navigate]);

  const handleProfileClick = useCallback(() => {
    navigate('/myprofile');
  }, [navigate]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-white font-semibold mr-2">{userData.username}</span>
        <img
          className="w-20 h-13 rounded-full object-cover"
          src="../src/assets/avatar.png" 
          alt={`${userData.username}'s avatar`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            <button 
              onClick={handleProfileClick}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-zinc-800 transition-colors"
              role="menuitem"
            >
              Profil Saya
            </button>
            
            <a 
              href="#settings" 
              className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-zinc-800 transition-colors"
              role="menuitem"
            >
              Ubah Premium
            </a>
            
            {userData.isAdmin && (
              <a 
                href="/admin" 
                className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-zinc-800 transition-colors"
                role="menuitem"
              >
                Admin Dashboard
              </a>
            )}
            
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-zinc-800 transition-colors"
              role="menuitem"
            >
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;