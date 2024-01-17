import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-rate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-rate.component.html',
  styleUrl: './products-rate.component.css'
})
export class ProductsRateComponent {

  @Input() rateInit = 0;

 rates: number[] = [1,2,3,4,5];
 
}
