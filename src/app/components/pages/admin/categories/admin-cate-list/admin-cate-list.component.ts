import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../../../types/products';
import { CategoryService } from '../../../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-cate-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-cate-list.component.html',
  styleUrl: './admin-cate-list.component.css'
})
export class AdminCateListComponent implements OnInit {

  Cate_list: Category[] = [];
  constructor (private cateService: CategoryService, private route: Router) {}
  ngOnInit(): void {
    this.cateService.getAllCategories().subscribe(data => {
      this.Cate_list = data;
    })
  }

  handleClickRemoveCategory(id: number) {
    if(!confirm('Are you sure you want to remove?')) return;
    this.cateService.removeCategory(id).subscribe(() => {
      this.Cate_list = this.Cate_list.filter(c => c.id !== id);
    })
  }

}
