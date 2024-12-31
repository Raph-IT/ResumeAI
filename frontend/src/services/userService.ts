import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types';

export const userService = {
  async createUserProfile(user: User): Promise<void> {
    const userRef = doc(db, 'users', user.id);
    await setDoc(userRef, {
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      preferredLanguage: user.preferredLanguage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },

  async getUserProfile(userId: string): Promise<User | null> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userId, ...userSnap.data() } as User;
    }
    
    return null;
  },

  async updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  }
};