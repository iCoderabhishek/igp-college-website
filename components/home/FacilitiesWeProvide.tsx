"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FlaskRound as Flask,
  UsersRound,
  BookOpenCheck,
  Monitor,
  MessageSquare,
  Computer,
} from "lucide-react";

const facilities = [
  {
    name: "Laboratories",
    icon: <Flask className="h-6 w-6 text-primary" />,
    color: "bg-blue-50",
  },
  {
    name: "Classrooms",
    icon: <UsersRound className="h-6 w-6 text-primary" />,
    color: "bg-purple-50",
  },
  {
    name: "Seminars",
    icon: <BookOpenCheck className="h-6 w-6 text-primary" />,
    color: "bg-green-50",
  },
  {
    name: "Common Rooms",
    icon: <Monitor className="h-6 w-6 text-primary" />,
    color: "bg-yellow-50",
  },
  {
    name: "Computer Labs",
    icon: <Computer className="h-6 w-6 text-primary" />,
    color: "bg-red-50",
  },
  {
    name: "Doubt Classes",
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    color: "bg-teal-50",
  },
];

export default function AnimatedFacilitiesChart() {
  // Calculate circular positions
  const radius = 160; // Slightly smaller radius for better pie appearance

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl  text-center md:text-4xl font-bold text-blue-600 mb-4 ">
            Facilities We Provide
          </h2>
        </motion.div>

        {/* Pie animation container */}
        <div className="relative h-[400px] flex justify-center items-center">
          {facilities.map((facility, index) => {
            // Calculate position on a circle
            const angle = (index / facilities.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={facility.name}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  x,
                  y,
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 50,
                }}
                className="absolute rounded-lg shadow-md bg-white p-3 w-24 h-24 flex flex-col justify-center items-center"
                style={{
                  transformOrigin: "center center",
                }}
              >
                <div className={`${facility.color} p-2 rounded-full mb-2`}>
                  {facility.icon}
                </div>
                <p className="text-xs font-medium text-gray-800 text-center">
                  {facility.name}
                </p>
              </motion.div>
            );
          })}

          {/* Center circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center"
          >
            <img src="/ita-icon.png" className="text-xs font-semibold "></img>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
