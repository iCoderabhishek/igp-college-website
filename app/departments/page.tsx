"use client";

import { motion } from "framer-motion";
import DepartmentComponent from "@/components/courses/DepartmentComponent";
import UserAcademicData from "@/components/user-departments/UserAcademicData";
import DepartmentCard from "@/components/user-departments/DepartmentCard";
import Image from "next/image";

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner */}
      <div
        className="relative bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/dept-banner.png')" }}
      >
        {/* Overlay image in center with some opacity */}
        <Image
          src="/home-overly.png"
          alt="Overlay"
          width={300}
          height={300}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 z-10"
        />

        {/* Content with higher z-index */}
        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Our Departments
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto font-semibold text-xl">
              Explore our academic departments offering specialized technical
              education in various engineering disciplines
            </p>
          </motion.div>
        </div>
      </div>

      {/* Department Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* <DepartmentComponent /> */}
        {/* <UserAcademicData /> */}
        <div className="container mx-auto px-4 py-8">
          <DepartmentCard />
        </div>
      </motion.div>
    </main>
  );
}
