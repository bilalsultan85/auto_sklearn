import {
  ServiceConfig,
  Review,
  PaymentRecord,
  Job,
  HistoryEntry,
  VisitorLog,
  Notification,
} from '../types';

type CollectionName = 'services' | 'reviews' | 'payments' | 'jobs' | 'history' | 'visitors' | 'notifications';

type CollectionData = {
  services: ServiceConfig;
  reviews: Review;
  payments: PaymentRecord;
  jobs: Job;
  history: HistoryEntry;
  visitors: VisitorLog;
  notifications: Notification;
};

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

class StorageService {
  private useFirebase: boolean = false;
  private firebaseApp: any = null;
  private db: any = null;

  constructor() {
    this.initializeFirebase();
  }

  private async initializeFirebase(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const config = this.getFirebaseConfig();
      
      if (!config || !config.apiKey) {
        console.info('Firebase not configured, using localStorage fallback');
        return;
      }

      const { initializeApp } = await import('firebase/app');
      const { getFirestore } = await import('firebase/firestore');

      this.firebaseApp = initializeApp(config);
      this.db = getFirestore(this.firebaseApp);
      this.useFirebase = true;

      console.info('Firebase initialized successfully');
    } catch (error) {
      console.warn('Firebase initialization failed, using localStorage:', error);
      this.useFirebase = false;
    }
  }

  private getFirebaseConfig(): FirebaseConfig | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    };
  }

  async getAll<T extends CollectionName>(
    collection: T
  ): Promise<CollectionData[T][]> {
    if (this.useFirebase && this.db) {
      return this.getFromFirebase(collection);
    }
    return this.getFromLocalStorage(collection);
  }

  async getById<T extends CollectionName>(
    collection: T,
    id: string
  ): Promise<CollectionData[T] | null> {
    if (this.useFirebase && this.db) {
      return this.getByIdFromFirebase(collection, id);
    }
    return this.getByIdFromLocalStorage(collection, id);
  }

  async create<T extends CollectionName>(
    collection: T,
    data: Omit<CollectionData[T], 'id'>
  ): Promise<CollectionData[T]> {
    const id = this.generateId();
    const item = { ...data, id } as CollectionData[T];

    if (this.useFirebase && this.db) {
      return this.createInFirebase(collection, item);
    }
    return this.createInLocalStorage(collection, item);
  }

  async update<T extends CollectionName>(
    collection: T,
    id: string,
    data: Partial<CollectionData[T]>
  ): Promise<CollectionData[T] | null> {
    if (this.useFirebase && this.db) {
      return this.updateInFirebase(collection, id, data);
    }
    return this.updateInLocalStorage(collection, id, data);
  }

  async delete<T extends CollectionName>(
    collection: T,
    id: string
  ): Promise<boolean> {
    if (this.useFirebase && this.db) {
      return this.deleteFromFirebase(collection, id);
    }
    return this.deleteFromLocalStorage(collection, id);
  }

  async query<T extends CollectionName>(
    collection: T,
    filter: (item: CollectionData[T]) => boolean
  ): Promise<CollectionData[T][]> {
    const items = await this.getAll(collection);
    return items.filter(filter);
  }

  private async getFromFirebase<T extends CollectionName>(
    collection: T
  ): Promise<CollectionData[T][]> {
    try {
      const { collection: firestoreCollection, getDocs } = await import('firebase/firestore');
      const querySnapshot = await getDocs(firestoreCollection(this.db, collection));
      
      const items: CollectionData[T][] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as CollectionData[T]);
      });
      
      return items;
    } catch (error) {
      console.error(`Error fetching from Firebase (${collection}):`, error);
      return this.getFromLocalStorage(collection);
    }
  }

  private async getByIdFromFirebase<T extends CollectionName>(
    collection: T,
    id: string
  ): Promise<CollectionData[T] | null> {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const docRef = doc(this.db, collection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as CollectionData[T];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching by ID from Firebase (${collection}):`, error);
      return this.getByIdFromLocalStorage(collection, id);
    }
  }

  private async createInFirebase<T extends CollectionName>(
    collection: T,
    item: CollectionData[T]
  ): Promise<CollectionData[T]> {
    try {
      const { collection: firestoreCollection, doc, setDoc } = await import('firebase/firestore');
      const docRef = doc(firestoreCollection(this.db, collection), (item as any).id);
      await setDoc(docRef, item);
      return item;
    } catch (error) {
      console.error(`Error creating in Firebase (${collection}):`, error);
      return this.createInLocalStorage(collection, item);
    }
  }

  private async updateInFirebase<T extends CollectionName>(
    collection: T,
    id: string,
    data: Partial<CollectionData[T]>
  ): Promise<CollectionData[T] | null> {
    try {
      const { doc, updateDoc, getDoc } = await import('firebase/firestore');
      const docRef = doc(this.db, collection, id);
      await updateDoc(docRef, data as any);
      
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as CollectionData[T];
      }
      return null;
    } catch (error) {
      console.error(`Error updating in Firebase (${collection}):`, error);
      return this.updateInLocalStorage(collection, id, data);
    }
  }

  private async deleteFromFirebase<T extends CollectionName>(
    collection: T,
    id: string
  ): Promise<boolean> {
    try {
      const { doc, deleteDoc } = await import('firebase/firestore');
      const docRef = doc(this.db, collection, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting from Firebase (${collection}):`, error);
      return this.deleteFromLocalStorage(collection, id);
    }
  }

  private getFromLocalStorage<T extends CollectionName>(
    collection: T
  ): CollectionData[T][] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const data = localStorage.getItem(`collection_${collection}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from localStorage (${collection}):`, error);
      return [];
    }
  }

  private getByIdFromLocalStorage<T extends CollectionName>(
    collection: T,
    id: string
  ): CollectionData[T] | null {
    const items = this.getFromLocalStorage(collection);
    return items.find((item: any) => item.id === id) || null;
  }

  private createInLocalStorage<T extends CollectionName>(
    collection: T,
    item: CollectionData[T]
  ): CollectionData[T] {
    const items = this.getFromLocalStorage(collection);
    items.push(item);
    this.saveToLocalStorage(collection, items);
    return item;
  }

  private updateInLocalStorage<T extends CollectionName>(
    collection: T,
    id: string,
    data: Partial<CollectionData[T]>
  ): CollectionData[T] | null {
    const items = this.getFromLocalStorage(collection);
    const index = items.findIndex((item: any) => item.id === id);
    
    if (index === -1) {
      return null;
    }

    items[index] = { ...items[index], ...data };
    this.saveToLocalStorage(collection, items);
    return items[index];
  }

  private deleteFromLocalStorage<T extends CollectionName>(
    collection: T,
    id: string
  ): boolean {
    const items = this.getFromLocalStorage(collection);
    const filtered = items.filter((item: any) => item.id !== id);
    
    if (filtered.length === items.length) {
      return false;
    }

    this.saveToLocalStorage(collection, filtered);
    return true;
  }

  private saveToLocalStorage<T extends CollectionName>(
    collection: T,
    items: CollectionData[T][]
  ): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(`collection_${collection}`, JSON.stringify(items));
    } catch (error) {
      console.error(`Error saving to localStorage (${collection}):`, error);
    }
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  clearLocalStorage(collection?: CollectionName): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (collection) {
      localStorage.removeItem(`collection_${collection}`);
    } else {
      const collections: CollectionName[] = [
        'services',
        'reviews',
        'payments',
        'jobs',
        'history',
        'visitors',
        'notifications',
      ];
      collections.forEach((coll) => {
        localStorage.removeItem(`collection_${coll}`);
      });
    }
  }

  isUsingFirebase(): boolean {
    return this.useFirebase;
  }
}

export const storageService = new StorageService();

export default storageService;
