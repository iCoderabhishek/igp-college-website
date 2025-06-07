"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-8"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-primary border-b pb-2">
        About Our Institution
      </h2>

      <p className="text-gray-700 mb-4">
        <span className="font-bold">Itahar Government Polytechnic </span>
        is a government-run polytechnic college established in West Bengal,
        providing technical education to nurture skilled professionals in
        various engineering disciplines.
      </p>

      <p className="text-gray-700 mb-4">
        Affiliated to{" "}
        <span className="font-semibold">
          West Bengal State Council of Technical and Vocational Education and
          Skill Development (WBSCT&VE&SD) and approved by AICTE{" "}
        </span>
        , we maintain high standards of technical education with modern
        facilities and experienced faculty.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
          AICTE Approved
        </span>
        <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
          Government Institution
        </span>
        <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
          Est. 2019
        </span>
      </div>

      <Link
        href="/about"
        className="inline-flex items-center text-primary hover:underline font-medium"
      >
        Learn more about us <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
}
