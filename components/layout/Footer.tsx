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
  Globe2,
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
                  className="h-5 w-5 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5Zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5Zm5.25-.625a.875.875 0 1 1-1.75 0a.875.875 0 0 1 1.75 0Z" />
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
                  Porsha, Itahar, Uttar Dinajpur, West Bengal, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-300">3323403757</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-300">
                  ita_govtpoly@rediffmail.com
                </span>
              </li>
              <li className="flex items-center">
                <Globe2 className="h-5 w-5 text-primary mr-2" />
                <a
                  href="https://polytechnic.wbtetsd.gov.in/itahargovpoly"
                  className="text-gray-300 "
                >
                  Website Link
                </a>
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
