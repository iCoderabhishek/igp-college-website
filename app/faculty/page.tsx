"use client";

import { motion } from "framer-motion";
import FacultyComponent from "@/components/faculty/FacultyComponent";
import Image from "next/image";

export default function FacultyPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      <div
        className="relative bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/faculty-banner.png')" }}
      >
        {/* Overlay Icon (center, faded) */}
        <Image
          src="/home-overly.png"
          alt="Faculty Overlay"
          width={240}
          height={240}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 z-10 pointer-events-none"
        />

        {/* Animated Heading */}
        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Faculty</h1>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg font-semibold ">
              Meet our experienced and dedicated faculty members who are
              committed to providing quality education
            </p>
          </motion.div>
        </div>
      </div>
      {/* Faculty Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FacultyComponent />
      </motion.div>
    </main>
  );
}
