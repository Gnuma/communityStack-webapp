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
