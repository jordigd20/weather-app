import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForecastResponse } from '../interfaces/forecast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';

type TemperatureUnit = 'C' | 'F';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = `https://api.weatherapi.com/v1`;
  private defaultLocation = 'Madrid';

  http = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  forecastDays = 5;
  temperatureUnit = signal<TemperatureUnit>('C');
  forecast = signal<ForecastResponse | undefined>(undefined);
  currentLocation = signal<string>(this.defaultLocation);
  forecastEffect = effect(() => {
    return this.http
      .get<ForecastResponse>(`${this.baseUrl}/forecast.json`, {
        params: {
          key: environment.apiKey,
          q: this.currentLocation(),
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
