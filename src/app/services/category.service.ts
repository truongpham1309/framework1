import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../types/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL = "https://65a66cb474cf4207b4effdca.mockapi.io/categories"

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem("token_admin");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    })
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL);
  }

  getDetailCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/${id}`);
  }

  removeCategory(id: string): void {
    if (!confirm('Are you sure you want to remove this category?')) return;
    const options = {
      headers: this.getHeaders(),
    }
    this.http.delete(`${this.apiURL}/${id}`, options).subscribe(() => {
      this.toastr.success("Removed category successfully!", "");
    }, (error) => {
      console.log(error);
      this.toastr.error("Deleted category successfully!", "");
    })
  }

  updateCategory(Cate: Category): void {
    const options = {
      headers: this.getHeaders(),
    }
    this.http.put<Category>(this.apiURL, Cate, options).subscribe(() => {
      this.toastr.success("Update category successfully!", "");
    }, (error) => {
      console.log(error);
      this.toastr.error("Update category failed!", "");
    })
  }

  createCategory(newCategory: Category): void {
    const options = {
      headers: this.getHeaders(),
    }
    this.http.post<Category>(this.apiURL, newCategory, options).subscribe(() => {
      this.toastr.success("Category created successfully!", "");
    }, error => {
      console.log(error);
      this.toastr.error("Update category failed!", "");
    })
  }
}
