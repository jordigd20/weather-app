import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from '../forecast/forecast.component';
import { HighlightsComponent } from '../highlights/highlights.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ForecastComponent, HighlightsComponent, FooterComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {}
