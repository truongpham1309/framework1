import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../../../types/products';
import { ProductsService } from '../../../../services/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  idPr: string = "";
  edit: boolean = false;
  add: boolean = false;

  constructor(private Product: ProductsService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get("edit")) this.edit = true;
      if(params.get("add")) this.add = true;
    })
    this.Product.getAllProducts().subscribe(data => {
      this.products = data;
      if(this.add) this.toastr.success("Create product successfully!", "CREATE PRODUCT");
      if(this.edit) this.toastr.success("Edit product successfully!", "EDIT PRODUCT");
    })
  }
  toastr = inject(ToastrService);
  handleRemoveProduct(id: string): void {
    if (!confirm('Are you sure you want to remove?')) return;

    this.Product.removeProduct([id]).subscribe(
      () => {
        this.products = this.products.filter(p => p._id !== id);
        // alert('Product removed successfully.');
        this.toastr.success("Product removed successfully!", "Success!");

        // Gọi các bước cần thiết sau khi xóa sản phẩm thành công
      },
      (error) => {
        console.error('Error removing product:', error);
        // Xử lý lỗi nếu cần
      }
    );

  }

}
