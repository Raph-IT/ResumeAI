import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, Briefcase, MapPin, Phone, Mail, Link, Coins, Clock } from 'lucide-react';

interface ResumeFormProps {
  initialData: {
    fullName: string;
    jobTitle: string;
    phoneNumber: string;
    linkedinUrl: string;
    location: string;
    experienceLevel: string;
    minimumSalary: string;
    jobType: 'Full Time' | 'Part Time';
  };
  onSubmit: (data: any) => void;
}

const formFields = [
  { name: 'fullName', label: 'Full Name', icon: Mail, required: true },
  { name: 'jobTitle', label: 'Job Title', icon: Briefcase, required: true },
  { name: 'phoneNumber', label: 'Phone Number', icon: Phone, required: true },
  { name: 'linkedinUrl', label: 'LinkedIn URL', icon: Link },
  { name: 'location', label: 'Location', icon: MapPin, required: true },
  { name: 'minimumSalary', label: 'Minimum Salary', icon: Coins },
];

export default function ResumeForm({ initialData, onSubmit }: ResumeFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-300">
              {field.label}
              {field.required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register(field.name, { required: field.required })}
                className={`
                  w-full pl-10 pr-4 py-2 bg-gray-800/50 border 
                  ${errors[field.name] ? 'border-red-500' : 'border-gray-700'} 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-gray-200 placeholder-gray-500
                  transition-all duration-200
                `}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
              {errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {field.label} is required
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-300">
            Experience Level
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              {...register('experienceLevel')}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-gray-200 appearance-none"
            >
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-300">
            Job Type
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              {...register('jobType')}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-gray-200 appearance-none"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-8 py-3 mt-8
          bg-gradient-to-r from-blue-500 to-violet-500 
          hover:from-blue-600 hover:to-violet-600
          text-white rounded-lg font-medium
          transition-all duration-200 transform
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Save className="w-5 h-5 mr-2" />
            Save Profile
          </>
        )}
      </motion.button>
    </form>
  );
}