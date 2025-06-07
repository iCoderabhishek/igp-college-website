import React from "react";
import { motion } from "framer-motion";

const CTAS = () => {
  return (
    <div className="flex justify-center items-center mt-16 mb-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Get More About Us
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Have questions or want to know more about our college? We're here to
          help! Reach out to us for more information or assistance.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          Contact Us
        </a>
      </motion.div>
    </div>
  );
};

export default CTAS;
