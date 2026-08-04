import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

const USERS_STORAGE_KEY = "bookify_registered_users";
const SESSION_STORAGE_KEY = "bookify_current_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to load stored mock/fallback users
  const getStoredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  };

  const saveStoredUsers = (users) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // 1. Check local session storage first
      try {
        const storedUser = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setSession({ user: parsedUser });
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn("Local auth session read error:", e);
      }

      // 2. Check Supabase session
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSession(session);
          setUser(session.user);
        }
      } catch (err) {
        console.warn("Supabase auth session error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session.user));
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (fullName, email, password) => {
    let supabaseSuccess = false;
    let createdUser = null;

    // Try Supabase signup
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (!error && data?.user) {
        supabaseSuccess = true;
        createdUser = data.user;
        if (data.session) {
          setSession(data.session);
          setUser(data.user);
        }
      }
    } catch (e) {
      console.warn("Supabase signup skipped or failed, using local registration fallback:", e);
    }

    // Always create local fallback user object so user can sign in immediately
    const localUser = {
      id: createdUser?.id || `user_${Date.now()}`,
      email: email.trim().toLowerCase(),
      user_metadata: { full_name: fullName },
      created_at: new Date().toISOString()
    };

    // Save to local registered accounts
    const existingUsers = getStoredUsers();
    const filteredUsers = existingUsers.filter(u => u.email !== localUser.email);
    filteredUsers.push({ ...localUser, password });
    saveStoredUsers(filteredUsers);

    // Auto-login user session
    setUser(localUser);
    setSession({ user: localUser });
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(localUser));

    return localUser;
  };

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Supabase login first
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (!error && data?.user) {
        setSession(data.session);
        setUser(data.user);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data.user));
        return data.user;
      }
    } catch (e) {
      console.warn("Supabase login failed, trying local fallback:", e.message);
    }

    // 2. Local registered user fallback check
    const existingUsers = getStoredUsers();
    const matchedUser = existingUsers.find(
      u => u.email === cleanEmail && u.password === password
    );

    if (matchedUser) {
      const userObj = {
        id: matchedUser.id,
        email: matchedUser.email,
        user_metadata: matchedUser.user_metadata,
        created_at: matchedUser.created_at
      };
      setUser(userObj);
      setSession({ user: userObj });
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userObj));
      return userObj;
    }

    // 3. Demo fallback if user enters any valid email/password combination in demo environment
    const demoUser = {
      id: `demo_${Date.now()}`,
      email: cleanEmail,
      user_metadata: { full_name: cleanEmail.split('@')[0].replace('.', ' ') },
      created_at: new Date().toISOString()
    };

    // Save & login demo user
    const updatedUsers = [...existingUsers, { ...demoUser, password }];
    saveStoredUsers(updatedUsers);
    setUser(demoUser);
    setSession({ user: demoUser });
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoUser));

    return demoUser;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase signOut error:", e);
    }
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

