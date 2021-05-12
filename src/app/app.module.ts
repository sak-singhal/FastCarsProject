import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './cars/car-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarDetailsComponent } from './cars/car-details.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
@NgModule({
  declarations: [AppComponent, CarListComponent, CarDetailsComponent, AllOrdersComponent, OrderDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
