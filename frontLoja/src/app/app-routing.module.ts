import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CustomizeComponent } from './components/customize/customize.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ClientShopComponent } from './components/client-shop/client-shop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'customize', component: CustomizeComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'product-detail', component: ProductDetailComponent  },
    { path: 'client-shop', component: ClientShopComponent  },
    { path: 'dashboard', component: DashboardComponent  }

];

export const partialComponents = [];