import clsx, { type ClassValue } from 'clsx'; // Import types if using TypeScript
import { twMerge } from 'tailwind-merge'; // Optional but recommended for Tailwind

/**
 * Conditionally joins class names together and merges Tailwind classes.
 * Use `twMerge` to resolve potential conflicts when combining classes (e.g., different text sizes).
 * @param inputs Class values to join.
 * @returns A single string of combined and potentially merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}