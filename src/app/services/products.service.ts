import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product } from '../types/products';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Call API
  private apiUrl2 = "http://localhost:8000/products";
  private apiUrl = "https://65a66cb474cf4207b4effdca.mockapi.io/products";

  // private http = inject(HttpClient);

  constructor(private http: HttpClient, private route: Router) { }

  private getHeaders(): HttpHeaders {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTIzMGU4YmM5ZDNkNGNkOTVmMDZkOCIsImlhdCI6MTcwNTM3NzkxMSwiZXhwIjoxNzA3OTY5OTExfQ.2Y3GPXMVXvQb7BQqflCDeDWXnbO4WcEX1Lx7Mz0DZOM';  // Thay YOUR_AUTH_TOKEN bằng token thực tế của bạn
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getDetailProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsRelatedToCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('https://65a66cb474cf4207b4effdca.mockapi.io/categories');
  }

  createProduct(newProduct: Omit<Product, "_id">): void {
    const options = {
      headers: this.getHeaders(),
    }
    this.http.post<Product>(`${this.apiUrl}`, newProduct, options).subscribe(() => {
      this.route.navigate(['/admin/products'])
    })
  }

  updateProduct(newProduct: Omit<Product, "_id">, id: string): void {
    const options = {
      headers: this.getHeaders(),
    }
    this.http.put<Product>(`${this.apiUrl}/${id}`, newProduct, options).subscribe(() => {
      this.route.navigate(['/admin/products']);
    })
  }

  removeProduct(id: string[]): Observable<any> {

    const headers = this.getHeaders();
    const options = {
      headers,
    }
    return this.http.delete(`${this.apiUrl}/${id}`, options);
  }
}
