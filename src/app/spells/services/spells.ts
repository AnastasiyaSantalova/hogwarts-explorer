import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Spell } from '../types';

@Injectable({
  providedIn: 'root',
})
export class Spells {
  private apiUrl = 'https://wizard-world-api.herokuapp.com/Spells';
  private http = inject(HttpClient);

  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.apiUrl);
  }

  getSpellById(id: string): Observable<Spell> {
    return this.http.get<Spell>(`${this.apiUrl}/${id}`);
  }
}
