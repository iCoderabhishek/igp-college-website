"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = ["/ita-1.png", "/ita-44.png", "/ita-4.png"];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden bg-gradient-to-b from-primary/90 to-primary">
      {/* Slider Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={i} className="relative min-w-full h-full">
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
              <div className="absolute inset-0">
                <Image
                  src="/home-overly.png"
                  alt="Overlay"
                  fill
                  className="opacity-50"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Text Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Itahar Government Polytechnic
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            Polytechnic College under Government of West Bengal, AICTE Approved
          </p>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg font-semibold">
            Empowering students with quality technical education and
            professional skills for the technological advancement of the nation
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/courses"
              className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-all duration-300"
            >
              Explore Courses
            </a>
            <a
              href="/about"
              className="bg-transparent text-white border border-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-all duration-300"
            >
              About Us
            </a>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
