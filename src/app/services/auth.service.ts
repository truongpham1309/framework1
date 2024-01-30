import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, responseDataLogin } from '../types/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "http://localhost:8000/users";
  private apiURL2 = "https://65a90dd9219bfa3718684fb4.mockapi.io/users";

  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

  private getHeaders(): HttpHeaders {
    if (!sessionStorage.getItem('token_admin')) this.route.navigateByUrl("/login");
    const token = sessionStorage.getItem('token_admin');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    })
  }

  registerAccount(account: Omit<User, "_id" | "role">): void {
    this.http.post<User>(`${this.apiURL}/register`, account).subscribe(data => {
      const { email, password } = account;
      this.loginAccount({ email, password });
    }, (error) => {
      console.log(error);
      this.toastr.warning("Register failed!", "", {

      });
    }
    );
  }

  createUser(account: Omit<User, "_id" | "role">): void {
    this.http.post<User>(`${this.apiURL2}`, account).subscribe(data => {
      this.route.navigateByUrl("/admin/users");
    }, (error) => {
      console.log(error);
      this.toastr.warning("Create failed!", "", {
      });
    }
    );
  }

  getDetailUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL2}/${id}`);
  }

  updateUser(accout: User): void {
    const options = {
      headers: this.getHeaders(),
    }
    this.http.put<User>(`${this.apiURL2}/${accout._id}`, accout, options).subscribe(() => {
      this.route.navigateByUrl("/admin/users");
      this.toastr.success("Updated accout successfully!", "");
    }, error => {
      console.log(error);
      this.toastr.error("Error updating...");
    });
  }

  loginAccount(account: Omit<User, "username" | "_id" | "role">): void {
    this.http.post<responseDataLogin>(`${this.apiURL}/login`, account).subscribe((data) => {
      if (data.user.role === "admin") {
        this.route.navigateByUrl("/admin");
        sessionStorage.setItem("token_admin", data.token);
      }
      else {
        this.route.navigateByUrl("/products");
        sessionStorage.setItem("token", data.token);
      }
    }, (error) => {
      this.toastr.warning("Email or password incorrect!", "");
    }
    )
  }

  getAllUsers(): Observable<Omit<User, "role">[]> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.http.get<Omit<User, "role">[]>(this.apiURL2, options);
  }

  removeUser(id: number): Observable<User> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.http.delete<User>(`${this.apiURL2}/${id}`, options);
  }
}
