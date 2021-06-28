import { Component, OnInit } from '@angular/core';
import { ApiFetchingService } from '../../services/api-fetching.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public weeklyData: [] = [];
  public notWaiting = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.weeklyData = JSON.parse(localStorage.getItem('weeklyData') ?? '{}');
    this.notWaiting = true;
    console.log(this.weeklyData);
  }

}
