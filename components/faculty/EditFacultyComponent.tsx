"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, GraduationCap, BookOpen } from "lucide-react";

interface Faculty {
  id: number;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  email: string;
  phone?: string;
  image: string;
}

const facultyData: Faculty[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    department: "Computer Science and Technology",
    designation: "Assistant Professor",
    qualification: "Ph.D in Computer Science",
    specialization: "Distributed Systems",
    email: "john.doe@itahargpoly.edu.in",
    phone: "+91 98765 43210",
    image: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    department: "Electrical Engineering",
    designation: "Associate Professor",
    qualification: "Ph.D in Electrical Engineering",
    specialization: "Power Systems",
    email: "jane.smith@itahargpoly.edu.in",
    phone: "+91 98765 43211",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
  },
  {
    id: 3,
    name: "Prof. Robert Johnson",
    department: "Electronics and Telecommunication",
    designation: "Professor",
    qualification: "Ph.D in Electronics",
    specialization: "VLSI Design",
    email: "robert.johnson@itahargpoly.edu.in",
    image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
  },
];

export default function FacultyComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Faculty Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Designation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qualification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {facultyData.map((faculty, index) => (
              <motion.tr
                key={faculty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={faculty.image}
                          alt={faculty.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {faculty.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 text-primary mr-1" />
                        {faculty.specialization}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {faculty.department}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {faculty.designation}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <GraduationCap className="h-4 w-4 text-primary mr-1" />
                    {faculty.qualification}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-primary mr-1" />
                      {faculty.email}
                    </div>
                    {faculty.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-primary mr-1" />
                        {faculty.phone}
                      </div>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
