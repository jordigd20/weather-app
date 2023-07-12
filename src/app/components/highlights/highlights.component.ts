import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsCardComponent } from '../highlights-card/highlights-card.component';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, HighlightsCardComponent],
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent {
  weatherService = inject(WeatherService);
  forecastResponse = this.weatherService.forecast;


}
