import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

export const ProfilePhotoUpload = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [isHovered, setIsHovered] = useState(false);

  // Utiliser la photo Google par défaut si aucune photo de profil n'est définie
  const photoUrl = profile?.photo || user?.photoURL || '';

  useEffect(() => {
    // Si l'utilisateur n'a pas de photo de profil, utiliser celle de Google
    if (!profile?.photo && user?.photoURL) {
      updateProfile({ photo: user.photoURL });
    }
  }, [user?.photoURL, profile?.photo]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Ici, vous pouvez ajouter la logique pour uploader la photo
      // Par exemple, vers Firebase Storage
      const photoUrl = await uploadPhoto(file);
      await updateProfile({ photo: photoUrl });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-2xl text-gray-400">
              {profile?.firstName?.[0] || user?.displayName?.[0] || '?'}
            </span>
          </div>
        )}
      </div>

      <motion.label
        htmlFor="photo-upload"
        className="absolute inset-0 flex items-center justify-center rounded-full 
          bg-black/50 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Camera className="w-6 h-6 text-white" />
      </motion.label>

      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />
    </div>
  );
};

// Fonction d'aide pour uploader la photo (à implémenter selon votre backend)
const uploadPhoto = async (file: File): Promise<string> => {
  // Implémentez votre logique d'upload ici
  // Retournez l'URL de la photo uploadée
  return '';
}; 