"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DroneVideoSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8"
        >
          Experience Our Campus from Above
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl shadow-xl max-w-6xl mx-auto aspect-video ring-4 ring-blue-100"
        >
          <video
            src="/ita-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
