
import { Injectable } from '@angular/core';
import { IProducts } from './products';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.productUrl).pipe(
      tap(data => console.log("ALL", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError (err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.log("err", errorMessage);
    return throwError(errorMessage);
  }
}
