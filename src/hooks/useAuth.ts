import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../services/api';
import { adminService } from '../services/admin.service';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        (async () => {
          setUser(session?.user ?? null);
        })();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { user: loggedInUser } = await adminService.login(email, password);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await adminService.logout();
    setUser(null);
  };

  return { user, isLoading, login, logout };
};
