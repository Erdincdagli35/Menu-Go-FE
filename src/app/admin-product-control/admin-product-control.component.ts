import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { MenuItem } from '../model/menu';
import { MenuResponse } from '../model/menu-response';
import { MenuService } from '../service/menu-service';
import { Category } from '../model/category';

@Component({
  selector: 'app-admin-product-control',
  templateUrl: './admin-product-control.component.html',
  styleUrls: ['./admin-product-control.component.css']
})
export class AdminProductControlComponent {
  isLoading: boolean = true;
  hasError: boolean = false;
  items: MenuResponse [] = [];
  currentLang: string = 'TR';
  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  // 🔽 API'den çekilecek
  loadItems(): void {
    this.isLoading = true;

    this.menuService.getMenuList(this.currentLang).subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
        this.hasError = false;
      },
      error: (err) => {
        console.error('Menü verisi çekilemedi', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
    
  }

  // ➕ CREATE
  addItem(): void {
    this.router.navigate(['menu/create']).then(() => {
        window.location.reload();
      });
  }

  goToMenu(): void {
    this.router.navigate(['menu/beach']).then(() => {
        window.location.reload();
      });
  }

  // ✏️ EDIT
  editItem(id: number) {
  console.log("go to update before : id : " + id);

  this.router.navigate(['menu/edit', id]);

  console.log("go to update after");
}

  // ❌ DELETE
  deleteItem(id: number): void {
  const confirmDelete = confirm('Silmek istediğine emin misin?');

  if (confirmDelete) {
    this.menuService.delete(id).subscribe({
      next: () => {
        // API başarılıysa UI'dan da sil
        this.items = this.items.filter(i => i.id !== id);
      },
      error: (err) => {
        console.error('Silme hatası:', err);
        alert('Silme işlemi başarısız!');
      }
    });
  }
  }
}