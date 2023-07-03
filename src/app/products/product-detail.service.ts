import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, map, filter, of } from 'rxjs';
import { IProducts } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private productUrl = 'api/products/products.json';
  public productCache: { [id: number]: IProducts } = {};

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<IProducts> {
    if (this.productCache[id]) {
      return of(this.productCache[id]);
    }
    return this.http.get<IProducts[]>(this.productUrl).pipe(
      map(products => products.find(product => product.productId === id) as IProducts),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
