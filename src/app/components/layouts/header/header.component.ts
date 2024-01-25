import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  isLogout = false;

  languages: string = "Angular";
  menuList = [
    { id: 1, name: "Home", slug: "/home" },
    { id: 2, name: "Products", slug: "/products" },
    { id: 3, name: "Contact", slug: "/contact" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {

    if (sessionStorage?.getItem('token') || sessionStorage?.getItem('token_admin')) {
      this.menuList.push({ id: 4, name: "Admin", slug: "/admin", });
      this.isLogout = true;
    }
    else {
      this.menuList.push({ id: 5, name: "Login", slug: "/login", });
      this.isLogout = false;
    }
  }

  navigationHiddenOrShow: boolean = true;

  onClickMenu(): void {
    this.navigationHiddenOrShow = !this.navigationHiddenOrShow;
  }
  handleLogOutAccount() {
    if(!confirm('Are you sure you want to log out?')) return;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("token_admin");
    this.router.navigateByUrl("/login");
  }
}
