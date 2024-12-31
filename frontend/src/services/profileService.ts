import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export const uploadProfilePhoto = async (file: File): Promise<string> => {
  const storage = getStorage();
  const { user } = useAuth();

  if (!user) throw new Error('User not authenticated');

  // Créer une référence unique pour l'image
  const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}-${file.name}`);
  
  // Upload du fichier
  await uploadBytes(storageRef, file);
  
  // Retourner l'URL de l'image
  return await getDownloadURL(storageRef);
};

export const updateProfileData = async (userId: string, data: Partial<Profile>) => {
  try {
    console.log('Updating profile in Firestore:', { userId, data }); // Debug
    
    const profileRef = doc(db, 'profiles', userId);
    const profileDoc = await getDoc(profileRef);

    if (profileDoc.exists()) {
      // Mise à jour du document existant
      await updateDoc(profileRef, {
        ...data,
        updatedAt: new Date()
      });
    } else {
      // Création d'un nouveau document
      await setDoc(profileRef, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  } catch (error) {
    console.error('Error in updateProfileData:', error);
    throw error;
  }
};

export const getProfileData = async (userId: string): Promise<Profile | null> => {
  try {
    const docRef = doc(db, 'profiles', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Types
export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  birthDate?: string;
  bio: string;
  photo?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  skills?: string[];
  languages?: {
    name: string;
    level: string;
  }[];
  updatedAt: Date;
} 