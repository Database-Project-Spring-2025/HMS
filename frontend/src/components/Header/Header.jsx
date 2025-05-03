import { useEffect, useRef, useContext } from 'react';
import logo from "../../assets/images/logo.png";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { authContext } from '../../context/AuthContext';

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  console.log(role)
  const handleScroll = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Role-based nav links
  const patientLinks = [
    { path: '/home', display: 'Home' },
    { path: '/appointments', display: 'Schedule Appointment' },
    { path: '/users/showScheduled-tests', display: 'My Tests' },
    { path: '/users/my-prescriptions', display: 'My Prescriptions' },
    { path: '/users/profile/me', display: 'My Account' },
    { path: '/users/feedback', display: 'Feedback' }
  ];
  

  const doctorLinks = [
    { path: '/home', display: 'Home' },
    { path: '/scheduledAppointments', display: 'Appointments' },
    { path: '/doctors/schedule-tests', display: 'Schedule Test' },
    { path: '/doctors/create-prescription', display: 'Prescribe' },
    { path: '/doctors/profile/me', display: 'My Dashboard' },
  ];
  
  const adminLinks = [
    
  ]

  const navLinks = role === 'doctor' ? doctorLinks : patientLinks;

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="Logo" />
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-color-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center gap-3">
                <span className="text-textColor text-sm font-semibold">
                  Welcome, {user?.Name?.split(' ')[0]}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 h-20 px-2 text-white font-semibold rounded-[20px] hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to='/login'>
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
