import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './components/layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './components/layouts/layout-client/layout-client.component';
import { LoginComponent } from './components/pages/clients/login/login.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/pages/admin/admin-products/admin-products.component';
import { AdminProductCreateComponent } from './components/pages/admin/admin-product-create/admin-product-create.component';
import { AdminProductEditComponent } from './components/pages/admin/admin-product-edit/admin-product-edit.component';
import { HomePageComponent } from './components/pages/clients/home-page/home-page.component';
import { ProductsListComponent } from './components/pages/clients/products-list/products-list.component';
import { ProductDetailComponent } from './components/pages/clients/product-detail/product-detail.component';
import { NotFoundComponent } from './components/pages/clients/not-found/not-found.component';

export const routes: Routes = [
    {
        path: "admin",
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
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
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
