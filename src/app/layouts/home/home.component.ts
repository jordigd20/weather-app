import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SearchbarComponent, DetailsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
