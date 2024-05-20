import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { UserRoles } from '../models/userroles';
import { UpdateDataService } from '../services/update-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [GenericTableComponent]
})
export class UsersComponent implements OnInit  {
  usersRoles: UserRoles[] = [];
  module: string = 'users';
  
  

  constructor(private usersService: UsersService, private updateDataService: UpdateDataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers()
      .then(usersRoles => {
        this.usersRoles = usersRoles;
        this.usersRoles.forEach(userRole => {
          userRole.module = this.module;
        });
        console.log(usersRoles);
        this.updateDataService.updateData(usersRoles);
      } )
      .catch(error => console.log(error));
  }
  onClickANew(){
    this.usersRoles= [];
    this.updateDataService.editData(this.usersRoles[0]);
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id)
      .then(() => this.getAllUsers())
      .catch(error => console.log(error));
  }
}
