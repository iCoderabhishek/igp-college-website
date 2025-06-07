"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Users, Calendar, Cpu, Zap, Radio, Tag } from "lucide-react";

// Dummy projects data
const dummyProjects = [
  {
    id: 1,
    title: "Smart Energy Monitoring System",
    description:
      "A system that monitors electricity consumption in real-time and provides insights on energy usage patterns, helping users reduce their power consumption and save costs.",
    image: "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg",
    department: "Electrical Engineering",
    year: "2024",
    team: ["Amit Kumar", "Priya Singh", "Rajesh Sharma"],
    tags: ["IoT", "Energy", "Monitoring"],
  },
  {
    id: 2,
    title: "Automated Attendance System using Facial Recognition",
    description:
      "A facial recognition-based attendance system that automatically records student attendance in classrooms, eliminating the need for manual attendance taking and reducing time wastage.",
    image: "https://images.pexels.com/photos/5952738/pexels-photo-5952738.jpeg",
    department: "Computer Science & Technology",
    year: "2024",
    team: ["Sneha Patel", "Vikram Joshi", "Ananya Gupta"],
    tags: ["AI", "Computer Vision", "Automation"],
  },
  {
    id: 3,
    title: "Voice-Controlled Home Automation",
    description:
      "A system that allows users to control home appliances such as lights, fans, and air conditioners using voice commands, making it accessible for elderly and differently-abled people.",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    department: "Electronics and Telecommunication Engineering",
    year: "2024",
    team: ["Rahul Verma", "Neha Khan", "Sanjay Patel"],
    tags: ["IoT", "Voice Recognition", "Home Automation"],
  },
  {
    id: 4,
    title: "Solar-Powered Water Purification System",
    description:
      "A sustainable water purification system powered by solar energy, designed for rural areas with limited access to clean drinking water and electricity.",
    image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
    department: "Electrical Engineering",
    year: "2023",
    team: ["Deepak Sharma", "Meera Reddy", "Farhan Khan"],
    tags: ["Renewable Energy", "Water Treatment", "Sustainability"],
  },
  {
    id: 5,
    title: "Waste Segregation Robot",
    description:
      "An automated robot that segregates waste into different categories such as plastic, metal, and organic waste, helping in efficient waste management and recycling.",
    image: "https://images.pexels.com/photos/2682683/pexels-photo-2682683.jpeg",
    department: "Electronics and Telecommunication Engineering",
    year: "2023",
    team: ["Arjun Singh", "Kavita Patel", "Mohammed Ali"],
    tags: ["Robotics", "AI", "Waste Management"],
  },
  {
    id: 6,
    title: "E-Learning Platform for Rural Schools",
    description:
      "A web and mobile-based platform that provides educational content to students in rural areas with limited access to quality education resources.",
    image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg",
    department: "Computer Science & Technology",
    year: "2023",
    team: ["Rohit Kumar", "Pooja Sharma", "Sunil Verma"],
    tags: ["Web Development", "Education", "Mobile App"],
  },
  {
    id: 7,
    title: "Smart Traffic Management System",
    description:
      "An IoT-based system that monitors traffic flow in real-time and adjusts traffic signal timings automatically to reduce congestion and improve traffic efficiency.",
    image: "https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg",
    department: "Computer Science & Technology",
    year: "2022",
    team: ["Vivek Patel", "Aisha Khan", "Siddharth Roy"],
    tags: ["IoT", "Traffic Management", "Smart City"],
  },
  {
    id: 8,
    title: "Health Monitoring Wearable Device",
    description:
      "A wearable device that monitors vital health parameters such as heart rate, blood pressure, and body temperature, and sends alerts in case of abnormal readings.",
    image: "https://images.pexels.com/photos/4482896/pexels-photo-4482896.jpeg",
    department: "Electronics and Telecommunication Engineering",
    year: "2022",
    team: ["Nisha Gupta", "Rajiv Singh", "Priyanka Patel"],
    tags: ["Wearable Technology", "Healthcare", "IoT"],
  },
  {
    id: 9,
    title: "Agricultural Drone for Crop Monitoring",
    description:
      "A drone-based system for monitoring crop health, detecting diseases, and assessing irrigation needs, helping farmers make data-driven decisions to improve crop yield.",
    image: "https://images.pexels.com/photos/2219954/pexels-photo-2219954.jpeg",
    department: "Electrical Engineering",
    year: "2022",
    team: ["Ramesh Kumar", "Sita Devi", "Ajay Yadav"],
    tags: ["Drone Technology", "Agriculture", "Image Processing"],
  },
];

// Departments for filtering
const departments = [
  "All Departments",
  "Computer Science & Technology",
  "Electrical Engineering",
  "Electronics and Telecommunication Engineering",
];

// Years for filtering
const years = ["All Years", "2024", "2023", "2022"];

// Extract all unique tags
const allTags = Array.from(
  new Set(dummyProjects.flatMap((project) => project.tags))
).sort();

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get department icon
  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "Computer Science & Technology":
        return <Cpu className="h-5 w-5 text-primary" />;
      case "Electrical Engineering":
        return <Zap className="h-5 w-5 text-primary" />;
      case "Electronics and Telecommunication Engineering":
        return <Radio className="h-5 w-5 text-primary" />;
      default:
        return <Cpu className="h-5 w-5 text-primary" />;
    }
  };

  // Filter projects based on search term, department, and year
  const filteredProjects = dummyProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      project.department === selectedDepartment;
    const matchesYear =
      selectedYear === "All Years" || project.year === selectedYear;
    const matchesTag =
      selectedTag === null || project.tags.includes(selectedTag);
    return matchesSearch && matchesDepartment && matchesYear && matchesTag;
  });

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner with Background Image and Animation */}
      <div
        className="relative bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/project-banner.png')" }} // Replace with your actual image path
      >
        {/* Optional Overlay Icon */}
        <Image
          src="/home-overly.png" // Optional: semi-transparent overlay like lightbulb or idea icon
          alt="Project Icon"
          width={200}
          height={200}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 z-10 pointer-events-none"
        />

        {/* Animated Text */}
        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Student Projects
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover innovative projects developed by our talented students
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  selectedTag === null
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Tags
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.year}
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {getDepartmentIcon(project.department)}
                    <span className="text-sm text-gray-600 ml-1">
                      {project.department}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        Team Members
                      </span>
                    </div>
                    <ul className="text-sm text-gray-600 pl-5">
                      {project.team.map((member, i) => (
                        <li key={i} className="list-disc">
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Tag className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        Tags
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
