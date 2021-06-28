import { Component, OnInit } from '@angular/core';
import { ApiFetchingService } from '../../services/api-fetching.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public weeklyData: [] = [];
  public notWaiting = false;

  constructor(private apiFetchingService: ApiFetchingService) { }

  ngOnInit(): void {

    let woeid:number = Number(localStorage.getItem('woeid'));

    if(woeid === 0) {
      localStorage.setItem('woeid', '753692');
      woeid = Number(localStorage.getItem('woeid'));
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const dateFormat = `${year}/${month}/${day}`;
    const weatherData = JSON.parse(localStorage.getItem('weeklyData') ?? '{}');

    if (localStorage.getItem('weeklyData') === null || weatherData[0].applicable_date !== dateFormat) {

      this.apiFetchingService.searchWeather(woeid)
      .subscribe( (res: any) => {
          this.weeklyData = res;
          this.notWaiting = true;
          localStorage.setItem('weeklyData', JSON.stringify(res));
      });

    }

  }

}
