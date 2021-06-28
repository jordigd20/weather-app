import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-weather',
  templateUrl: './sidebar-weather.component.html',
  styleUrls: ['./sidebar-weather.component.css']
})
export class SidebarWeatherComponent implements OnInit {

  @Input() weeklyData: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  get weatherName() {
    return this.weeklyData[0][5].weather_state_name ?? 'Clear';
  }

  get temp() {
    return Math.round(this.weeklyData[0][0].the_temp) ?? 15;
  }

  get location() {
    return this.weeklyData[1] ?? 'London';
  }

  get actualDate() {
    return new Date().toDateString();
  }

}
