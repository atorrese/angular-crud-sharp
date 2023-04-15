import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Producto } from '../models/product.models';


const URL_BASE = 'https://localhost:44337/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  all(): Observable<Producto[]>{
    return this._http.get<any[]>(`${URL_BASE}/Producto/`);
  }

  get(codigo: string):Observable<Producto>{
    return this._http.get<Producto>(`${URL_BASE}/Producto/${codigo}`);
  }

  add(producto: Producto){
    return this._http.post<HttpResponse<any>>(`${URL_BASE}/Producto`, producto);
  }

  update(producto: Producto){
    return this._http.put(`${URL_BASE}/Producto/${producto.pro_codigo}`, producto);
  }

  delete(codigo: string){
    return this._http.delete(`${URL_BASE}/producto/${codigo}`);
  }

}
