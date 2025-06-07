"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Monitor,
  Cpu,
  Zap,
  Cog,
  Microscope,
  Wifi,
  Shield,
  Database,
  Cloud,
  Smartphone,
  Building2,
} from "lucide-react";

interface Lab {
  id: string;
  name: string;
  description: string;
  image: string;
  equipment: string[];
  capacity: number;
  features: string[];
  icon: string;
}

// Mock labs data - replace with actual API call
const labsData: Record<string, Lab[]> = {
  "computer-science": [
    {
      id: "1",
      name: "Advanced Computing Lab",
      description:
        "State-of-the-art computing facility with high-performance workstations for software development and research.",
      image:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Intel i7 Workstations",
        "4K Monitors",
        "SSD Storage",
        "High-speed Internet",
      ],
      capacity: 60,
      features: ["24/7 Access", "Air Conditioned", "Backup Power"],
      icon: "Monitor",
    },
    {
      id: "2",
      name: "AI & Machine Learning Lab",
      description:
        "Dedicated facility for artificial intelligence research with GPU clusters and specialized software.",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "NVIDIA RTX GPUs",
        "TensorFlow",
        "PyTorch",
        "Jupyter Notebooks",
      ],
      capacity: 40,
      features: ["GPU Computing", "Cloud Integration", "Research Support"],
      icon: "Cpu",
    },
    {
      id: "3",
      name: "Cybersecurity Lab",
      description:
        "Secure environment for learning ethical hacking, network security, and digital forensics.",
      image:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Penetration Testing Tools",
        "Network Analyzers",
        "Forensic Software",
      ],
      capacity: 30,
      features: ["Isolated Network", "Security Tools", "Incident Response"],
      icon: "Shield",
    },
    {
      id: "4",
      name: "Database Systems Lab",
      description:
        "Comprehensive database management and big data analytics facility.",
      image:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: ["Oracle Database", "MySQL", "MongoDB", "Hadoop Cluster"],
      capacity: 50,
      features: ["Big Data Tools", "Cloud Databases", "Analytics Software"],
      icon: "Database",
    },
    {
      id: "5",
      name: "Mobile App Development Lab",
      description:
        "Modern facility for iOS and Android app development with latest tools and devices.",
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Mac Studios",
        "Android Devices",
        "iOS Simulators",
        "Testing Devices",
      ],
      capacity: 35,
      features: [
        "Cross-platform Tools",
        "Device Testing",
        "App Store Publishing",
      ],
      icon: "Smartphone",
    },
    {
      id: "6",
      name: "Cloud Computing Lab",
      description:
        "Hands-on experience with cloud platforms and distributed computing systems.",
      image:
        "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "AWS Access",
        "Azure Platform",
        "Google Cloud",
        "Docker Containers",
      ],
      capacity: 45,
      features: [
        "Multi-cloud Setup",
        "Container Orchestration",
        "Serverless Computing",
      ],
      icon: "Cloud",
    },
  ],

  cst: [
    {
      id: "1",
      name: "Advanced Computing Lab",
      description:
        "State-of-the-art computing facility with high-performance workstations for software development and research.",
      image:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Intel i7 Workstations",
        "4K Monitors",
        "SSD Storage",
        "High-speed Internet",
      ],
      capacity: 60,
      features: ["24/7 Access", "Air Conditioned", "Backup Power"],
      icon: "Monitor",
    },
    {
      id: "2",
      name: "AI & Machine Learning Lab",
      description:
        "Dedicated facility for artificial intelligence research with GPU clusters and specialized software.",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "NVIDIA RTX GPUs",
        "TensorFlow",
        "PyTorch",
        "Jupyter Notebooks",
      ],
      capacity: 40,
      features: ["GPU Computing", "Cloud Integration", "Research Support"],
      icon: "Cpu",
    },
    {
      id: "3",
      name: "Cybersecurity Lab",
      description:
        "Secure environment for learning ethical hacking, network security, and digital forensics.",
      image:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Penetration Testing Tools",
        "Network Analyzers",
        "Forensic Software",
      ],
      capacity: 30,
      features: ["Isolated Network", "Security Tools", "Incident Response"],
      icon: "Shield",
    },
    {
      id: "4",
      name: "Database Systems Lab",
      description:
        "Comprehensive database management and big data analytics facility.",
      image:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: ["Oracle Database", "MySQL", "MongoDB", "Hadoop Cluster"],
      capacity: 50,
      features: ["Big Data Tools", "Cloud Databases", "Analytics Software"],
      icon: "Database",
    },
    {
      id: "5",
      name: "Mobile App Development Lab",
      description:
        "Modern facility for iOS and Android app development with latest tools and devices.",
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Mac Studios",
        "Android Devices",
        "iOS Simulators",
        "Testing Devices",
      ],
      capacity: 35,
      features: [
        "Cross-platform Tools",
        "Device Testing",
        "App Store Publishing",
      ],
      icon: "Smartphone",
    },
    {
      id: "6",
      name: "Cloud Computing Lab",
      description:
        "Hands-on experience with cloud platforms and distributed computing systems.",
      image:
        "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "AWS Access",
        "Azure Platform",
        "Google Cloud",
        "Docker Containers",
      ],
      capacity: 45,
      features: [
        "Multi-cloud Setup",
        "Container Orchestration",
        "Serverless Computing",
      ],
      icon: "Cloud",
    },
  ],

  ee: [
    {
      id: "1",
      name: "Power Systems Lab",
      description:
        "High-voltage laboratory for power generation and distribution studies.",
      image:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Transformers",
        "Generators",
        "Protection Relays",
        "SCADA Systems",
      ],
      capacity: 45,
      features: [
        "High Voltage Safety",
        "Grid Simulation",
        "Renewable Integration",
      ],
      icon: "Zap",
    },
    {
      id: "2",
      name: "Control Systems Lab",
      description:
        "Advanced control and instrumentation laboratory with modern equipment.",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "PID Controllers",
        "MATLAB/Simulink",
        "Signal Generators",
        "Oscilloscopes",
      ],
      capacity: 40,
      features: ["Real-time Control", "System Modeling", "Feedback Analysis"],
      icon: "Monitor",
    },
  ],

  // electrical: [
  //   {
  //     id: "1",
  //     name: "Power Systems Lab",
  //     description:
  //       "High-voltage laboratory for studying power generation, transmission, and distribution systems.",
  //     image:
  //       "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     equipment: [
  //       "Transformers",
  //       "Synchronous Generators",
  //       "Circuit Breakers",
  //       "SCADA Panels",
  //     ],
  //     capacity: 45,
  //     features: ["Grid Simulation", "Load Testing", "Renewable Integration"],
  //     icon: "Zap",
  //   },
  //   {
  //     id: "2",
  //     name: "Control & Instrumentation Lab",
  //     description:
  //       "Real-time control system experiments using simulation and physical control units.",
  //     image:
  //       "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     equipment: [
  //       "PID Controllers",
  //       "Data Acquisition Systems",
  //       "Function Generators",
  //       "MATLAB/Simulink",
  //     ],
  //     capacity: 40,
  //     features: ["System Modelling", "Signal Analysis", "Real-time Feedback"],
  //     icon: "Monitor",
  //   },
  //   {
  //     id: "3",
  //     name: "Electrical Machines Lab",
  //     description:
  //       "Study of DC machines, induction motors, synchronous machines and performance analysis.",
  //     image:
  //       "https://images.pexels.com/photos/5074106/pexels-photo-5074106.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     equipment: ["DC Motors", "Induction Motors", "Load Banks", "Wattmeters"],
  //     capacity: 35,
  //     features: ["Machine Testing", "Speed-Torque Analysis", "Variable Loads"],
  //     icon: "Cog",
  //   },
  // ],

  etce: [
    {
      id: "1",
      name: "Communication Systems Lab",
      description:
        "Explore analog and digital communication systems through modulation, multiplexing, and noise analysis.",
      image:
        "https://plus.unsplash.com/premium_photo-1663050681752-4c95effcca58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMGxhYnxlbnwwfHwwfHx8MA%3D%3D",
      equipment: [
        "Modulation Kits",
        "Spectrum Analyzers",
        "CROs",
        "Digital Communication Trainers",
      ],
      capacity: 35,
      features: [
        "Analog & Digital Modules",
        "Signal Visualization",
        "Noise Handling",
      ],
      icon: "Wifi",
    },
    {
      id: "2",
      name: "VLSI & Embedded Systems Lab",
      description:
        "Hands-on lab for embedded systems design, microcontrollers, and FPGA prototyping.",
      image:
        "https://plus.unsplash.com/premium_photo-1663040598592-9f3e311f9841?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      equipment: [
        "Arduino Boards",
        "Raspberry Pi",
        "8051 Trainers",
        "FPGA Kits",
      ],
      capacity: 30,
      features: ["Hardware Interfacing", "IoT Kits", "Real-time Systems"],
      icon: "Cpu",
    },
    {
      id: "3",
      name: "Signal Processing Lab",
      description:
        "Focused on digital signal processing using MATLAB and DSP kits for real-time analysis.",
      image:
        "https://plus.unsplash.com/premium_photo-1691784080844-8300ab4c6790?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      equipment: [
        "DSP Kits",
        "MATLAB Toolboxes",
        "Oscilloscopes",
        "Signal Generators",
      ],
      capacity: 32,
      features: ["Filter Design", "Fourier Analysis", "Waveform Synthesis"],
      icon: "Microscope",
    },
  ],
};

const iconMap = {
  Monitor,
  Cpu,
  Zap,
  Cog,
  Microscope,
  Wifi,
  Shield,
  Database,
  Cloud,
  Smartphone,
};

interface LabsAndFacilitiesSectionProps {
  departmentId: string;
}

export default function LabsAndFacilitiesSection({
  departmentId,
}: LabsAndFacilitiesSectionProps) {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      setIsLoading(true);
      try {
        // Simulate API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 300));
        const departmentLabs =
          labsData[departmentId] || labsData["computer-science"];
        setLabs(departmentLabs);
      } catch (error) {
        console.error("Failed to fetch labs data:", error);
        setLabs(labsData["computer-science"]);
      } finally {
        setIsLoading(false);
      }
    };

    if (departmentId) {
      fetchLabs();
    }
  }, [departmentId]);

  if (isLoading) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-2xl h-80 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Labs, Facilities & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our best laboratories and facilities designed to provide
            hands-on learning experiences and foster innovation in research and
            development.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab, index) => {
            const IconComponent =
              iconMap[lab.icon as keyof typeof iconMap] || Monitor;

            return (
              <Card
                key={lab.id}
                className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  index % 2 === 0 ? "lg:mt-0" : "lg:mt-8"
                }`}
              >
                {/* Lab Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      Capacity: {lab.capacity}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Lab Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {lab.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {lab.description}
                  </p>

                  {/* Equipment */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Key Equipment:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {lab.equipment.slice(0, 3).map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {lab.equipment.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lab.equipment.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Features:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {lab.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Our Facilities
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
              Schedule a visit to explore our state-of-the-art laboratories and
              see how our facilities can enhance your learning experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Building2 className="h-4 w-4 mr-2" />
                Moder Infra
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Safety Certified
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Monitor className="h-4 w-4 mr-2" />
                Latest Technology
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
