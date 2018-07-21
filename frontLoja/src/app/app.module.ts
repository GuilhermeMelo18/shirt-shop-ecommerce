import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes, partialComponents} from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FacebookModule } from 'ngx-facebook';
import { NgxPaginationModule } from 'ngx-pagination';

//Services
import { UsuarioService } from './services/user.service';
import { ShirtService } from './services/shirt.service';

//Routing
import { RouterModule, Routes } from '@angular/router';

//Components
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CustomizeComponent } from './components/customize/customize.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ClientShopComponent } from './components/client-shop/client-shop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    CadastroComponent,
    CustomizeComponent,
    ShopComponent,
    ProductDetailComponent,
    ClientShopComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FacebookModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [UsuarioService, ShirtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
