import { Component, OnInit } from '@angular/core';
import { ApiFetchingService } from '../../services/api-fetching.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public weeklyData: [] = [];
  public notWaiting = false;

  constructor(private apiFetchingService: ApiFetchingService,
              private router: Router) { }

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

          }, (err) => {

            console.warn(err);
            this.notWaiting = true;

            if(err.statusText === 'Not Found') {
              localStorage.removeItem('woeid');
              this.router.navigateByUrl('/home');
            }

            let htmlMsg = '';
            if(err.error === 'See /corsdemo for more info\n') {
              htmlMsg =
                `<p>The access to the API is temporarily disabled, please access the following link to grant access to the API
                <a href="https://cors-anywhere.herokuapp.com/corsdemo" style="color: #00aaff" target="_blank">https://cors-anywhere.herokuapp.com/corsdemo</a></p>`
            }

            Swal.fire({
              title: 'Error!',
              html: htmlMsg || err.error,
              icon: 'error',
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            }).then( () => {

              if(localStorage.getItem('weeklyData') !== null)
                this.weeklyData = JSON.parse(localStorage.getItem('weeklyData') ?? '{}');
              else
                this.notWaiting = false;

            });

        });

    }

  }

}
