import { Component } from '@angular/core';

import { BeachCategory } from '../model/beach-category';
import { BeachMenu } from '../model/beach-menu';
import { MenuService } from '../service/menu-service';

@Component({
  selector: 'app-beach-menu',
  templateUrl: './beach-menu.component.html',
  styleUrls: ['./beach-menu.component.css']
})
export class BeachMenuComponent {
  menuItems: BeachMenu[] = [];
    isLoading: boolean = true;
    hasError: boolean = false;
    categories = Object.values(BeachCategory);
    selectedCategory: BeachCategory | null = null;
    currentLang: string = 'TR'; 
  
    constructor(private menuService: MenuService) {}
  
    ngOnInit(): void {
      this.fetchMenu();
    }
  
    fetchMenu(): void {
      this.isLoading = true;
      this.menuService.getBeachMenuList(this.currentLang).subscribe({
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
  
    getCategoryLabel(category: BeachCategory): string {
      if (this.currentLang === 'EN') {
        switch (category) {
          case BeachCategory.Burgers: return 'Burgers';
          case BeachCategory.ColdDrinks: return 'Cold Drinks';
          case BeachCategory.HotDrinks: return 'Hot Drinks';
          case BeachCategory.Sandawichs: return 'Sandawichs';
          case BeachCategory.Snacks: return 'Snacks';
          case BeachCategory.Beer: return 'Beer';
        }
      } else {
        switch (category) {
          case BeachCategory.Burgers: return 'Burgers';
          case BeachCategory.ColdDrinks: return 'Sıcak İçeçekler';
          case BeachCategory.HotDrinks: return 'Soğuk İçeçekler';
          case BeachCategory.Sandawichs: return 'Tostlar';
          case BeachCategory.Snacks: return 'Aparatifler';
          case BeachCategory.Beer: return 'Biralar';
        }
      }
      return category;
    }
  
    getItemsByCategory(category: BeachCategory): BeachMenu[] {
      return this.menuItems.filter(item => item.category === category);
    }
  
    selectCategory(category: BeachCategory) {
      this.selectedCategory = category;
    }
}
