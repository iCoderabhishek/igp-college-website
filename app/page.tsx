"use client";

import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import QuickLinks from "@/components/home/QuickLinks";
import NoticeScroller from "@/components/notices/NoticeScroller";
import { motion } from "framer-motion";
import FacilitiesWeProvide from "@/components/home/FacilitiesWeProvide";
import CoursesOffered from "@/components/home/CoursesOffered";
import AnimatedFacilitiesChart from "@/components/home/FacilitiesWeProvide";
import PrincipalSection from "@/components/home/PrincipleSection";
import Location from "@/components/home/Location";
import DroneVideoSection from "@/components/home/DroneVideoSection";
import CTAS from "@/components/home/CTAS";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AboutPreview />
          <PrincipalSection />
          <QuickLinks />
          <AnimatedFacilitiesChart />
          <CoursesOffered />
          <DroneVideoSection />
          <Location />
        </motion.div>

        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-2xl font-bold mb-4 text-primary border-b pb-2">
              Notice Board
            </h2>
            <NoticeScroller limit={5} />
            <div className="mt-4 text-center">
              <a
                href="/notices"
                className="text-primary hover:underline font-medium"
              >
                View All Notices →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <CTAS />
    </main>
  );
}
