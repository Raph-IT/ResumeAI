import React from 'react';
import { Card } from '../../ui/Card';
import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

interface ContactSectionProps {
  formData: {
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactSection = ({ formData, handleChange }: ContactSectionProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
          Contact
        </h2>

        {/* Email et Téléphone */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 h-11 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 h-11 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                placeholder="+33 6 12 34 56 78"
                required
              />
            </div>
          </div>
        </div>

        {/* Réseaux sociaux et site web */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              LinkedIn
            </label>
            <div className="relative group">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full pl-10 h-11 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                placeholder="https://linkedin.com/in/votre-profil"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              GitHub
            </label>
            <div className="relative group">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full pl-10 h-11 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                placeholder="https://github.com/votre-profil"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Site web personnel
            </label>
            <div className="relative group">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full pl-10 h-11 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                placeholder="https://votre-site.com"
              />
            </div>
          </div>
        </div>

        {/* Message d'aide */}
        <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 p-4">
          <p className="text-sm text-blue-400">
            💡 Conseil : Ajoutez vos réseaux professionnels pour permettre aux recruteurs de mieux vous connaître.
          </p>
        </div>
      </div>
    </Card>
  );
}; 