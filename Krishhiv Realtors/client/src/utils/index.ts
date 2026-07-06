import type { EMIResult } from '../types';

/** Format price to Indian currency notation */
export const formatPrice = (price: number): string => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString('en-IN')}`;
};

/** Format area */
export const formatArea = (area: number, unit = 'sqft'): string =>
  `${area.toLocaleString('en-IN')} ${unit}`;

/** Slugify string */
export const slugify = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Calculate EMI */
export const calculateEMI = (
  principal: number,
  annualRate: number,
  tenureYears: number
): EMIResult => {
  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalAmount = emi * months;
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalAmount - principal),
    principal,
  };
};

/** Truncate text */
export const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

/** Format date */
export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

/** Get read time */
export const getReadTime = (content: string): number =>
  Math.ceil(content.split(' ').length / 200);

/** Debounce */
export const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/** WhatsApp link */
export const getWhatsAppLink = (phone: string, message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

/** Share property */
export const shareProperty = async (title: string, url: string): Promise<void> => {
  if (navigator.share) {
    await navigator.share({ title, url });
  } else {
    await navigator.clipboard.writeText(url);
  }
};

/** Clamp number */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Get initials */
export const getInitials = (name: string): string =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

/** Storage helpers */
export const storage = {
  get: <T>(key: string): T | null => {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch { return null; }
  },
  set: (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => localStorage.removeItem(key),
};
