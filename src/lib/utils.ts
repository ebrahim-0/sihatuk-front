import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkClass(condition: boolean, classNames: string[]): string {
  return classNames?.[condition ? 0 : 1] || "";
}
