import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { UserRoles } from '../models/userroles';
import { UpdateDataService } from '../services/update-data.service';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [GenericTableComponent]
})
export class UsersComponent implements OnInit  {
  users: User[] = [];
  usersRoles: UserRoles[] = [];
  module: string = 'users';
  

  constructor(private usersService: UsersService, private updateDataService: UpdateDataService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers()
      .then(usersRoles => {
        
        this.users = usersRoles;
        
        this.updateDataService.updateData(usersRoles, this.module);
        
      } )
      .catch(error => console.log(error));
  }

  createUser(user: User): void {
    this.usersService.createUser(user)
      .then(() => {this.getAllUsers()
        
      })
      .catch(error => console.log(error));
  }

  updateUser(user: User): void {
    this.usersService.updateUser(user)
      .then(() => this.getAllUsers())
      .catch(error => console.log(error));
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id)
      .then(() => this.getAllUsers())
      .catch(error => console.log(error));
  }
}
