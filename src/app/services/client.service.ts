import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/client.models';
import { Observable } from 'rxjs';

const URL_BASE = 'https://localhost:44337/api';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private _http:HttpClient) { }

  all():Observable<Cliente[]>{
    return this._http.get<Cliente[]>(`${URL_BASE}/Cliente/`);
  }

  get(id: number):Observable<Cliente>{
    return this._http.get<Cliente>(`${URL_BASE}/Cliente/${id}`);
  }

  add(cliente: Cliente){
    return this._http.post<HttpResponse<any>>(`${URL_BASE}/Cliente`, cliente);
  }

  update(cliente: Cliente){
    return this._http.put<HttpResponse<any>>(`${URL_BASE}/Cliente/${cliente.id}`, cliente);
  }

  delete(id:number){
    return this._http.delete(`${URL_BASE}/cliente/${id}`);
  }

}
