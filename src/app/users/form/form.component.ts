import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { IsLoged } from '../../utils/utils';
import {CommonModule} from '@angular/common';
import { UpdateDataService } from '../../services/update-data.service';
import { Location } from '@angular/common';
import { Roles } from '../../models/roles.model';
import { UserRolesService } from '../../services/user-roles.service';
import { UsersService } from '../../services/users.service';



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
  arrRoleUsers: Roles[] = [];
  action: string = 'Create';

  constructor(private router: Router, private updateService: UpdateDataService,
    private  location: Location, 
    private userRolesService: UserRolesService,
    private usersService: UsersService) { 
    this.formNewUser = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      datecreated: new FormControl(new Date(), Validators.required),
      roleId: new FormControl('', Validators.required),
    });
    this.User = new User(0, '', '', '',  1, { id: 0, roleName: '' });
    
  }

  
  async ngOnInit() {
    try {
      await this.userRolesService.getAllRoles().then(roles => { this.arrRoleUsers=roles}).catch(err => console.log(err));
      this.updateService.dataEdit$.subscribe(data => {
        console.log('dataEdit', data);
        if(data === null || data === undefined || data === ''){
        }
        else{
          this.action = 'Edit';
        }
        this.formNewUser.setValue(data);
      });
    } catch (error) {
      // Handle the error
      console.error(error);
    }
    
    if(!IsLoged()){
      this.router.navigateByUrl('/main');
      this.isLogin=true;
    }
  }


  onSubmit(): void {
    console.log(this.formNewUser.value);
    let id = this.formNewUser.value.id;
    let name = this.formNewUser.value.name;
    let email = this.formNewUser.value.email;
    let password = this.formNewUser.value.password;
    let active =  this.formNewUser.value.active===true ? 1 :0;
    let roleId = parseInt(this.formNewUser.value.roleId);
    let roleName = "";
    this.User = new User(id!=''?id:0, name, email, password,  active, {id:roleId, roleName:roleName});
    if(this.action === 'Create'){
      this.createUser(this.User);
    }
    else if(this.action === 'Edit'){
      this.updateUser(this.User);
    }

  }

  onClickUpdate(): void {
    this.onSubmit();
    this.updateService.updateData(this.User);
    this.router.navigateByUrl('/users');
  }

  onClickBack(): void {
    this.location.back();
  }

  createUser(user: User): void {
    this.usersService.createUser(user)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User created successfully',
        
      })
      .catch(error => console.log(error));
  });
}

  updateUser(user: User): void {
    this.usersService.updateUser(user)
      .then(
        () => {
          Swal.fire({
            position: 'center',
            icon:'success',
            title: 'User updated successfully',
          }).catch(error => console.log(error));
    });
  }

}
