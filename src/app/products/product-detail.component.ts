import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from './products';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {

  pageTitle: string = "Product Detail"
  product: IProducts | undefined

  constructor(private route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("initiated product detail component")
    this.pageTitle = `Product Detail: ${id}`;
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
