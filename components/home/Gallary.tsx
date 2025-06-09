"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "ita-gallery-10.jpg",
  "/ita-1.png",
  "/ita-2.png",
  "/ita-gallery-9.png",
  "/ita-3.png",

  "ita-gallery-8.jpg",
  "ita-gallery-9.jpg",
  "ita-gallery-11.jpg",
  "ita-gallery-12.jpg",
  "ita-gallery-13.jpg",

  "/ita-gallery-4.png",
  "/ita-gallery-5.png",
  "/ita-gallery-6.png",
  "/ita-gallery-7.png",
  "/ita-gallery-8.png",
  "/ita-gallery-10.jpg",
  "/ita-gallery-14.jpg",
  "/ita-gallery-15.jpg",
];

export default function Gallery() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12"
        >
          Glimpses of Campus Life
        </motion.h2>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl shadow-lg break-inside-avoid"
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Get More About Our Campus
          </h3>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
