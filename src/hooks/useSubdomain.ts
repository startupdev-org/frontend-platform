import { useState, useEffect } from 'react';
import { extractSubdomain } from '../utils/extractSubdomain';
import { businessService } from '../services/business.service';
import { Business } from '../types/business';

export const useSubdomain = () => {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessBySubdomain = async () => {
      const sub = extractSubdomain();
      setSubdomain(sub);

      if (sub) {
        try {
          const businessData = await businessService.getBySubdomain(sub);
          setBusiness(businessData);
        } catch (err) {
          setError('Business not found');
        }
      }

      setIsLoading(false);
    };

    fetchBusinessBySubdomain();
  }, []);

  return { subdomain, business, isLoading, error };
};
