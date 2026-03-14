import { useState, useEffect } from 'react';
import { adminService } from '../services/admin.service';

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
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
