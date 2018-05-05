import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainComponent },
    { path: 'cadastro', component: CadastroComponent },
    
];

export const partialComponents = [];