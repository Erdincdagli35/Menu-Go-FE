import { Component } from '@angular/core';

import { MenuItem } from '../model/menu';
import { MenuService } from '../service/menu-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems: MenuItem[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuList().subscribe({
      next: (data) => {
        this.menuItems = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Menü verisi çekilemedi', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
