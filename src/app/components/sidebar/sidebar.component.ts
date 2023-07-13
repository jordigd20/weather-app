import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { WeatherService } from '../../services/weather.service';
import { conditionCodes } from '../../helpers/condition-codes';
import { SearchbarService } from '../../services/searchbar.service';
import { RoundPipe } from 'src/app/pipes/round.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, RoundPipe],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  weatherService = inject(WeatherService);
  searchbarService = inject(SearchbarService);

  forecastResponse = this.weatherService.forecast;
  temperatureUnit = this.weatherService.temperatureUnit;
  currentLocation = this.weatherService.currentLocation;
  conditionCodes = conditionCodes;
  todayDate = new Date();
}
