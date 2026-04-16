import { Category } from "./category";

export interface MenuResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}