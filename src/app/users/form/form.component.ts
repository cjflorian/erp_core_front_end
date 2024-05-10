import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { IsLoged } from '../../utils/utils';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  formNewUser: FormGroup;
  User: User;
  isLogin: boolean | undefined // Two possible types: boolean or unfined
  isShowCreate: boolean = true ; // hidden by default
  isShowEdit: boolean = false ; // hidden by default

  constructor(private router: Router) { 
    this.formNewUser = new FormGroup({
      id:new FormGroup(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
    });
    this.User = new User(0, '', '', '', true, 0);
  }

  
  ngOnInit(): void {
    if(IsLoged()){
      this.router.navigateByUrl('/main');
      this.isLogin=true;
    }
  }

  onSubmit(): void {
    console.log(this.formNewUser.value);
    let name = this.formNewUser.value.name;
    let email = this.formNewUser.value.email;
    let password = this.formNewUser.value.password;
    let active = this.formNewUser.value.active;
    let roleId = this.formNewUser.value.roleId;
    this.User = new User(0, name, email, password, active, roleId);
  }

  onClickUpdate(): void {
    this.isShowCreate = false;
    this.isShowEdit = true;
  }

}
