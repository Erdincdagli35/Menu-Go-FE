import { Category } from "./category";
import { MenuItemTranslation } from "../model/menu-item-translation.model";

export interface MenuItem {
    name: string;
    description: string;
    price: number;
    category: Category;
    translations: MenuItemTranslation[];
  }