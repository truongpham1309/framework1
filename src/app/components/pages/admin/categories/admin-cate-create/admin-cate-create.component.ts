import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-admin-cate-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-cate-create.component.html',
  styleUrl: './admin-cate-create.component.css'
})
export class AdminCateCreateComponent{

  newCate = {
    category: "",
  };
  validCate = false;
  constructor(private cate: CategoryService) { }

  handleSubmitCreateCategory() {
    if (this.newCate.category.trim().length === 0) {
      this.validCate = true;
      return;
    }
    this.cate.createCategory(this.newCate);
  }

}
