import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../types/products';
import { ProductsService } from '../../../../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import Fuse from 'fuse.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounce } from 'lodash';


@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  productsInital: Product[] = [];
  filteredProducts: Product[] = [];
  keywords: string = "";
  fuse!: Fuse<Product>;

  constructor(private productService: ProductsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.productsInital = data;
      this.fuse = new Fuse(this.products, { keys: ['title'], threshold: 0.3 });
    });
  }

  handelChangeInputSearchProductDebounce = debounce(() => {
    if (!this.fuse) {
      this.fuse = new Fuse(this.products, { keys: ['title'], threshold: 0.3 });
    }

    this.keywords = this.keywords.trim();

    this.filteredProducts = this.keywords
      ? this.fuse.search(this.keywords).map(result => result.item)
      : this.productsInital;

    this.products = this.filteredProducts;
    console.log(this.products);

  }, 500)

  handelChangeInputSearchProduct(): void {
    this.handelChangeInputSearchProductDebounce();
  }

  handleRemoveProduct(id: string): void {
    if (!confirm('Are you sure you want to remove?')) return;

    this.productService.removeProduct([id]).subscribe(
      () => {
        this.products = this.products.filter(p => p._id !== id);
        this.toastr.success("Product removed successfully!", "Success!");
      }
    );
  }
}
