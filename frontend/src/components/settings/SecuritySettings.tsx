import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Lock, Mail, KeyRound, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../lib/firebase';
import { sendPasswordResetEmail, updateEmail } from 'firebase/auth';

export const SecuritySettings = () => {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isEmailChangePending, setIsEmailChangePending] = useState(false);
  const [isResetPending, setIsResetPending] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailChangePending(true);
    setMessage({ type: '', content: '' });

    try {
      if (user) {
        await updateEmail(user, newEmail);
        setMessage({
          type: 'success',
          content: 'Votre adresse email a été mise à jour avec succès.'
        });
        setNewEmail('');
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        content: 'Erreur lors du changement d\'email. Veuillez vous reconnecter et réessayer.'
      });
    } finally {
      setIsEmailChangePending(false);
    }
  };

  const handlePasswordReset = async () => {
    setIsResetPending(true);
    setMessage({ type: '', content: '' });

    try {
      if (user?.email) {
        await sendPasswordResetEmail(auth, user.email);
        setMessage({
          type: 'success',
          content: 'Un email de réinitialisation du mot de passe vous a été envoyé.'
        });
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        content: 'Erreur lors de l\'envoi de l\'email de réinitialisation.'
      });
    } finally {
      setIsResetPending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Message de statut */}
      {message.content && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}
        >
          {message.content}
        </motion.div>
      )}

      {/* Changement d'email */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Changer d'adresse email</h3>
          </div>
          
          <form onSubmit={handleEmailChange} className="space-y-4">
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Nouvelle adresse email"
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <motion.button
              type="submit"
              disabled={isEmailChangePending || !newEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 
                       transition-colors duration-200"
            >
              {isEmailChangePending ? 'Modification...' : 'Modifier l\'email'}
            </motion.button>
          </form>
        </div>
      </Card>

      {/* Réinitialisation du mot de passe */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Mot de passe</h3>
          </div>
          
          <p className="text-gray-400">
            Vous recevrez un email contenant les instructions pour réinitialiser votre mot de passe.
          </p>

          <motion.button
            onClick={handlePasswordReset}
            disabled={isResetPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 
                     transition-colors duration-200"
          >
            {isResetPending ? 'Envoi...' : 'Réinitialiser le mot de passe'}
          </motion.button>
        </div>
      </Card>

      {/* Sécurité du compte */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Sécurité du compte</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-3">
                <KeyRound className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Authentification à deux facteurs</span>
              </div>
              <button className="text-blue-400 hover:text-blue-300">
                Configurer
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecuritySettings; 