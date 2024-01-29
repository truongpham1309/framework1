import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../../types/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-cate-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-cate-update.component.html',
  styleUrl: './admin-cate-update.component.css'
})
export class AdminCateUpdateComponent implements OnInit {

  newCate: Category = {
    id: 0,
    category: ""
  }
  validCate = false;
  idCate = 0
  constructor(private cate: CategoryService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe( param => {
      this.idCate = Number(param.get("idCate"));
    })
    this.cate.getDetailCategory(this.idCate).subscribe(data => this.newCate = data);
  }

  handleSubmitUpdateCategory() {
    if(this.newCate.category.trim().length === 0) {
      this.validCate = true;
      return;
    }
    this.cate.updateCategory(this.newCate).subscribe(() => {
      this.toastr.success("Updated category successfully!", "");
      this.router.navigateByUrl("/admin/categories");
    }, (error) => {
      console.log(error);
      this.toastr.warning("Error updating category!");
    })
  }
}
