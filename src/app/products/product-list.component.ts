import { Component, OnInit } from "@angular/core";
import { IProducts } from "./products";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  // hand short code
  constructor(private productService: ProductService) {
    this.productService = productService;
  }

  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;

  // property values
  pageTitle = 'Product List!';

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
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
