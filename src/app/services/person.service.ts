import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.models';

const URL_BASE = 'http://localhost:8080/CRUPRepo';
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http:HttpClient) { }
  all():Observable<Person[]>{
    return this._http.get<Person[]>(`${URL_BASE}/ConsultarPersonas`);
  }

  get(id: number):Observable<Person>{
    return this._http.get<Person>(`${URL_BASE}/BuscarPersona/${id}`);
  }


  add(person:Person):Observable<Person>{
    return this._http.post<Person>(`${URL_BASE}/CrearPersona`,person);
  }

  update(person:Person):Observable<Person>{
    return this._http.put<Person>(`${URL_BASE}/ModificarPersona`,person);
  }

  delete(person:Person){
    return this._http.delete(`${URL_BASE}/EliminarPersona/${person.id}`);
  }

}
