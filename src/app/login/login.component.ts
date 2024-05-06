import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false; // hidden by default
  formNewLogin = new FormGroup({
    Name_val: new FormControl('', Validators.required),
    Password_val: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) { 

  }
  
  ngOnInit(): void {
    let session = localStorage.getItem('user');
    console.log(session);
    if(session!==null)
    {
      let datos =  JSON.parse(session);
      this.router.navigate(['/main']);
    }
    else{
      
    }
   
  }

  async onClickLogin(){
    //console.log(this.formNewLogin.value);
    let Name_val = this.formNewLogin.value.Name_val;
    let login = false;
    Swal.showLoading();
    this.loginService.login(this.formNewLogin.value).then((res:any) =>{
      console.log(res);
      Swal.hideLoading();
      Swal.fire('Login Exitoso','Dato', 'success');
      localStorage.setItem('user', JSON.stringify({ token: res.token, Name_val: Name_val}));
      login = true;
    this.router.navigateByUrl('/principal');
    console.log('redireccionar');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });  
    }

  

}
