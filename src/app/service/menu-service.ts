import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItem } from '../model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  //private baseURL = "http://localhost:8080/api/menu";
  private baseURL = 'https://menu-go-be.up.railway.app/api/menu';

  constructor(private httpClient: HttpClient) { }


  getMenuList(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(this.baseURL);
  }

}