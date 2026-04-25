import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItem } from '../model/menu';
import { MenuResponse } from '../model/menu-response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isLoading = false;
  hasError = false;

  //private baseURL = "http://localhost:8080/api/menu";
  private baseURL = 'https://menu-go-be-test.up.railway.app/api/menu';

  constructor(private httpClient: HttpClient) { }

  getMenuList(lang: string): Observable<MenuResponse[]> {
    const url = `${this.baseURL}/restaurant?lang=${lang}`;
    return this.httpClient.get<MenuResponse[]>(url);
  }

  create(menu: Partial<MenuItem>) {
    return this.httpClient.post<MenuItem>(`${this.baseURL}/create`, menu);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  getById(id: number) {
  return this.httpClient.get<MenuItem>(`${this.baseURL}/${id}`);
 }

  edit(id: number, menu: Partial<MenuItem>) {
    return this.httpClient.put<Observable<MenuItem>>(`${this.baseURL}/${id}`,menu);
  }
}
