import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from '../forecast/forecast.component';
import { HighlightsComponent } from '../highlights/highlights.component';
import { FooterComponent } from '../footer/footer.component';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ForecastComponent, HighlightsComponent, FooterComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  weatherService = inject(WeatherService);
}
