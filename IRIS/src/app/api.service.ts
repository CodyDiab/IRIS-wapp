import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  getWeather(location) {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?q="+ location + "&appid=858b3927a8044ecb64a2c351fd3d6fad&units=imperial"
    )
  }
}
