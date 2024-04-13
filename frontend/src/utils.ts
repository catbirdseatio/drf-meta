export const validateEmail = (email: string) => {
  // Regular expression pattern for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isAuthenticated = (): boolean => localStorage.getItem("access") !== null;

export const logout = (): void => localStorage.clear();