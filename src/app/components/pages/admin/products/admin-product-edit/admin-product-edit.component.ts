import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from '../../../../../types/products';
import { ProductsService } from '../../../../../services/products.service';

@Component({
  selector: 'app-admin-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-product-edit.component.html',
  styleUrl: './admin-product-edit.component.css'
})
export class AdminProductEditComponent {
  productUpdate: Product = {
    _id: "",
    title: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    rate: 0,
  };
  Category: Category[] = [];
  idPr: string = "";

  constructor(private ProductService: ProductsService, private route: ActivatedRoute) { }

  toastr = inject(ToastrService);

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.idPr = String(params.get('idPr'));
    })
    
    this.ProductService.getDetailProduct(this.idPr).subscribe(data => {
      this.productUpdate = data;
    })

    this.ProductService.getAllCategory().subscribe(data => {
      this.Category = data;
    })
  }

  validateFormProduct(product: Omit<Product, "_id">) {
    let valid: boolean = false;
    if (product.title.trim().length === 0) {
      valid = true;
      this.toastr.error("Title is required!");
    }
    if (product.description.trim().length === 0) {
      valid = true;
      this.toastr.error("Description is required!");
    }
    if (product.price <= 0) {
      valid = true;
      this.toastr.error("Price is greater than 0!");
    }
    if (product.rate <= 0) {
      valid = true;
      this.toastr.error("Rate is greater than 0!");
    }
    if (product.category.trim().length === 0) {
      valid = true;
      this.toastr.error("Category is required!");
    }
    if (product.image.trim().length === 0) {
      valid = true;
      this.toastr.error("Image is required!");
    }
    return valid;
  }

  handleSubmit() {
    const { title, price, image, category, description, rate } = this.productUpdate;
    if (this.validateFormProduct({ title, price, image, category, description, rate })) {
      this.ngOnInit();
      return;
    }
    this.ProductService.updateProduct({ title, price, image, category, description, rate }, this.productUpdate._id)
  }

}
