import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUsers, FaCalendar, FaUser } from 'react-icons/fa';
import MobileNav from './MobileNav';

const NavBar = ({ isAuthenticated, userRole }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { to: '/', icon: <FaHome />, text: 'Home', public: true },
    { to: '/events', icon: <FaCalendar />, text: 'Events', public: true },
    { to: '/members', icon: <FaUsers />, text: 'Members', auth: true },
    { to: '/admin', icon: <FaUser />, text: 'Admin', role: 'admin' }
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.public) return true;
    if (link.auth && !isAuthenticated) return false;
    if (link.role && userRole !== link.role) return false;
    return true;
  });

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">Church App</Link>
          
          {isMobile ? (
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          ) : (
            <div className="flex space-x-4">
              {filteredLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded hover:bg-primary-dark transition
                    ${location.pathname === link.to ? 'bg-primary-dark' : ''}`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {isMobile && isOpen && (
          <div className="pb-4">
            {filteredLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-2 px-3 py-2 hover:bg-primary-dark transition block
                  ${location.pathname === link.to ? 'bg-primary-dark' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNav isAuthenticated={isAuthenticated} />
    </nav>
  );
};

export default NavBar;