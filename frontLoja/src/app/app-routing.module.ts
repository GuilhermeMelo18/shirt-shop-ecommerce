import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CustomizeComponent } from './components/customize/customize.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'customize', component: CustomizeComponent },
    
];

export const partialComponents = [];