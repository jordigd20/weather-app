import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SearchbarComponent, DetailsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isSearchbarDisplayed = signal(false);

  onSearchbarDisplayed(isDisplayed: boolean) {
    this.isSearchbarDisplayed.set(isDisplayed);
  }
}
