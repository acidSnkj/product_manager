import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProducts } from "./products";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {

  // hand short code
  constructor(private productService: ProductService) {
    this.productService = productService;
  }

  // property values
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;
  pageTitle = 'Product List!';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
    console.log('In setter:', value);
  }
  filteredProducts: IProducts[] = [];
  products: IProducts[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProducts) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.listFilter = "";
    this.sub = this.productService.getProducts().subscribe({
      next: products => { this.products = products; this.filteredProducts = this.products; },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
