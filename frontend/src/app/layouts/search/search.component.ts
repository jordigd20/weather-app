import { Component, OnInit } from '@angular/core';
import { ApiFetchingService } from '../../services/api-fetching.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public weeklyData: [] = [];
  public notWaiting = false;
  public locations: any[] = [];

  constructor(private route: ActivatedRoute,
              private apifetch: ApiFetchingService) { }

  ngOnInit(): void {
    // Get data from localStorage
    this.weeklyData = JSON.parse(localStorage.getItem('weeklyData') ?? '{}');
    this.notWaiting = true;

    // Get url parameters for searching the location
    this.route.queryParams.subscribe( params => {

      const objValues = Object.values(params);

      if (objValues.length > 0) {
        // Check if there is more than 1 location in the parameters
        if(typeof objValues[0] === 'object') {
          // For each location, calls the api and pushes to the array of locations
          Object.values(params)[0].forEach( (value: any) => {
            this.apiSearchLocation(value);
          });
        } else {
          // Calls the api and pushes to the array of locations
          this.apiSearchLocation(objValues[0]);
        }
      }

    });

  }

  apiSearchLocation(location: string) {
    this.apifetch.searchLocation(location)
      .subscribe( (res: any) => {
        if(res.woeid !== undefined)
          this.locations.push(res);
      });
  }



}
