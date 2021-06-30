import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.css']
})
export class SidebarSearchComponent implements OnInit {

  @Input() locations: any[] = [];

  searchForm = new FormGroup({
    location: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    // console.log(this.locations);
  }

  onSubmit() {
    // console.log(this.searchForm.value)
    const inputLocation = this.searchForm.value.location;
    this.router.navigateByUrl(`/search?query=${inputLocation}`);
  }

  search(woeid: number) {
    localStorage.setItem('woeid', JSON.stringify(woeid));
    this.router.navigateByUrl('');
  }

}
