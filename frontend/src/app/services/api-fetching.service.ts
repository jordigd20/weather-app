import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiFetchingService {

  private weeklyWeather: [] = [];
  private location: string = '';

  constructor( private http: HttpClient) { }

  searchWeather(woeid: number) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.metaweather.com';
    const api = `/api/location/${woeid}`;

    // const request =
    return this.http.get(`${proxy}${url}${api}`).pipe(
      map( (res: any) => {
        this.weeklyWeather = res.consolidated_weather;
        this.location = res.title;
        console.log('Paso por aqui');
        return [res.consolidated_weather, res.title];
      })
    );

  }


  get getWeeklyWeather(): [] {
    return this.weeklyWeather;
  }

  get getLocation(): string {
    return this.location;
  }

}
