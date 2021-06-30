import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchingService {

  public saveWoeid: number = 0;

  constructor( private http: HttpClient) { }

  searchWeather(woeid: number) {
    const api = `/api/location/${woeid}`;

    return this.http.get(`${environment.proxy}${environment.base_url}${api}`).pipe(
      map( (res: any) => {
        return [res.consolidated_weather, res.title];
      })
    );

  }

  searchLocation(location: string) {
    const api = `/api/location/search/?query=${location}`;

    return this.http.get(`${environment.proxy}${environment.base_url}${api}`).pipe(
      map( (res: any) => {
        const result = {
          woeid: res[0]?.woeid,
          title: res[0]?.title
        }

        return result;
      })
    );

  }

}
