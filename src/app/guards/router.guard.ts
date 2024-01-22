import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const routerGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = sessionStorage.getItem('token');

  if (token) return true;

  router.navigateByUrl("/login");
  toastr.warning("Bạn chưa đăng nhập!");
  return false;
};
