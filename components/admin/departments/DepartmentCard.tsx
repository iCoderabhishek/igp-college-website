import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const departments = [
  {
    id: "cst",
    name: "Computer Science and Technology",
    shortName: "CST",
    hod: "Ms. MOUSUMI BISWAS",
    image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
    description:
      "The Department of Computer Science and Technology focuses on providing quality education in various areas including programming, software development, database management, and computer networks.",
    faculty: [
      {
        name: "Ms. MOUSUMI BISWAS",
        designation: "HOD & Assistant Professor",
        qualification: "M.Tech in CSE",
        specialization: "Database Systems",
      },
      // Add more faculty members
    ],
    labs: [
      {
        name: "Programming Lab",
        image:
          "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
        description: "Well-equipped lab for programming practice",
      },
      {
        name: "Networking Lab",
        image:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        description: "Modern networking equipment and tools",
      },
    ],
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    shortName: "EE",
    hod: "Mr. SNEHASHIS DHALI",
    image: "https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg",
    description:
      "The Department of Electrical Engineering provides comprehensive education in electrical systems, power generation, and control systems.",
    faculty: [
      {
        name: "Mr. SNEHASHIS DHALI",
        designation: "HOD & Assistant Professor",
        qualification: "M.Tech in Electrical Engineering",
        specialization: "Power Systems",
      },
    ],
    labs: [
      {
        name: "Power Systems Lab",
        image:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        description: "State-of-the-art power systems laboratory",
      },
    ],
  },
  {
    id: "etce",
    name: "Electronics and Telecommunication Engineering",
    shortName: "ETCE",
    hod: "Mr. CHANDI CHARAN JANA",
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg",
    description:
      "The Department of Electronics and Telecommunication Engineering focuses on electronic circuits, communication systems, and signal processing.",
    faculty: [
      {
        name: "Mr. CHANDI CHARAN JANA",
        designation: "HOD & Assistant Professor",
        qualification: "M.Tech in Electronics",
        specialization: "Communication Systems",
      },
    ],
    labs: [
      {
        name: "Electronics Lab",
        image:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        description: "Modern electronics and testing equipment",
      },
    ],
  },
];

const DepartmentCard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold">
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={dept.image}
                alt={dept.name}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-bold">{dept.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-600 text-sm">Department of</p>
                <p className="text-lg font-semibold text-primary">
                  {dept.shortName}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-sm">Head of Department</p>
                <p className="font-medium">{dept.hod}</p>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {dept.description}
              </p>
              <button
                // onClick={() => redirect(`/admin/departments/${dept.id}`)}
                onClick={() => redirect(`/admin/departments/${dept.id}`)}
                className="flex items-center text-primary hover:underline"
              >
                View & Edit Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCard;
