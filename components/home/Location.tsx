import React from "react";
import { motion } from "framer-motion";

const Location = () => {
  return (
    <div>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl  text-center md:text-4xl font-extrabold text-blue-600 pb-8 ">
            Our Location
          </h2>
          <div className="rounded-lg overflow-hidden h-[400px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.8808540897116!2d88.15980567524328!3d25.442246577554045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fad80c6dcfe01b%3A0xc7ea3ee4f6a016f4!2sItahar%20Government%20Polytechnic%20College!5e0!3m2!1sen!2sin!4v1745949850334!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Itahar Government Polytechnic Location"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Location;
