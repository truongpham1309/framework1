import { Component, Input } from '@angular/core';
import { DescriptionPipe } from '../../../../pipes/description.pipe';
import { ProductsRateComponent } from '../products-rate/products-rate.component';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../types/products';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DescriptionPipe, ProductsRateComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product = {
    _id: "",
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    rate: 0,
  }
}
