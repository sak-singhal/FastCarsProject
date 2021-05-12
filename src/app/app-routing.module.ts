import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './cars/car-list.component';
import { CarDetailsComponent } from './cars/car-details.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
  },
  {
    path: 'allOrders',
    component: AllOrdersComponent,
  },
  {
    path: 'orderdetails/:id',
    component: OrderDetailsComponent,
  },
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
