import { Component, OnInit } from '@angular/core';

import { ICar, Users } from '../cars/cars';
import { CarService } from '../cars/car.service';

import { Carslist, CrossSellProduct, allOrders } from '../carslist';
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  pageTitle = 'All Orders';
  images: any;
  errorMessage = '';
  p: number = 1;

  allOrders: any[] = [];

  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  totatLength: any;
  page: number = 1;

  allOrder: allOrders = new allOrders();
  crossSell: CrossSellProduct = new CrossSellProduct();
  crossSellProducts: CrossSellProduct[] = [];
  bodyMsg = 'this is good';
  constructor(private carService: CarService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.carService.getAllOrders().subscribe((data: any) => {
      this.allOrders = data;
    });

    this.carService.getCrossSellProducts().subscribe({
      next: (cars) => {
        this.crossSellProducts = cars;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  croosProductPrice(data: any) {
    let flag = this.crossSellProducts.filter((e) => e.id == data);

    if (flag.length >= 1) {
      return flag[0].price;
    } else {
      return 'NA';
    }
  }
  croosProductName(data: any) {
    let flag = this.crossSellProducts.filter((e) => e.id == data);

    if (flag.length >= 1) {
      return flag[0].productName;
    } else {
      return 'NA';
    }
  }
  openComplain(data: any) {
    this.allOrder = data;
  }
  addComplain(data: any) {
    this.carService.addComplains(this.allOrder);
  }
}
