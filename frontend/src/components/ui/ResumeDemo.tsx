"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Search, Wand2, Check } from "lucide-react";

// Modifions la structure des étapes de génération
const generationSteps = [
  {
    message: "Analyse des mots-clés de l'offre...",
    preview: {
      completion: 0,
      highlightedSkills: []
    }
  },
  {
    message: "Identification des compétences requises...",
    preview: {
      completion: 25,
      highlightedSkills: ["React", "Node.js"]
    }
  },
  {
    message: "Adaptation du contenu...",
    preview: {
      completion: 50,
      highlightedSkills: ["React", "Node.js", "TypeScript", "Agile"]
    }
  },
  {
    message: "Optimisation du format...",
    preview: {
      completion: 75,
      highlightedSkills: ["React", "Node.js", "TypeScript", "Agile", "Architecture microservices"]
    }
  },
  {
    message: "Finalisation du CV...",
    preview: {
      completion: 100,
      highlightedSkills: ["React", "Node.js", "TypeScript", "Agile", "Architecture microservices"]
    }
  }
];

// Ajout des templates de CV
const generatedTemplates = [
  {
    id: 1,
    name: "Modern Pro",
    preview: "/templates/modern-preview.png",
    match: "98%",
    highlights: ["Format ATS-friendly", "Mise en avant des compétences techniques"]
  },
  {
    id: 2,
    name: "Executive",
    preview: "/templates/executive-preview.png",
    match: "95%",
    highlights: ["Design professionnel", "Structure claire"]
  },
  {
    id: 3,
    name: "Creative Tech",
    preview: "/templates/creative-preview.png",
    match: "92%",
    highlights: ["Layout innovant", "Sections personnalisées"]
  }
];

const demoSteps = [
  {
    id: 1,
    title: "Importez votre CV",
    description: "Téléchargez votre CV existant pour extraire vos informations",
    icon: Upload,
    demoContent: `
      Glissez-déposez votre CV ici
      ou
      Cliquez pour sélectionner un fichier
      
      Formats acceptés : PDF, DOCX
    `
  },
  {
    id: 2,
    title: "Validez vos informations",
    description: "Vérifiez et ajustez les informations extraites de votre CV",
    icon: FileText,
    demoContent: {
      personalInfo: {
        name: "Thomas Martin",
        title: "Développeur Full Stack",
        email: "thomas.martin@email.com"
      },
      experience: [
        {
          company: "Tech Solutions",
          position: "Senior Developer",
          period: "2020 - Present"
        }
      ]
    }
  },
  {
    id: 3,
    title: "Ajoutez l'offre d'emploi",
    description: "Collez la description du poste qui vous intéresse",
    icon: Search,
    demoContent: `
      Développeur Full Stack (H/F)
      
      Nous recherchons un développeur expérimenté maîtrisant :
      - React, Node.js, TypeScript
      - Architecture microservices
      - Méthodologies Agile
    `
  },
  {
    id: 4,
    title: "Génération du CV optimisé",
    description: "L'IA adapte votre CV pour correspondre parfaitement au poste",
    icon: Wand2,
    demoContent: {
      type: "generation",
      templates: generatedTemplates
    }
  }
];

// Composant pour l'aperçu progressif
const ProgressivePreview = ({ preview, isVisible }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      {/* En-tête du CV */}
      <div className="mb-6">
        <motion.h3 
          className="text-xl font-bold text-white mb-2"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: preview.completion > 25 ? 1 : 0.3 }}
        >
          Thomas Martin
        </motion.h3>
        <motion.p 
          className="text-gray-400"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: preview.completion > 25 ? 1 : 0.3 }}
        >
          Développeur Full Stack
        </motion.p>
      </div>

      {/* Compétences mises en évidence */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Compétences clés</h4>
        <div className="flex flex-wrap gap-2">
          {preview.highlightedSkills.map((skill: string, index: number) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
          initial={{ width: "0%" }}
          animate={{ width: `${preview.completion}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export const ResumeDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessageIndex, setGenerationMessageIndex] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);

  const renderDemoContent = (content: any) => {
    if (typeof content === "string") {
      return <div className="text-gray-300 whitespace-pre-line">{content}</div>;
    }

    if (content?.personalInfo) {
      return (
        <div className="space-y-4">
          <div className="text-white">
            <h4 className="text-xl font-bold">{content.personalInfo.name}</h4>
            <p className="text-gray-400">{content.personalInfo.title}</p>
            <p className="text-gray-400">{content.personalInfo.email}</p>
          </div>
          <div className="space-y-2">
            {content.experience.map((exp: any, index: number) => (
              <div key={index} className="text-gray-300">
                <p className="font-medium">{exp.company}</p>
                <p className="text-sm text-gray-400">
                  {exp.position} • {exp.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (content?.type === "generation") {
      if (isGenerating) {
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
              />
              <motion.p
                key={generationMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-300 text-lg"
              >
                {generationSteps[generationMessageIndex].message}
              </motion.p>
            </div>
            
            {/* Aperçu progressif du CV */}
            <ProgressivePreview 
              preview={generationSteps[generationMessageIndex].preview}
              isVisible={generationMessageIndex > 0}
            />
          </div>
        );
      }

      if (showTemplates) {
        return (
          <div className="space-y-6">
            <h4 className="text-white font-medium mb-4">
              CV optimisés générés pour vous
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {generatedTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-4 cursor-pointer border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  <div className="relative mb-3">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="rounded w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Match {template.match}
                    </div>
                  </div>
                  <h5 className="text-white font-medium mb-2">{template.name}</h5>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {template.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  const handleNextStep = () => {
    if (currentStep === demoSteps.length - 2) {
      setIsGenerating(true);
      setShowTemplates(false);
      let messageIndex = 0;
      
      // Réduction du temps entre chaque message
      const messageInterval = setInterval(() => {
        if (messageIndex < generationSteps.length - 1) {
          messageIndex++;
          setGenerationMessageIndex(messageIndex);
        } else {
          clearInterval(messageInterval);
          setTimeout(() => {
            setIsGenerating(false);
            setShowTemplates(true);
            setCurrentStep(currentStep + 1);
          }, 500); // Réduction du délai final
        }
      }, 1000); // Réduction du délai entre les messages
    } else {
      setCurrentStep(prev => Math.min(prev + 1, demoSteps.length - 1));
    }
  };

  return (
    <div className="relative bg-gray-900/50 rounded-xl border border-gray-800 p-8">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                {React.createElement(demoSteps[currentStep].icon, {
                  className: "w-6 h-6 text-blue-500"
                })}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {demoSteps[currentStep].title}
                </h3>
                <p className="text-gray-400">
                  {demoSteps[currentStep].description}
                </p>
              </div>
            </div>

            {/* Demo content visualization */}
            <div className="bg-gray-800/50 rounded-lg p-6 min-h-[200px]">
              {renderDemoContent(demoSteps[currentStep].demoContent)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
        >
          Précédent
        </button>

        <button
          onClick={handleNextStep}
          disabled={currentStep === demoSteps.length - 1}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full text-white font-medium disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Génération en cours...</span>
            </div>
          ) : (
            currentStep === demoSteps.length - 1 ? (
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>CV optimisé généré !</span>
              </div>
            ) : (
              "Étape suivante"
            )
          )}
        </button>
      </div>
    </div>
  );
}; 