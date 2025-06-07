"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, GraduationCap, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  email: string;
  phone?: string;
  image: string;
}

export default function FacultyComponent() {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch("/api/faculty");
        if (!res.ok) throw new Error("Failed to fetch faculty");

        const data = await res.json();
        setFacultyData(data.faculties);
      } catch (err) {
        console.error(err);
        setError("Failed to load faculty");
        toast.error("Unable to fetch faculty data");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading faculty data...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

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
                          src={faculty.image || "/default-pfp.png"}
                          alt={faculty.name}
                          fill
                          style={{ objectFit: "cover" }}
                          priority
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <BookOpen className="h-4 w-4 text-primary m-2" />
                        {faculty.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {faculty.specialization}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {faculty.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {faculty.designation}
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
