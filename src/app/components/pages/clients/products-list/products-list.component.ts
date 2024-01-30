import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Category, Product } from '../../../../types/products';
import { ProductsService } from '../../../../services/products.service';
import { PaginationComponent } from './../pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { FilterCategoryComponent } from '../filter-category/filter-category.component';
import { CategoryService } from '../../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { debounce } from 'lodash';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, PaginationComponent, FilterCategoryComponent, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  productsList: Product[] = [];
  categoryList: Category[] = [];
  initalList: Product[] = [];
  filteredProducts: Product[] = [];
  totalPercentPages: number = 12;
  totalPages: number = 0;
  startIndex: number = 0;
  PageIndex: number = 0;
  keywords: string = "";
  defautlString: string = "";
  fuse!: Fuse<Product>;

  constructor(private Products: ProductsService, private route: ActivatedRoute, private cate: CategoryService) {

  }
  ngOnInit(): void {
    this.Products.getAllProducts().subscribe(data => {
      this.initalList = data;
      this.totalPages = Math.ceil(data.length / this.totalPercentPages);
      this.getPageIndex();
      this.startIndex = this.totalPercentPages * this.PageIndex;
      this.productsList = data.slice(this.startIndex, this.startIndex + this.totalPercentPages);
    });

    this.cate.getAllCategories().subscribe(data => this.categoryList = data);

  }

  isDisplayBlock: boolean = false;
  handleClickDisplayed() {
    this.isDisplayBlock = !this.isDisplayBlock;
  }

  handleFilterCategory(category: string) {
    console.log("object");
    if (category) {
      this.productsList = this.initalList.filter(item => item.category === category);
      console.log(this.initalList);
      
    }
    else {
      this.ngOnInit();
    };
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

  handelChangeInputSearchProductDebounce = debounce(() => {
    if (!this.fuse) {
      this.fuse = new Fuse(this.initalList, { keys: ['title'], threshold: 0.3 });
    }

    this.keywords = this.keywords.trim();

    if (this.keywords) {
      this.filteredProducts = this.fuse.search(this.keywords).map(result => result.item);
      this.productsList = this.filteredProducts;
      console.log(this.productsList);
      return;
    }
    else {
      this.ngOnInit();
    }

  }, 200)

  handelChangeInputSearchProduct(): void {
    this.handelChangeInputSearchProductDebounce();
  }

}
