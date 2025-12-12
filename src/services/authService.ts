import { AuthUser } from '../types';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends SignInCredentials {
  displayName?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

type AuthStateListener = (state: AuthState) => void;

class AuthService {
  private useFirebase: boolean = false;
  private auth: any = null;
  private currentUser: AuthUser | null = null;
  private listeners: Set<AuthStateListener> = new Set();

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

      if (!apiKey) {
        console.info('Firebase Auth not configured, using demo mode');
        this.loadDemoUser();
        return;
      }

      const { initializeApp, getApps } = await import('firebase/app');
      const { getAuth, onAuthStateChanged } = await import('firebase/auth');

      if (getApps().length === 0) {
        const firebaseConfig = {
          apiKey,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
        };

        initializeApp(firebaseConfig);
      }

      this.auth = getAuth();
      this.useFirebase = true;

      onAuthStateChanged(this.auth, (firebaseUser) => {
        if (firebaseUser) {
          this.currentUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
          };
        } else {
          this.currentUser = null;
        }

        this.notifyListeners();
      });

      console.info('Firebase Auth initialized successfully');
    } catch (error) {
      console.warn('Firebase Auth initialization failed, using demo mode:', error);
      this.useFirebase = false;
      this.loadDemoUser();
    }
  }

  private loadDemoUser(): void {
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch (error) {
        console.error('Error loading demo user:', error);
      }
    }
    this.notifyListeners();
  }

  async signIn(credentials: SignInCredentials): Promise<AuthUser> {
    if (this.useFirebase && this.auth) {
      return this.signInWithFirebase(credentials);
    }
    return this.signInDemo(credentials);
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthUser> {
    if (this.useFirebase && this.auth) {
      return this.signUpWithFirebase(credentials);
    }
    return this.signUpDemo(credentials);
  }

  async signOut(): Promise<void> {
    if (this.useFirebase && this.auth) {
      const { signOut } = await import('firebase/auth');
      await signOut(this.auth);
    } else {
      this.currentUser = null;
      localStorage.removeItem('demo_user');
      this.notifyListeners();
    }
  }

  async resetPassword(email: string): Promise<void> {
    if (this.useFirebase && this.auth) {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(this.auth, email);
    } else {
      console.info('Password reset email would be sent to:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  async updateProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
    if (this.useFirebase && this.auth?.currentUser) {
      const { updateProfile } = await import('firebase/auth');
      await updateProfile(this.auth.currentUser, data);
      
      if (this.currentUser) {
        this.currentUser = {
          ...this.currentUser,
          ...data,
        };
        this.notifyListeners();
      }
    } else if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        ...data,
      };
      localStorage.setItem('demo_user', JSON.stringify(this.currentUser));
      this.notifyListeners();
    }
  }

  async verifyEmail(): Promise<void> {
    if (this.useFirebase && this.auth?.currentUser) {
      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(this.auth.currentUser);
    } else {
      console.info('Email verification would be sent');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  onAuthStateChanged(listener: AuthStateListener): () => void {
    this.listeners.add(listener);
    listener({
      user: this.currentUser,
      loading: false,
      error: null,
    });

    return () => {
      this.listeners.delete(listener);
    };
  }

  private async signInWithFirebase(credentials: SignInCredentials): Promise<AuthUser> {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      const user: AuthUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        emailVerified: userCredential.user.emailVerified,
      };

      this.currentUser = user;
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Sign in failed');
    }
  }

  private async signUpWithFirebase(credentials: SignUpCredentials): Promise<AuthUser> {
    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      if (credentials.displayName) {
        await updateProfile(userCredential.user, {
          displayName: credentials.displayName,
        });
      }

      const user: AuthUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: credentials.displayName || null,
        photoURL: null,
        emailVerified: false,
      };

      this.currentUser = user;
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed');
    }
  }

  private async signInDemo(credentials: SignInCredentials): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const demoUser: AuthUser = {
      uid: 'demo_' + Date.now(),
      email: credentials.email,
      displayName: 'Demo User',
      photoURL: null,
      emailVerified: true,
      isDemo: true,
    };

    this.currentUser = demoUser;
    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    this.notifyListeners();

    return demoUser;
  }

  private async signUpDemo(credentials: SignUpCredentials): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const demoUser: AuthUser = {
      uid: 'demo_' + Date.now(),
      email: credentials.email,
      displayName: credentials.displayName || 'Demo User',
      photoURL: null,
      emailVerified: false,
      isDemo: true,
    };

    this.currentUser = demoUser;
    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    this.notifyListeners();

    return demoUser;
  }

  private notifyListeners(): void {
    const state: AuthState = {
      user: this.currentUser,
      loading: false,
      error: null,
    };

    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }

  isUsingFirebase(): boolean {
    return this.useFirebase;
  }
}

export const authService = new AuthService();

export default authService;
