/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AppTheme {
  CLASSIC = 'CLASSIC', // Foco em Tradição e Família (Amarelo, Vermelho, Off-White)
  URBAN = 'URBAN',     // Pegada Jovem e Noturna (Dark Mode, Laranja Neon, Grafite)
  PODRAO = 'PODRAO'    // Foco em Custo-Benefício e Volume (Verde Alface, Amarelo Quente, Cinza Claro)
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Para combos / descontos
  image: string;
  category: 'burgers' | 'dogs' | 'combos' | 'drinks' | 'sides';
  isBestSeller?: boolean;
  ingredients: string[];
  savings?: number; // Quanto economiza no combo
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface DeliveryArea {
  name: string;
  fee: number;
  timeEstimate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string; // ex: "Morador da Rua Bahia"
  text: string;
  stars: number;
}
