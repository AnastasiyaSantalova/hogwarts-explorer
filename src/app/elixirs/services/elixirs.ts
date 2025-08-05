import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elixir } from '../types';

@Injectable({
  providedIn: 'root',
})
export class Elixirs {
  private apiUrl = 'https://wizard-world-api.herokuapp.com/Elixirs';

  constructor(private http: HttpClient) {}

  getElixirs(
    name: string = '',
    difficulty: string = '',
    ingredient: string = '',
    inventorFullName: string = '',
    manufacturer: string = ''
  ): Observable<Elixir[]> {
    const capitalize = (str: string) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

    const params = {
      ...(name && { Name: capitalize(name) }),
      ...(difficulty && { Difficulty: capitalize(difficulty) }),
      ...(ingredient && { Ingredient: capitalize(ingredient) }),
      ...(inventorFullName && {
        InventorFullName: capitalize(inventorFullName),
      }),
      ...(manufacturer && { Manufacturer: capitalize(manufacturer) }),
    };

    return this.http.get<Elixir[]>(this.apiUrl, { params });
  }

  getElixirById(id: string): Observable<Elixir> {
    return this.http.get<Elixir>(`${this.apiUrl}/${id}`);
  }
}
