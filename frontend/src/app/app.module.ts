import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './commons/main-content/main-content.component';
import { SidebarWeatherComponent } from './commons/sidebar-weather/sidebar-weather.component';
import { SidebarSearchComponent } from './commons/sidebar-search/sidebar-search.component';
import { HomeComponent } from './layouts/home/home.component';
import { SearchComponent } from './layouts/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    SidebarWeatherComponent,
    HomeComponent,
    SearchComponent,
    SidebarSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
