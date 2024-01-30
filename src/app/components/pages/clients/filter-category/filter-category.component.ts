import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../../types/products';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-filter-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.css'
})
export class FilterCategoryComponent implements OnInit {

  categories: Category[] = [];
  constructor(private cate: CategoryService) {
  }
  ngOnInit(): void {
    this.cate.getAllCategories().subscribe(data => this.categories = data);
  }
  isDisplayBlock: boolean = false;
  handleClickDisplayed() {
    this.isDisplayBlock = !this.isDisplayBlock;
  }

}
