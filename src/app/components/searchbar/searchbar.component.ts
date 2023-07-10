import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { SearchbarFormComponent } from '../searchbar-form/searchbar-form.component';
import { SearchbarListComponent } from '../searchbar-list/searchbar-list.component';

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
  styleUrls: ['./searchbar.component.css'],
  animations: [enterFromRight]
})
export class SearchbarComponent {
  @Input({ required: true }) isSearchbarDisplayed = false;
  @Output() isSearchbarVisible = new EventEmitter<boolean>();

  hideSearchbar() {
    this.isSearchbarVisible.emit(false);
  }
}
