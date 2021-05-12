import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICar, Users } from '../cars/cars';
import { CarService } from '../cars/car.service';
import { Carslist, CrossSellProduct, allOrders } from '../carslist';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  pageTitle = 'Car Detail';
  errorMessage = '';
  car1: ICar | undefined;
  car: allOrders | undefined;
  crossSellProducts: CrossSellProduct[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
    this.carService.getAllOrders().subscribe((data: any) => {
      // this.users = data;
      this.car = data.find((e: any) => e.id == param);
    });
    this.carService.getCrossSellProducts().subscribe({
      next: (cars) => {
        this.crossSellProducts = cars;

        // this.filteredProducts = this.cars;
        // this.totatLength = this.filteredProducts.length;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getProduct(id: number): void {
    this.carService.getCar(id).subscribe({
      next: (car) => (this.car1 = car),
      error: (err) => (this.errorMessage = err),
    });
  }

  croosProduct(data: any) {
    let flag = this.crossSellProducts.filter((e) => e.id == data);

    return flag[0];
  }

  onBack(): void {
    this.router.navigate(['/allOrders']);
  }
}
