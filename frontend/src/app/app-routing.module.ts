import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { SearchComponent } from './layouts/search/search.component';
import { SearchGuard } from './guards/search.guard';

/*
  /home === **  ->   Home
  /search       ->   Search sidebar
*/

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent, canActivate: [SearchGuard]},
  { path: 'search/:query', component: SearchComponent, canActivate: [SearchGuard]},
  { path:'**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
