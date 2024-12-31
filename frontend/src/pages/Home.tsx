import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import { TracingBeam } from '../components/ui/TracingBeam';
import { HoverEffect } from '../components/ui/HoverEffect';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { ResumeDemo } from '../components/ui/ResumeDemo';
import { Button } from '../components/ui/Button';
import { SparklesCore } from '../components/ui/SparklesCore';

// Features section data
const features = [
  {
    title: "Suggestions IA",
    description: "Améliorez votre CV avec des suggestions personnalisées basées sur l'IA",
    icon: "✨",
  },
  {
    title: "Templates Modernes",
    description: "Choisissez parmi une collection de templates professionnels",
    icon: "🎨",
  },
  {
    title: "Export PDF",
    description: "Exportez votre CV en haute qualité, prêt à l'emploi",
    icon: "📄",
  },
  {
    title: "Personnalisation",
    description: "Adaptez chaque aspect de votre CV à vos besoins",
    icon: "⚡",
  },
];

// Steps section data
const steps = [
  {
    title: "Importez votre CV",
    description: "Téléchargez votre CV existant ou partez de zéro",
    icon: "📄",
    color: "blue"
  },
  {
    title: "Personnalisez",
    description: "Modifiez et améliorez votre CV avec l'aide de l'IA",
    icon: "✨",
    color: "purple"
  },
  {
    title: "Exportez",
    description: "Téléchargez votre CV au format PDF professionnel",
    icon: "⬇️",
    color: "green"
  }
];

// Testimonials section data
const testimonials = [
  {
    name: "Marie L.",
    role: "Développeuse Full-Stack",
    content: "J'ai décroché mon job de rêve grâce à ResumeAI. L'IA m'a vraiment aidée à mettre en valeur mes compétences.",
    image: "/testimonials/marie.jpg"
  },
  {
    name: "Thomas D.",
    role: "Product Manager",
    content: "Interface intuitive et suggestions pertinentes. Je recommande à 100% !",
    image: "/testimonials/thomas.jpg"
  }
];

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-screen min-h-screen bg-black overflow-hidden">
      {/* Container pour le contenu avec le fond stylisé */}
      <div className="w-full h-full bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <SparklesCore
            id="hero-sparkles"
            className="absolute inset-0"
            particleColor="#4F46E5"
          />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <h1 className="text-6xl font-bold text-white mb-6 tracking-normal leading-tight">
              Créez un CV <br />
              professionnel en <br />
              quelques minutes
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Utilisez notre technologie d'intelligence artificielle pour générer un CV 
              qui se démarque. Simple, rapide et efficace.
            </p>
            
            <div className="flex gap-4">
              <Link to={user ? "/resumes/new" : "/signup"}>
                <Button size="lg" variant="default">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline">
                  Voir les templates
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-24">
          <TracingBeam className="px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-white mb-16">
                Comment ça marche ?
              </h2>
              <ResumeDemo />
            </div>
          </TracingBeam>
        </section>

        {/* Features Section */}
        <section className="py-24 w-full bg-gradient-to-b from-gray-900 to-black">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Fonctionnalités principales
            </h2>
            <HoverEffect items={features} />
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              En trois étapes simples
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{step.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Ce qu'en pensent nos utilisateurs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold text-white mb-8">
              Prêt à créer votre CV ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Rejoignez des milliers d'utilisateurs qui ont déjà créé leur CV avec ResumeAI.
            </p>
            <Link to={user ? "/resumes/new" : "/signup"}>
              <Button size="lg" variant="default">
                Commencer gratuitement
              </Button>
            </Link>
          </div>
        </section>

        <Footer className="w-full" />
      </div>
    </div>
  );
}; 