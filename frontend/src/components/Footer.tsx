import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  product: [
    { name: 'Fonctionnalités', href: '/features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
  ],
  resources: [
    { name: 'Guide de démarrage', href: '/guide' },
    { name: 'Blog', href: '/blog' },
    { name: 'Exemples de CV', href: '/examples' },
    { name: 'Conseils CV', href: '/tips' },
  ],
  legal: [
    { name: 'Confidentialité', href: '/privacy' },
    { name: 'CGU', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Mentions légales', href: '/legal' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Discord', href: 'https://discord.gg' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Produit
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Ressources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Légal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Social
            </h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                ResumeAI
              </span>
              <span className="text-gray-400">© 2024</span>
            </div>
            <p className="text-gray-400 mt-4 md:mt-0">
              Créez votre CV professionnel en quelques minutes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};