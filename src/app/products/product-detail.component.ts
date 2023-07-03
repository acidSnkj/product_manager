import { ActivatedRoute, Router } from "@angular/router";
import { ProductDetailService } from "./product-detail.service";
import { Component, OnInit } from "@angular/core";
import { IProducts } from "./products";
@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProducts | undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productDetailService: ProductDetailService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productDetailService.productCache[id]) {
      this.product = this.productDetailService.productCache[id];
    } else {
      this.productDetailService.getProductById(id).subscribe({
        next: product => this.product = product,
        error: err => this.errorMessage = err
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
