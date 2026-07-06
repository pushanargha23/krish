import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks';

interface WishlistContextType {
  wishlist: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);

  const toggle = useCallback((id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, [setWishlist]);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
