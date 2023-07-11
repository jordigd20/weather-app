import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from 'src/app/interfaces/forecast';
import { conditionCodes } from 'src/app/helpers/condition-codes';
import { RoundPipe } from 'src/app/pipes/round.pipe';

type TemperatureUnit = 'C' | 'F';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule, RoundPipe],
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent {
  @Input({ required: true }) date: string = '';
  @Input({ required: true }) temperatureUnit: TemperatureUnit = 'C';
  @Input() day!: Day;

  conditionCodes = conditionCodes;
}
