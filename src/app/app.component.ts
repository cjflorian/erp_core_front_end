import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule, HttpClient  } from '@angular/common/http';
import { RouterOutlet,  RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { FormComponent } from './users/form/form.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
            CommonModule, 
            RouterOutlet, 
            RouterLink, 
            RouterLinkActive, 
            LoginComponent, 
            MainComponent, 
            UsersComponent, 
            LogoutComponent, 
            MenuComponent,
            FormComponent],
  providers: [ HttpClientModule, HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'erp-core-front-end';
}
