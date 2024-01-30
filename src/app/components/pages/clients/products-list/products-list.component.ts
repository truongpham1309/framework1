import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../types/products';
import { ProductsService } from '../../../../services/products.service';
import { PaginationComponent } from './../pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { FilterCategoryComponent } from '../filter-category/filter-category.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, PaginationComponent, FilterCategoryComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  productsList: Product[] = [];
  totalPercentPages: number = 12;
  totalPages: number = 0;
  startIndex: number = 0;
  PageIndex: number = 0;

  constructor(private Products: ProductsService, private route: ActivatedRoute) {

   }
  ngOnInit(): void {
    this.Products.getAllProducts().subscribe(data => {
      this.totalPages = Math.ceil(data.length / this.totalPercentPages);
      this.getPageIndex();
      this.startIndex = this.totalPercentPages * this.PageIndex;
      this.productsList = data.slice(this.startIndex, this.startIndex + this.totalPercentPages);
    });
  }

  getPageIndex(): any {
    this.route.queryParams.subscribe(params => {
      if (!params['page'] || params['page'] > this.totalPages) {
        return this.PageIndex = 0;
      }
      else {
        return this.PageIndex = params['page'] - 1;
      }
    })
  }

}
