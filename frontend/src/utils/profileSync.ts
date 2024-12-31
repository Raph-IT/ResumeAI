import { User } from 'firebase/auth';
import { Profile } from '../types/profile';

export const syncGoogleData = (user: User, profile: Profile | null): Partial<Profile> => {
  const updates: Partial<Profile> = {};

  if (!profile?.firstName && user.displayName) {
    const [firstName, ...lastNames] = user.displayName.split(' ');
    updates.firstName = firstName;
    updates.lastName = lastNames.join(' ');
  }

  if (!profile?.email && user.email) {
    updates.email = user.email;
  }

  if (!profile?.photo && user.photoURL) {
    updates.photo = user.photoURL;
  }

  return updates;
}; 