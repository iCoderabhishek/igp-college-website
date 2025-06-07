import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Book,
  FileText,
  Users,
  FolderLock,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              About IGP
            </h3>
            <p className="text-gray-300 mb-4">
              Itahar Government Polytechnic is a government-run polytechnic
              college offering diploma engineering programs approved by AICTE
              and affiliated to WBSCT&VE&SD.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/ItaharGovernmentPolytechnic/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <Book className="h-4 w-4 mr-2" />
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Notices
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <FolderLock className="h-4 w-4 mr-2" />
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-300">
                  Itahar, Uttar Dinajpur, West Bengal, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-300">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-300">info@itahargpoly.edu.in</span>
              </li>
              <li className="flex items-center">
                <Globe className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-300">www.itahargpoly.edu.in</span>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Important Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.aicte-india.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  AICTE
                </a>
              </li>
              <li>
                <a
                  href="https://webscte.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  WBSCT&VE&SD
                </a>
              </li>
              <li>
                <a
                  href="https://www.wbhed.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Technical and Vocational Education Department, WB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>© {year} Itahar Government Polytechnic. All Rights Reserved.</p>
          <p className="mt-2">
            Website build with{" "}
            <span className="text-orange-500 text-lg">𖹭</span> for educational
            excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
