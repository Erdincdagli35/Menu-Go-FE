import { Category } from "./category";

export interface MenuItem {
    name: string;
    description: string;
    price: number;
    category: Category;
  }