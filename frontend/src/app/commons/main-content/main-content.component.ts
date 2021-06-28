import { Component, Input, OnInit } from '@angular/core';
import { ApiFetchingService } from '../../services/api-fetching.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @Input() weeklyData: any[] = [];

  constructor(private apifetching: ApiFetchingService) { }

  ngOnInit(): void {
    console.log('Main content recibe esto:',this.weeklyData);
  }

  roundNumber(num: number):number {
    return Math.round(num);
  }

  get wind_status() {
    return Math.round(this.weeklyData[0][0].wind_speed) ?? 7;
  }

  get humidity() {
    return this.weeklyData[0][0].humidity ?? 84;
  }

  get visibility() {
    return this.weeklyData[0][0].visibility.toFixed(1) ?? 6.4;
  }

  get air_pressure() {
    return this.weeklyData[0][0].air_pressure ?? 998;
  }

}
