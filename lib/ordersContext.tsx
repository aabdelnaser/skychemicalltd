'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem, ShippingAddress } from './types';

interface OrdersContextType {
  orders: Order[];
  placeOrder: (
    userId: string,
    items: CartItem[],
    shipping: ShippingAddress,
    shippingCost: number
  ) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Seed some demo orders for the admin view
const SEED_ORDERS: Order[] = [
  {
    id: 'ORD-0001',
    userId: 'user-demo',
    items: [
      {
        product: {
          id: 'chloricide-5l', name: 'Chloricide', description: '', longDescription: '',
          price: 12.75, size: '5L', category: 'Infection Control', categorySlug: 'infection-control',
          sku: 'SKY-IC-001', inStock: true, stockCount: 120, rating: 4.8, reviewCount: 234,
          tags: [], featured: true, image: '🧪',
        },
        quantity: 2, price: 12.75,
      },
    ],
    subtotal: 25.5,
    shipping: 5.99,
    total: 31.49,
    status: 'delivered',
    shippingAddress: {
      fullName: 'Demo Customer', address1: '10 Example Street', city: 'Sheffield',
      county: 'South Yorkshire', postcode: 'S1 1AA', phone: '07700900000',
    },
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-03-18T14:00:00Z',
  },
  {
    id: 'ORD-0002',
    userId: 'user-demo',
    items: [
      {
        product: {
          id: 'viraguard-5l', name: 'Viraguard', description: '', longDescription: '',
          price: 18.5, size: '5L', category: 'Infection Control', categorySlug: 'infection-control',
          sku: 'SKY-IC-003', inStock: true, stockCount: 67, rating: 4.9, reviewCount: 312,
          tags: [], featured: true, image: '🛡️',
        },
        quantity: 3, price: 18.5,
      },
    ],
    subtotal: 55.5,
    shipping: 0,
    total: 55.5,
    status: 'shipped',
    shippingAddress: {
      fullName: 'Demo Customer', address1: '10 Example Street', city: 'Sheffield',
      county: 'South Yorkshire', postcode: 'S1 1AA', phone: '07700900000',
    },
    createdAt: '2025-04-02T09:00:00Z',
    updatedAt: '2025-04-04T11:00:00Z',
  },
];

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('sky_orders');
    if (stored) {
      try { setOrders([...SEED_ORDERS, ...JSON.parse(stored)]); } catch { setOrders(SEED_ORDERS); }
    } else {
      setOrders(SEED_ORDERS);
    }
  }, []);

  const saveToStorage = (newOrders: Order[]) => {
    const nonSeed = newOrders.filter((o) => !SEED_ORDERS.find((s) => s.id === o.id));
    localStorage.setItem('sky_orders', JSON.stringify(nonSeed));
  };

  const placeOrder = (
    userId: string,
    items: CartItem[],
    shipping: ShippingAddress,
    shippingCost: number
  ): Order => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const order: Order = {
      id: `ORD-${String(Date.now()).slice(-6)}`,
      userId,
      items: items.map((i) => ({ product: i.product, quantity: i.quantity, price: i.product.price })),
      subtotal,
      shipping: shippingCost,
      total: subtotal + shippingCost,
      status: 'pending',
      shippingAddress: shipping,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders((prev) => {
      const updated = [order, ...prev];
      saveToStorage(updated);
      return updated;
    });
    return order;
  };

  const getOrdersByUser = (userId: string) =>
    orders.filter((o) => o.userId === userId);

  const getAllOrders = () => orders;

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      );
      saveToStorage(updated);
      return updated;
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider');
  return ctx;
}
