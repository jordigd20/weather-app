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
    this.weeklyData = JSON.parse(localStorage.getItem('weeklyData') ?? '{}');
    this.notWaiting = true;

    this.route.queryParams.subscribe( params => {

      const objValues = Object.values(params);

      if (objValues.length > 0) {

        if(typeof objValues[0] === 'object') {
          Object.values(params)[0].forEach( (value: any) => {
            console.log(value)

            this.apifetch.searchLocation(value)
              .subscribe( (res: any) => {
                if(res.woeid !== undefined)
                  this.locations.push(res);
              });
          });
        } else {
          this.apifetch.searchLocation(objValues[0])
            .subscribe( (res: any) => {
              if(res.woeid !== undefined)
                this.locations.push(res);
            });
        }

      }

    });

  }

}
