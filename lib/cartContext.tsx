'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Size } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: Size, quantity?: number) => void;
  removeFromCart: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bahamut_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validCart = parsed.filter(
            item =>
              item &&
              item.product &&
              item.product.id &&
              typeof item.product.price === 'number' &&
              item.selectedSize
          );
          setCart(validCart);
        }
      } catch (e) {
        console.error('Failed to load cart', e);
        localStorage.removeItem('bahamut_cart');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bahamut_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, size: Size, quantity = 1) => {
    if (!product || !product.id) return;
    const safeSize: Size = size || (product.sizes?.[0] as Size) || 'M';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === safeSize
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty <= 0) {
          return prev.filter((_, i) => i !== existingIndex);
        }
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      }
      if (quantity <= 0) return prev;
      return [...prev, { product, selectedSize: safeSize, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: Size) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bahamut_cart');
    }
  };

  const totalAmount = cart.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        cartTotal: totalAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
