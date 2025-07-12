import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItem } from '../model/menu';
import { BeachMenu } from '../model/beach-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isLoading = false;
  hasError = false;

  //private baseURL = "http://localhost:8080/api/menu";
  private baseURL = 'https://menu-go-be-production.up.railway.app/api/menu';
  private baseBeachURL = 'https://menu-go-be-production.up.railway.app/api/menu/beach';

  constructor(private httpClient: HttpClient) { }

  getMenuList(lang: string): Observable<MenuItem[]> {
    const url = `${this.baseURL}?lang=${lang}`;
    return this.httpClient.get<MenuItem[]>(url);
  }

  getBeachMenuList(lang: string): Observable<BeachMenu[]> {
    const url = `${this.baseBeachURL}?lang=${lang}`;
    return this.httpClient.get<BeachMenu[]>(url);
  }
}