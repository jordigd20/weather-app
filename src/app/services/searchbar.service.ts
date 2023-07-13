import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  isSearchbarDisplayed = signal(false);

  toggleSearchbar() {
    this.isSearchbarDisplayed.update((isSearchbarDisplayed) => !isSearchbarDisplayed);
  }
}
