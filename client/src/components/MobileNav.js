import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaCalendar, 
  FaUsers, 
  FaSignInAlt 
} from 'react-icons/fa';

const MobileNav = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: '/', icon: <FaHome />, text: 'Home' },
    { to: '/events', icon: <FaCalendar />, text: 'Events' },
    { to: '/members', icon: <FaUsers />, text: 'Members', protected: true },
    { to: '/login', icon: <FaSignInAlt />, text: 'Login', guest: true }
  ];

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu}
        className="p-2 text-white focus:outline-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-primary shadow-lg">
          <div className="flex flex-col">
            {navLinks.map(link => {
              if (link.protected && !isAuthenticated) return null;
              if (link.guest && isAuthenticated) return null;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center space-x-2 px-4 py-3 hover:bg-primary-dark text-white"
                  onClick={toggleMenu}
                >
                  <span className="w-6">{link.icon}</span>
                  <span>{link.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;