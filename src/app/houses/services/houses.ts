import { Injectable } from '@angular/core';
import { House } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Houses {
  private apiUrl = 'https://wizard-world-api.herokuapp.com/Houses';

  constructor(private http: HttpClient) {}

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl);
  }

  getHouseById(id: string): Observable<House> {
    return this.http.get<House>(`${this.apiUrl}/${id}`);
  }
}
