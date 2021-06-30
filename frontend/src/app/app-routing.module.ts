import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { SearchComponent } from './layouts/search/search.component';
import { SearchGuard } from './guards/search.guard';

/*
  '' === **                               ->   Home
  /search                                 ->   Search sidebar
  /search?query=location                  ->   Search location in the API
  /search?query=location&query=location   ->   Search each location in the API
*/

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [SearchGuard]},
  { path: 'search/:query', component: SearchComponent, canActivate: [SearchGuard]},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
