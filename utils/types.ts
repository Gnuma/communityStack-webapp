import MenuLayout from "../layouts/MenuLayout";

export interface Category {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  img?: string;
  category: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  contributions: number;
  last_contribution: string;
  is_verified: boolean;
  is_anonymous: boolean;
  created_at: string;
}

/*
  Aggiungere tutti i tipi di layout
*/

export type GeneralLayout = typeof MenuLayout;

export type GeneralData = User | Topic | Category;
