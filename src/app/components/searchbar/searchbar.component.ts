import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { SearchbarFormComponent } from '../searchbar-form/searchbar-form.component';
import { SearchbarListComponent } from '../searchbar-list/searchbar-list.component';
import { SearchbarService } from 'src/app/services/searchbar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { LocationResponse } from 'src/app/interfaces/location';

const enterFromRight = trigger('enterFromRight', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('150ms ease-in-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('150ms ease-in-out', style({ transform: 'translateX(-100%)' }))
  ])
]);

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, SearchbarFormComponent, SearchbarListComponent],
  templateUrl: './searchbar.component.html',
  animations: [enterFromRight]
})
export class SearchbarComponent {
  searchbarService = inject(SearchbarService);
  weatherService = inject(WeatherService);

  locationsFound = this.weatherService.locationsFound;

  searchLocation(location: string) {
    this.weatherService.searchLocation(location);
  }

  setLocation(location: LocationResponse) {
    this.weatherService.setCurrentLocation(location);
    this.searchbarService.toggleSearchbar();
  }
}
