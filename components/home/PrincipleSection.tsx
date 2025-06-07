import { motion } from "framer-motion";

const principalThoughts = {
  name: "Mr. Anjan Kumar Acharya",
  message: `At our institution, we don't just educate minds—we inspire them. 
  Every brick here holds a dream, and every classroom sparks a vision. 
  We believe in nurturing not only knowledge but also integrity, compassion, and innovation. 
  Our students are the architects of a better tomorrow, and I take pride in being a small part of that journey.`,
  imageUrl: "/principle-old.jpg",
};

export default function PrincipalSection() {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 py-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-10"
      >
        {/* Image Frame */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="border-2 border-indigo-500 rounded-xl overflow-hidden shadow-lg w-72 h-96"
        >
          <img
            src={principalThoughts.imageUrl}
            alt="Principal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 min-w-[300px] text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            A Word from the Principal
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {principalThoughts.message}
          </p>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 text-2xl md:text-3xl text-right text-gray-800 font-light italic"
          >
            —{" "}
            <span className="signature text-4xl text-indigo-600 font-cursive">
              {principalThoughts.name}
            </span>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
