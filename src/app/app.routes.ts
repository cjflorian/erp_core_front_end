import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { FormComponent } from './users/form/form.component';


export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/main'},
    {path: 'main', component:MainComponent},
    {path: 'login', component:LoginComponent},
    {path: 'users', component:UsersComponent},
    {path:'menu', component:MenuComponent},
    {path: 'logout', component:LogoutComponent},
    {path: 'users/form', component:FormComponent},
    {path: 'users/form/:id', component:FormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }