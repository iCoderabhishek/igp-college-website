"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Zap, Radio, ArrowRight } from "lucide-react";

const courses = [
  {
    name: "Computer Science & Technology",
    shortName: "CST",
    description: "Duration: 3 Years | Intake: 60 Students",
    icon: <Cpu className="h-12 w-12 text-primary" />,
    color: "bg-blue-50",
  },
  {
    name: "Electrical Engineering",
    shortName: "EE",
    description: "Duration: 3 Years | Intake: 60 Students",
    icon: <Zap className="h-12 w-12 text-primary" />,
    color: "bg-yellow-50",
  },
  {
    name: "Electronics & Telecommunication",
    shortName: "ETCE",
    description: "Duration: 3 Years | Intake: 60 Students",
    icon: <Radio className="h-12 w-12 text-primary" />,
    color: "bg-green-50",
  },
];

export default function CoursesOffered() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Our Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of diploma programs designed to prepare you
            for a successful career in engineering
          </p>
        </motion.div>

        {/* All Cards Animate Together */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.name}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/30"
            >
              <div
                className={`${course.color} p-4 rounded-lg inline-block mb-4`}
              >
                {course.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {course.name}
              </h3>
              <p className="text-gray-500 mb-2">{course.shortName}</p>
              <p className="text-sm text-gray-600">{course.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/courses"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            See All Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
