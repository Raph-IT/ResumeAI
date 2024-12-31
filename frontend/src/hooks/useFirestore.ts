import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  DocumentData,
  Query
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../stores/authStore';

interface UseFirestoreOptions {
  collection: string;
  where?: [string, "==" | "!=" | ">" | ">=" | "<" | "<=", any][];
}

export const useFirestore = <T extends DocumentData>({ 
  collection: collectionName,
  where: whereConditions = []
}: UseFirestoreOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      let q: Query = collection(db, collectionName);

      // Ajouter automatiquement le filtre userId
      q = query(q, where('userId', '==', user.uid));

      // Ajouter d'autres conditions where si spécifiées
      whereConditions.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator, value));
      });

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setData(documents);
        setLoading(false);
      }, (err) => {
        console.error('Firestore error:', err);
        setError(err);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Firestore setup error:', err);
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionName, user, JSON.stringify(whereConditions)]);

  return { data, loading, error };
}; 