import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationResponse } from 'src/app/interfaces/location';

@Component({
  selector: 'app-searchbar-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar-list.component.html'
})
export class SearchbarListComponent {
  @Input({ required: true }) locations!: WritableSignal<LocationResponse[]>;
  @Output() locationSelected = new EventEmitter<LocationResponse>();

  selectLocation(location: LocationResponse) {
    this.locationSelected.emit(location);
  }
}
