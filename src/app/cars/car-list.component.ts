import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ICar, Users } from './cars';
import { Carslist, CrossSellProduct } from '../carslist';

import { CarService } from './car.service';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  pageTitle = 'Car Inventory';
  images: any;
  errorMessage = '';
  p: number = 1;
  errorMsg: boolean = false;
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.cars;
  }

  filteredProducts: ICar[] = [];
  cars: ICar[] = [];

  cars2: any = [];
  car2: any = [];
  showImage = true;
  totatLength: any;
  page: number = 1;

  crossSell: CrossSellProduct = new CrossSellProduct();
  crossSellProducts: CrossSellProduct[] = [];

  constructor(private carService: CarService, private router: Router) {}

  performFilter(filterBy: string): ICar[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.cars.filter(
      (car: ICar) => car.carName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.filteredProducts = this.cars;
        this.totatLength = this.filteredProducts.length;
      },
      error: (err) => (this.errorMessage = err),
    });

    this.carService.getCrossSellProducts().subscribe({
      next: (cars) => {
        this.crossSellProducts = cars;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  addToCart(data: any) {
    this.cars2 = data;
  }
  registerCar(data: any) {
    console.log('rejister data' + JSON.stringify(data));
    if (this.cars2.customer_name && this.cars2.customer_email) {
      console.log('rejister come');
      this.errorMsg = false;
      this.carService.registerCar(data);
    } else {
      this.errorMsg = true;
    }
  }
  opneUpdate(data: any) {
    this.car2 = data;

    if (data.availability) {
      this.car2.availability = 'true';
    }
    if (!data.availability) {
      this.car2.availability = 'false';
    }
  }
  updateCars(data: any) {
    if (this.car2.availability == 'true') {
      this.car2.availability = true;
    }
    if (this.car2.availability == 'false') {
      this.car2.availability = false;
    }

    this.carService.updateCars(this.car2);
    // this.router.navigate(['/allOrders']);
  }
}
