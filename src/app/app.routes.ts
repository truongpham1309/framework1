import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './components/layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './components/layouts/layout-client/layout-client.component';
import { LoginComponent } from './components/pages/clients/login/login.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/pages/admin/products/admin-products/admin-products.component';
import { AdminProductCreateComponent } from './components/pages/admin/products/admin-product-create/admin-product-create.component';
import { AdminProductEditComponent } from './components/pages/admin/products/admin-product-edit/admin-product-edit.component';
import { HomePageComponent } from './components/pages/clients/home-page/home-page.component';
import { ProductsListComponent } from './components/pages/clients/products-list/products-list.component';
import { ProductDetailComponent } from './components/pages/clients/product-detail/product-detail.component';
import { NotFoundComponent } from './components/pages/clients/not-found/not-found.component';
import { RegisterComponent } from './components/pages/clients/register/register.component';
import { routerGuard } from './guards/router.guard';
import { AdminCateListComponent } from './components/pages/admin/categories/admin-cate-list/admin-cate-list.component';
import { AdminCateUpdateComponent } from './components/pages/admin/categories/admin-cate-update/admin-cate-update.component';
import { AdminUserListComponent } from './components/pages/admin/users/admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './components/pages/admin/users/admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './components/pages/admin/users/admin-user-update/admin-user-update.component';
import { AdminCateCreateComponent } from './components/pages/admin/categories/admin-cate-create/admin-cate-create.component';

export const routes: Routes = [
    {
        path: "admin",
        canActivate: [routerGuard],
        component: LayoutAdminComponent,
        children: [
            {
                path: '',
                redirectTo: "/admin/dashboard",
                pathMatch: "full"
            },
            {
                path: "dashboard",
                component: AdminDashboardComponent,
            },
            {
                path: "products",
                component: AdminProductsComponent,
            },
            {
                path: "products_create",
                component: AdminProductCreateComponent,
            },
            {
                path: "products_edit/:idPr",
                component: AdminProductEditComponent,
            },
            {
                path: "categories",
                component: AdminCateListComponent,
            },
            {
                path: "categories/create",
                component: AdminCateCreateComponent,
            },
            {
                path: "categories/edit/:idCate",
                component: AdminCateUpdateComponent,
            },
            {
                path: "users",
                component: AdminUserListComponent,
            },
            {
                path: "users/create",
                component: AdminUserCreateComponent,
            },
            {
                path: "user/edit/:idUser",
                component: AdminUserUpdateComponent,
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "signup",
        component: RegisterComponent,
    },
    {
        path: "",
        component: LayoutClientComponent,
        children: [
            {
                path: "",
                redirectTo: "/home",
                pathMatch: "full",
            },
            {
                path: 'home',
                component: HomePageComponent,

            },
            {
                path: "products",
                component: ProductsListComponent,
            },
            {
                path: "product_detail/:idPr",
                component: ProductDetailComponent,
            },
            {
                path: "**",
                component: NotFoundComponent,
            }
        ]
    },

];
