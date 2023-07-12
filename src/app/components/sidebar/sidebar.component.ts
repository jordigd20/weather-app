import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { WeatherService } from '../../services/weather.service';
import { conditionCodes } from '../../helpers/condition-codes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SearchbarComponent],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Output() isSearchbarVisible = new EventEmitter<boolean>();

  weatherService = inject(WeatherService);
  forecastResponse = this.weatherService.forecast;
  temperatureUnit = this.weatherService.temperatureUnit;
  currentLocation = this.weatherService.currentLocation;
  conditionCodes = conditionCodes;
  todayDate = new Date();

  displaySearchbar() {
    this.isSearchbarVisible.emit(true);
  }
}
