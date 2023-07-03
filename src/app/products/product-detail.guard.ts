import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductDetailService } from './product-detail.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate  {
  constructor(private router: Router, private productDetailService: ProductDetailService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = Number(route.paramMap.get("id"))
      if (isNaN(id) || id < 1) {
        alert("Invalid product Id");
        this.router.navigate(['/products']);
        return false;
      }
      if (this.productDetailService.productCache[id]) {
        return true;
      }
      return this.productDetailService.getProductById(id).pipe(
        map(product => {
          console.log("product", product)
          if (product) {
            return true;
          } else {
            alert("Product not found");
            this.router.navigate(['/products']);
            return false;
          }
        }),
        catchError(error => {
          alert("An error occurred while retrieving the product");
          this.router.navigate(['/products']);
          return of(false);
        })
      );
    }
};
