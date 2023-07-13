import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  selector: 'app-searchbar-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar-form.component.html'
})
export class SearchbarFormComponent {
  @Output() searchLocation = new EventEmitter<string>();

  weatherService = inject(WeatherService);
  searchQuery = '';

  onSubmit() {
    if (this.searchQuery === '') {
      return;
    }

    this.searchLocation.emit(this.searchQuery);
  }
}
