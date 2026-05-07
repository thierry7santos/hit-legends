import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../config/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogin(email, password) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;

    setUser(data.user);
  }

  async function handleRegister(
    email,
    password,
    phone_number,
    nickname
  ) {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) throw error;

    if (data.user) {
      await supabase.from("players").insert({
        id: data.user.id,
        email,
        nickname,
        phone_number,
      });
    }

    return data;
  }

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        handleLogin,
        handleRegister,
        logout,
      }}
    >
      {loading ? (
        <p>Carregando sessão...</p>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}