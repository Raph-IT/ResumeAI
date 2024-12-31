import React from 'react';
import { Bot, Target, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI-Powered Applications",
    description: "Our AI analyzes job descriptions and optimizes your applications for maximum impact"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Targeted Matching",
    description: "Get matched with AI jobs that perfectly align with your skills and experience"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Quick Apply",
    description: "Apply to multiple positions with one click using our smart application system"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Review",
    description: "Get feedback from AI industry professionals on your applications"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white relative" id="how-it-works">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-gray/[0.2] bg-grid-16" />
      
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          How It Works
          <div className="h-1 w-20 bg-indigo-600 mx-auto mt-4 rounded-full" />
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-xl 
                         transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fade-in-up 0.6s ease-out forwards'
              }}
            >
              <div className="text-center">
                <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4 
                               group-hover:bg-indigo-200 transition-colors duration-300
                               group-hover:scale-110 transform">
                  {React.cloneElement(feature.icon, {
                    className: "h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300"
                  })}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-600/20 
                             rounded-xl transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );