import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../service/menu-service';
import { Category } from '../model/category';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {

  form: FormGroup;
  id!: number;
  submitting = false;
  
  category: string[] = [];
  filteredCategories: string[] = [];
  dropdownOpen = false;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router) 
    {
    this.form = this.fb.group({
      price: [0],
      category: [''],
      translations: this.fb.array([])   // 🔥 boş ama TANIMLI olmalı
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.id) {
      alert('Geçersiz ürün id');
      this.router.navigate(['admin/product-control']);
      return;
    }

    this.loadCategoriesFromEnum();
    this.getItem(); // 🔥 TEK ÇAĞRI
 }

  private loadCategoriesFromEnum(): void {
    const vals = Object.values(Category).filter(v => typeof v === 'string') as string[];
    this.category = vals;
    this.filteredCategories = [...this.category];
  }

  get translations(): FormArray {
    return this.form.get('translations') as FormArray;
  }

  get price() {
    return this.form.get('price') ;
  }
  
  createTranslation(t: any): FormGroup {
    return this.fb.group({
      id: [t.id],
      lang: [t.lang],
      name: [t.name, Validators.required],
      description: [t.description]
    });
  }

  getItem(): void {
    this.menuService.getById(this.id).subscribe({
      next: (res) => {
        this.form.patchValue({
          price: res.price,
          category: res.category
        });

        const formArray = this.translations;
        formArray.clear();

        if (res.translations && res.translations.length > 0) {
          res.translations.forEach(t => {
            formArray.push(this.createTranslation(t));
          });
        } else {
          formArray.push(this.createTranslation({ lang: 'TR', name: '', description: '' }));
          formArray.push(this.createTranslation({ lang: 'EN', name: '', description: '' }));
        }
      },
      error: () => {
        alert('Ürün bulunamadı');
        this.router.navigate(['admin/product-control']);
      }
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: string): void {
    this.form.get('category')?.setValue(category);
    this.dropdownOpen = false;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const payload = {
      price: this.form.value.price,
      category: this.form.value.category,
      translations: this.form.value.translations
    };

    this.menuService.edit(this.id, payload).subscribe({
      next: () => {
        this.router.navigate(['admin/product-control']);
      },
      error: err => {
        this.submitting = false;
        alert('Güncelleme hatası: ' + (err.message || err));
      }
    });
  }

  cancel(): void {
    this.router.navigate(['admin/product-control']);
  }
}