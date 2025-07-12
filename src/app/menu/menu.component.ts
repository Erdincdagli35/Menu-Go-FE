import { Component } from '@angular/core';

import { MenuItem } from '../model/menu';
import { MenuService } from '../service/menu-service';
import { Category } from '../model/category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems: MenuItem[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  categories = Object.values(Category);
  selectedCategory: Category | null = null;
  currentLang: string = 'TR'; // ✅ Varsayılan dil

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.fetchMenu();
  }

  fetchMenu(): void {
    this.isLoading = true;
    this.menuService.getMenuList(this.currentLang).subscribe({
      next: (data) => {
        this.menuItems = data;
        this.isLoading = false;
        this.hasError = false;
        this.selectedCategory = this.categories[0];
      },
      error: (err) => {
        console.error('Menü verisi çekilemedi', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  changeLanguage(lang: string): void {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      this.fetchMenu(); // ✅ API tekrar çağırılır
    }
  }

  getCategoryLabel(category: Category): string {
    if (this.currentLang === 'EN') {
      switch (category) {
        case Category.Appetizers: return 'Appetizers';
        case Category.HotStarters: return 'Hot Starters';
        case Category.Salads: return 'Salads';
        case Category.MainCourses: return 'Main Courses';
        case Category.SoftDrinks: return 'Soft Drinks';
        case Category.Beer: return 'Beer';
        case Category.Raki: return 'Rakı';
        case Category.Wine: return 'Wine';
      }
    } else {
      switch (category) {
        case Category.Appetizers: return 'Mezeler';
        case Category.HotStarters: return 'Ara Sıcaklar';
        case Category.Salads: return 'Salatalar';
        case Category.MainCourses: return 'Ana Yemekler';
        case Category.SoftDrinks: return 'İçecekler';
        case Category.Beer: return 'Bira';
        case Category.Raki: return 'Rakı';
        case Category.Wine: return 'Şarap';
      }
    }
    return category;
  }

  getItemsByCategory(category: Category): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }
}