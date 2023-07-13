import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForecastResponse } from '../interfaces/forecast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, catchError, shareReplay, throwError, filter, tap } from 'rxjs';
import { LocationResponse } from '../interfaces/location';

type TemperatureUnit = 'C' | 'F';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = `https://api.weatherapi.com/v1`;
  private defaultLocation: LocationResponse = {
    id: 714482,
    name: 'Madrid',
    region: 'Madrid',
    country: 'Spain',
    lat: 40.4,
    lon: -3.68,
    url: 'madrid-madrid-spain'
  };

  http = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  forecastDays = 5;
  temperatureUnit = signal<TemperatureUnit>('C');
  currentLocation = signal<LocationResponse>(this.defaultLocation);
  forecast = signal<ForecastResponse | undefined>(undefined);
  locationsFound = signal<LocationResponse[]>([]);

  forecastEffect = effect(() => {
    return this.http
      .get<ForecastResponse>(`${this.baseUrl}/forecast.json`, {
        params: {
          key: environment.apiKey,
          q: `${this.currentLocation().lat},${this.currentLocation().lon}`,
          days: this.forecastDays.toString()
        }
      })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        takeUntilDestroyed(this.destroyRef),
        catchError(this.handleError)
      )
      .subscribe((forecast) => {
        console.log(forecast);
        this.forecast.set(forecast);
      });
  });

  searchLocation(location: string) {
    this.http
      .get<LocationResponse[]>(`${this.baseUrl}/search.json`, {
        params: {
          key: environment.apiKey,
          q: location
        }
      })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        takeUntilDestroyed(this.destroyRef),
        catchError(this.handleError)
      )
      .subscribe((res) => {
        console.log(res);
        this.locationsFound.set(res);
      });
  }

  setCurrentLocation(location: LocationResponse) {
    this.currentLocation.set(location);
    this.locationsFound.set([]);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
