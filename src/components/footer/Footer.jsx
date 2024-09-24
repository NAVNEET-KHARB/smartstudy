import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative overflow-hidden py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap justify-between">
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-4/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6">
                <Link to="/">
                  <Logo className="w-24 h-24" />
                </Link>
              </div>
              <p className="text-sm text-gray-200">
                &copy; 2024 SmartStudy. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div>
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-100">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div>
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-100">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div>
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-100">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
