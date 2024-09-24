import React, { useState } from 'react';
import Container from "../container/Container";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import LogoutBtn from './LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiMenu, HiX } from 'react-icons/hi'; // Importing icons for mobile menu

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Courses", slug: "/all-courses", active: authStatus },
    { name: "Add Course", slug: "/add-course", active: authStatus }
  ];

  return (
    <header className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <Container>
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <Logo className="w-12 h-12" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>

          {/* Navigation Links */}
          <ul className={`flex-col lg:flex-row lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-8 ml-auto ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
            {
              navItems.map((item) => item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false); // Close menu on navigation
                      navigate(item.slug);
                    }}
                    className="relative px-4 py-2 text-white rounded-full hover:bg-white hover:text-blue-600 hover:shadow-md duration-300 transition-all transform hover:scale-105"
                  >
                    {item.name}
                    {/* Adding underline effect on hover */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </button>
                </li>
              ))
            }

            {/* Authenticated User Options */}
            {authStatus && (
              <li className="flex items-center space-x-4">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
