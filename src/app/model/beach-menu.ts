import { BeachCategory } from "./beach-category";

export interface BeachMenu {
    name: string;
    description: string;
    price: number;
    category: BeachCategory;
}
