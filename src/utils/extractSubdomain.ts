export const extractSubdomain = (): string | null => {
  const hostname = window.location.hostname;

  const parts = hostname.split('.');

  if (parts.length >= 3) {
    const subdomain = parts[0];
    if (subdomain !== 'www') {
      return subdomain;
    }
  }

  return null;
};

export const isSubdomainMode = (): boolean => {
  return extractSubdomain() !== null;
};
