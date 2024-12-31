import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Wand2, Download, Check } from 'lucide-react';
import { ResumeTemplateCarousel } from './ResumeTemplateCarousel';

const steps = [
  {
    title: "Upload Your Resume",
    icon: Upload,
    description: "Start by uploading your existing resume or create one from scratch",
    demo: (
      <div className="relative h-64 bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-4 rounded-full bg-blue-500/10">
              <Upload className="h-8 w-8 text-blue-400" />
            </div>
            <p className="text-white/70">Drag and drop your resume here</p>
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
              Browse Files
            </button>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    title: "AI Analysis",
    icon: Wand2,
    description: "Our AI analyzes your resume and suggests improvements",
    demo: (
      <div className="relative h-64 bg-gray-800/50 rounded-lg border border-gray-700/50 p-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
        />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-white/70">Analyzing resume structure...</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <p className="text-white/70">Keywords identified</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-violet-400 animate-pulse" />
            <p className="text-white/70">Generating suggestions...</p>
          </div>
          <motion.div
            className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-white/80">
              💡 Suggestion: Add quantifiable achievements to your experience section
            </p>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    title: "Smart Formatting",
    icon: FileText,
    description: "Choose from ATS-friendly templates and customize your layout",
    demo: (
      <div className="relative">
        <ResumeTemplateCarousel />
      </div>
    )
  }
];

export const DemoSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative">
      {/* Steps indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.button
                className={`relative rounded-full p-2 ${
                  index === activeStep ? 'bg-blue-500/20' : 'bg-gray-800'
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveStep(index)}
              >
                <step.icon className={`h-6 w-6 ${
                  index === activeStep ? 'text-blue-400' : 'text-gray-400'
                }`} />
                {index === activeStep && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  />
                )}
              </motion.button>
              {index < steps.length - 1 && (
                <div className="w-20 h-[2px] bg-gray-700" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            {steps[activeStep].title}
          </h3>
          <p className="text-white/70">
            {steps[activeStep].description}
          </p>
        </div>

        {steps[activeStep].demo}
      </motion.div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-8 gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeStep ? 'bg-blue-400' : 'bg-gray-700'
            }`}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>
    </div>
  );
}; 