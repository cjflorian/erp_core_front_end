import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import {CommonModule} from '@angular/common';
import { Login } from '../models/login.model';
import { setSession, IsLoged } from '../utils/utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formNewLogin: FormGroup;  
  //isLogin: any = false | undefined // hidden by default
  Login: Login;
  isLogin: boolean | undefined // Two possible types: boolean or unfined
 

  constructor(private loginService: LoginService, private router: Router) { 
    this.Login = new Login('',
     '',
      0,
      '',
      0,
      '',
      '',
      '',
      new Date());
    this.formNewLogin = new FormGroup({
      iduser_val: new FormControl(''),
      name_val: new FormControl('', Validators.required),
      password_val: new FormControl('', Validators.required),

    });
  }
  
  ngOnInit(): void {
    if(IsLoged()){
      this.router.navigateByUrl('/main');
      this.isLogin=true;
    }
  }
  

  async onClickLogin(){
    //console.log(this.formNewLogin.value);
    let name_val = this.formNewLogin.value.name_val;
    let password_val = this.formNewLogin.value.password_val;
    
    this.Login  = new Login(
      name_val,
      password_val,
      0,
      '',
      0,
      '',
      '',
      '',
      new Date() // Pass a Date object instead of Date.now()
    );
    Swal.showLoading();
    this.loginService.login(this.Login).then((res:any) =>{
      console.log(res);
      Swal.hideLoading();
      Swal.fire('Login Exitoso','Dato', 'success');
      this.isLogin=setSession(res);
      window.location.href = '/main';
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.message, 'error');
    });  
    }

  

}
