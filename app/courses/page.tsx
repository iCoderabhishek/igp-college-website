"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Users, Clock, Briefcase } from "lucide-react";

// Course data
const courses = [
  {
    id: "cst",
    title: "Computer Science & Technology (CST)",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
    about:
      "The Diploma in Computer Science & Technology program provides students with a strong foundation in computer programming, software development, database management, web technologies, and computer networks.",
    duration: "3 Years (6 Semesters)",
    intake: 60,
    careers: [
      "Software Developer",
      "Web Developer",
      "Database Administrator",
      "Network Administrator",
      "IT Support Specialist",
      "System Analyst",
    ],
  },
  {
    id: "ee",
    title: "Electrical Engineering (EE)",
    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
    about:
      "The Diploma in Electrical Engineering program equips students with knowledge and skills in electrical machines, power systems, electrical measurements, control systems, and electrical installation and maintenance.",
    duration: "3 Years (6 Semesters)",
    intake: 60,
    careers: [
      "Electrical Engineer",
      "Power Plant Operator",
      "Electrical Maintenance Technician",
      "Electrical Design Engineer",
      "Energy Auditor",
      "Electrical Supervisor",
    ],
  },
  {
    id: "etce",
    title: "Electronics and Telecommunication Engineering (ETCE)",
    image:
      "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
    about:
      "The Diploma in Electronics and Telecommunication Engineering program focuses on electronic circuits, digital systems, communication systems, microprocessors, and electronic instrumentation.",
    duration: "3 Years (6 Semesters)",
    intake: 60,
    careers: [
      "Electronics Engineer",
      "Telecommunication Engineer",
      "Technical Support Specialist",
      "Service Engineer",
      "Communication Technician",
      "IoT Developer",
    ],
  },
];

export default function Courses() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      <div
        className="relative bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/course-banner.png')" }} // 🔁 replace with actual banner image
      >
        {/* Overlay Image */}
        <Image
          src="/home-overly.png"
          alt="Overlay"
          width={250}
          height={250}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 z-10 pointer-events-none"
        />

        {/* Text Content */}
        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Courses</h1>
            <p className="text-white/80 max-w-2xl mx-auto text-xl font-semibold md:text-lg">
              Discover our diploma engineering programs designed to prepare you
              for a successful career in technology.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Diploma in Engineering Programs
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Itahar Government Polytechnic offers three-year diploma programs in
            engineering disciplines, designed to provide students with both
            theoretical knowledge and practical skills required for successful
            careers in industry or further education.
          </p>
        </motion.div>

        {/* Course List */}
        <div className="space-y-16">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="lg:col-span-1">
                <div className="relative h-[250px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {course.title}
                </h3>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 text-primary mr-2" />
                    About the Course
                  </h4>
                  <p className="text-gray-700">{course.about}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      Duration
                    </h4>
                    <p className="text-gray-700">{course.duration}</p>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      Intake Capacity
                    </h4>
                    <p className="text-gray-700">{course.intake} students</p>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 text-primary mr-2" />
                      Program Type
                    </h4>
                    <p className="text-gray-700">Full-time Diploma</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    Career Opportunities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careers.map((career, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admission Info */}
        <motion.div
          className="bg-primary/5 p-6 rounded-lg shadow-sm mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4 text-primary">
            Admission Information
          </h3>
          <p className="text-gray-700 mb-4">
            Admissions to all diploma programs at Itahar Government Polytechnic
            are conducted through the centralized Joint Entrance Examination
            (Polytechnic) conducted by the West Bengal State Council of
            Technical and Vocational Education and Skill Development.
          </p>
          <p className="text-gray-700">
            For detailed information about the admission process, eligibility
            criteria, important dates, and application procedure, please visit
            the official website of WBSCT&VE&SD.
          </p>
          <div className="mt-4">
            <a
              href="https://webscte.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-4 py-2 rounded-lg inline-block hover:bg-primary/90 transition-colors duration-300"
            >
              Visit WBSCT&VE&SD Website
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
