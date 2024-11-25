import AvatarDropdown from "./AvatarDropdown";

const Header = () => {
    return (
        <nav className="flex justify-between items-center p-5">
          <div className="flex items-center gap-10">
            <img src="../src/assets/Logo.png" alt="Logo" className="w-36 h-20" />
            <ul className="flex gap-10">
              <li>
                <a href="#Series" className="hover:text-gray-300">
                  Series
                </a>
              </li>
              <li>
                <a href="#Film" className="hover:text-gray-300">
                  Film
                </a>
              </li>
              <li>
                <a href="./Mylist" className="hover:text-gray-300">
                  Daftar Saya
                </a>
              </li>
            </ul>
          </div>
          <AvatarDropdown></AvatarDropdown>
        </nav>
    );
  };

export default Header;