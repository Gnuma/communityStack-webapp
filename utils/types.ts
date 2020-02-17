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
  email: string;
  username: string;
  is_verified: boolean;
  is_anonymous: boolean;
  created_at: string;
}

export interface Tutorial {
  id: number;
  title: string;
  abstract: string;
  time_reading: number;
  link: string;
  author_name: string;
  author_img: string;
  last_updated: string;
  created_at: string;
  user: User;
  topic: Topic;
}
