import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Carslist, CrossSellProduct } from '../carslist';
import { ICar, Users } from './cars';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  private productUrl = 'http://localhost:3000/cars';
  private imageurl = 'assets/carimage.json';
  constructor(private http: HttpClient, private router: Router) {}

  getCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(this.productUrl).pipe(
      tap((data) => console.log('All: ')),
      catchError(this.handleError)
    );
  }
  getAllOrders(): Observable<Users[] | undefined> {
    return this.http.get<Users[]>('http://localhost:3000/carOrders').pipe(
      tap((data) => console.log('All: ')),
      catchError(this.handleError)
    );
  }

  getCar(id: number): Observable<ICar | undefined> {
    return this.getCars().pipe(
      map((products: ICar[]) => products.find((p) => p.id === id))
    );
  }
  getOrderDetails(id: number): Observable<ICar | undefined> {
    return this.getCars().pipe(
      map((products: ICar[]) => products.find((p) => p.id === id))
    );
  }

  getCrossSellProducts(): Observable<CrossSellProduct[]> {
    return this.http
      .get<CrossSellProduct[]>('http://localhost:3000/crossSellProducts')
      .pipe(
        tap((data) =>
          console.log('getCrossSellProducts: ' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }
  updateCars(data: any) {
    this.http.put('http://localhost:3000/cars/' + data.id, data).subscribe();
  }
  addComplains(data: any) {
    this.http
      .put('http://localhost:3000/carOrders/' + data.id, data)
      .subscribe();
  }

  registerCar(order: any) {
    this.http.post('http://localhost:3000/carOrders', order).subscribe();
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
