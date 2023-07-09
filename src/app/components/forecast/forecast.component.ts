import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, ForecastCardComponent],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {

}
