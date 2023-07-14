import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForecastResponse } from '../interfaces/forecast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { LocationResponse } from '../interfaces/location';

type TemperatureUnit = 'C' | 'F';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

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
  gpsLocation = localStorage.getItem('location');
  temperatureUnitStored = localStorage.getItem('temperatureUnit') as TemperatureUnit | null;
  forecastDays = 5;
  temperatureUnit = signal<TemperatureUnit>(this.temperatureUnitStored ?? 'C');
  currentLocation = signal<LocationResponse>(
    JSON.parse(this.gpsLocation ?? JSON.stringify(this.defaultLocation))
  );
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
        this.forecast.set(forecast);
      });
  });

  constructor() {
    if (this.gpsLocation == null) {
      this.useNavigatorGeolocation();
    }
  }

  getLocation$(location: string): Observable<LocationResponse[]> {
    return this.http
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
      );
  }

  searchLocation(location: string) {
    this.getLocation$(location).subscribe((res) => {
      this.locationsFound.set(res);
    });
  }

  useNavigatorGeolocation() {
    if (this.gpsLocation == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.getLocation$(`${position.coords.latitude},${position.coords.longitude}`).subscribe(
            (res) => {
              this.currentLocation.set(res[0]);
              localStorage.setItem('location', JSON.stringify(res[0]));
            }
          );
        });
      }
    } else {
      this.currentLocation.set(JSON.parse(this.gpsLocation));
    }
  }

  setCurrentLocation(location: LocationResponse) {
    this.currentLocation.set(location);
    this.locationsFound.set([]);
  }

  setTemperatureUnit(unit: TemperatureUnit) {
    this.temperatureUnit.set(unit);
    localStorage.setItem('temperatureUnit', unit);
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
