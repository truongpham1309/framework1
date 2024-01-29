import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const routerGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token_admin = sessionStorage.getItem('token_admin');

  if (token_admin){
    // toastr.success("Chào mừng bạn đến với trang quản trị!","", {
    //   positionClass:"toast-top-full-width"
    // })
    return true;
  }
  else if(sessionStorage.getItem("token")){
    toastr.warning("Bạn không có quyền vào trang quản trị!","");
    return false;
  }

  router.navigateByUrl("/login");
  toastr.warning("Bạn chưa đăng nhập!");
  return false;
};
