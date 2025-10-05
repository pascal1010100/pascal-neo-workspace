import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para formatear fechas
export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// Función para capitalizar texto
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función para generar un ID único
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
