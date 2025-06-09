"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Target, Award } from "lucide-react";
import Location from "@/components/home/Location";

export default function About() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner with Background Image and Animation */}
      <div
        className="relative bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/about-banner.png')" }} // Optional background image
      >
        {/* Optional Decorative Overlay */}
        <Image
          src="/home-overly.png"
          alt="About Overlay"
          width={180}
          height={180}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 z-10 pointer-events-none p-4"
        />

        {/* Text Content */}
        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">About Us</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Learn about our institution, mission, vision, and commitment to
              <span className="font-semibold text-white">
                {" "}
                quality technical education
              </span>
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* College Introduction */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                College Introduction
              </h2>
              <p className="text-gray-700 mb-4">
                Itahar Government Polytechnic is a{" "}
                <span className="font-semibold">
                  government-run polytechnic college
                </span>{" "}
                established in West Bengal to provide quality technical
                education to students. Founded in{" "}
                <span className="font-semibold">2016</span>, our institution
                aims to nurture skilled professionals who can contribute to
                technological advancement and industrial development.
              </p>
              <p className="text-gray-700 mb-4">
                We are affiliated with the{" "}
                <span className="font-semibold">
                  West Bengal State Council of Technical and Vocational
                  Education and Skill Development (WBSCT&VE&SD)
                </span>{" "}
                and approved by the{" "}
                <span className="font-semibold">
                  All India Council for Technical Education (AICTE)
                </span>
                , ensuring that our programs meet national standards for
                technical education.
              </p>
              <p className="text-gray-700">
                Our campus is equipped with modern laboratories, workshops, and
                classrooms to provide students with hands-on experience
                alongside theoretical knowledge. We take pride in our dedicated
                faculty members who bring their expertise and industry
                experience to guide students toward successful careers.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                // src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg"
                src="/ita-44.png"
                alt="Itahar Government Polytechnic Campus"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </motion.section>

        {/* Mission and Vision */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <Users className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                <h2 className="text-2xl font-bold ml-3 text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                To provide quality technical education that equips students with
                the knowledge, skills, and values necessary to excel in their
                chosen fields and contribute meaningfully to society.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Deliver high-quality technical education that meets industry
                  standards
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Develop skilled professionals with strong theoretical and
                  practical knowledge
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Foster innovation, creativity, and problem-solving abilities
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Promote ethical practices and social responsibility
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <Target className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                <h2 className="text-2xl font-bold ml-3 text-gray-800">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                To emerge as a leading institution for technical education that
                is recognized for excellence, innovation, and its contribution
                to technological advancement and industrial development.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Be a center of excellence in technical education
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Establish strong industry-academia collaboration
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Create an environment that fosters research and innovation
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Produce graduates who are sought after by industry and
                  academia
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Principal's Message */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary border-b pb-2">
              Principal's Message
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-40 h-40 relative rounded-full overflow-hidden shrink-0 border-4 border-primary/20">
                <Image
                  src="/principle-old.jpg"
                  alt="Principal"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <blockquote className="text-gray-700 italic mb-4">
                  "At Itahar Government Polytechnic, we believe in imparting
                  <span className="font-semibold">
                    {" "}
                    quality technical education
                  </span>{" "}
                  that bridges the gap between industry and academia. Our goal
                  is to nurture skilled professionals who are not only
                  technically competent but also ethical and socially
                  responsible. We strive to create an environment where students
                  can develop their full potential through a combination of
                  rigorous academic programs and practical training.
                  <br />
                  <br />
                  Our dedicated faculty members are committed to guiding
                  students on their educational journey, providing them with the
                  knowledge, skills, and values necessary to succeed in their
                  chosen fields. We encourage our students to think critically,
                  innovate, and apply their learning to real-world problems.
                  <br />
                  <br />I invite you to explore our institution and discover the
                  opportunities we offer for a rewarding career in engineering
                  and technology."
                </blockquote>
                <div className="font-semibold text-gray-900">
                  Mr. Anjan Kumar Acharya
                  <p className="font-normal text-gray-600 text-sm">
                    Principal, Itahar Government Polytechnic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Basic Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary border-b pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Award className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-semibold text-lg text-gray-800">
                    Established
                  </h3>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">2019</span>
                </p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 text-primary mr-2" />{" "}
                  <h3 className="font-semibold text-lg text-gray-800">
                    {" "}
                    Intake Capacity{" "}
                  </h3>{" "}
                </div>{" "}
                <p className="text-gray-700">
                  <span className="font-semibold">240 students/year</span>
                </p>{" "}
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Target className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-semibold text-lg text-gray-800">
                    Location
                  </h3>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Itahar, West Bengal</span>
                </p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Award className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-semibold text-lg text-gray-800">
                    Affiliation
                  </h3>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">WBSCT&VE&SD</span>
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        <Location />
      </div>
    </main>
  );
}
