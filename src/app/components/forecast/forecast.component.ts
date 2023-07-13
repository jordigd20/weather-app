import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, ForecastCardComponent],
  templateUrl: './forecast.component.html'
})
export class ForecastComponent {
  weatherService = inject(WeatherService);
  forecastResponse = this.weatherService.forecast;
  temperatureUnit = this.weatherService.temperatureUnit;
  forecastDays = Array.from(Array(this.weatherService.forecastDays).keys());
}
