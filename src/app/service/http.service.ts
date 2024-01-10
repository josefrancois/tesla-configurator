import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car-model';
import { CarOption} from '../models/car-option';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(private http: HttpClient) { }

  getCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('/models');
  }

  getCarOptions(carModelCode: string): Observable<CarOption> {
    return this.http.get<CarOption>(`/options/${carModelCode}`);
  }
}
