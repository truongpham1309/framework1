import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../types/products';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  productsList: Product[] = []

  constructor(private Products: ProductsService) { }
  ngOnInit(): void {
    this.Products.getAllProducts().subscribe(data => this.productsList = data);
  }
}
