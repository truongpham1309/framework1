import { Component, OnInit } from '@angular/core';
import { ProductsRateComponent } from '../products-rate/products-rate.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../types/products';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductsRateComponent, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productID: string = "";

  productsRelated: Product[] = [];
  productsAll: Product[] = [];

  product: Product = {
    _id: "",
    title: "",
    image: "",
    category: "",
    description: "",
    price: 0,
    rate: 0,
  }

  constructor(private route: ActivatedRoute, private Products: ProductsService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPr = params.get('idPr');
      this.productID = String(idPr);

      this.Products.getDetailProduct(this.productID).subscribe(data => {
        this.product = data;
      })
    });
  }
}
