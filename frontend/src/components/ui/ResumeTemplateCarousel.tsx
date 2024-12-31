import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const templates = [
  {
    name: "Modern Professional",
    color: "blue",
    layout: (
      <div className="w-full h-[200px] bg-white rounded-lg shadow-xl overflow-hidden transform scale-[0.85]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/3 bg-blue-50 p-4 space-y-3">
            <div className="relative w-20 h-20 mx-auto overflow-hidden rounded-full border-2 border-white shadow-lg">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-blue-900 font-semibold border-b border-blue-200">Contact</h2>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1 text-blue-700">
                  <Mail size={12} /> <span>john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-1 text-blue-700">
                  <Phone size={12} /> <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-1 text-blue-700">
                  <MapPin size={12} /> <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {["React", "Node.js", "AWS", "TypeScript", "Docker"].map((skill) => (
                <span key={skill} className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px]">{skill}</span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 space-y-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">John Doe</h1>
              <p className="text-sm text-blue-600">Senior Software Engineer</p>
            </div>
            <div className="text-[11px] text-gray-600 leading-relaxed">
              5+ years of experience in developing user-centered digital solutions. Specialized in full-stack development with modern technologies.
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Experience</h3>
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Tech Corp</span>
                  <span>2020 - Present</span>
                </div>
                <p className="text-gray-600">Led development of cloud-native applications using React and Node.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    name: "Classic Simple",
    color: "gray",
    layout: (
      <div className="w-full h-[200px] bg-white rounded-lg shadow-xl overflow-hidden transform scale-[0.85] p-4">
        <div className="space-y-3">
          <div className="text-center border-b-2 border-gray-200 pb-2">
            <h1 className="text-xl font-bold text-gray-900">JOHN DOE</h1>
            <p className="text-[11px] text-gray-600">Software Engineer</p>
            <div className="text-[10px] text-gray-500 mt-1">
              San Francisco, CA | (555) 123-4567 | john.doe@email.com
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-[11px]">
            <div>
              <h2 className="font-bold text-gray-800 uppercase mb-1">Experience</h2>
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold">Senior Software Engineer</span>
                  <span>2020 - Present</span>
                </div>
                <div className="text-gray-600">Tech Corp, San Francisco</div>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  <li>Led development of cloud applications</li>
                  <li>Improved performance by 40%</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="font-bold text-gray-800 uppercase mb-1">Education</h2>
              <div className="text-gray-600">
                <p className="font-semibold">Stanford University</p>
                <p>B.S. Computer Science</p>
                <p>GPA: 3.8/4.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    name: "Creative Bold",
    color: "purple",
    layout: (
      <div className="w-full h-[200px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden transform scale-[0.85]">
        <div className="h-full relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          
          <div className="relative h-full p-5 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  John Doe
                </h1>
                <p className="text-[11px] text-gray-400">Creative Technologist & Full-Stack Developer</p>
              </div>
              <div className="flex gap-2">
                {["React", "Node", "AI", "Cloud"].map((tech) => (
                  <span key={tech} className="text-[10px] px-2 py-1 rounded-full border border-purple-500/20 text-purple-400 bg-purple-500/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="text-[11px] text-gray-400 leading-relaxed">
                Crafting innovative digital experiences with cutting-edge technologies. Specialized in building scalable applications and AI-driven solutions.
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-500">
                <div className="space-y-1">
                  <h3 className="text-purple-400">Latest Project</h3>
                  <p>AI-Powered Analytics Platform</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-blue-400">Expertise</h3>
                  <p>Full-Stack Development</p>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Mail size={10} /> john@doe.dev
                </span>
                <span className="flex items-center gap-1">
                  <Globe size={10} /> johndoe.dev
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export const ResumeTemplateCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {templates[currentIndex].layout}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 px-4 py-2 rounded-lg">
              <p className="text-white font-medium">{templates[currentIndex].name}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/80 text-white hover:bg-gray-900 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/80 text-white hover:bg-gray-900 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs */}
      <div className="flex justify-center gap-2 mt-4">
        {templates.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}; 