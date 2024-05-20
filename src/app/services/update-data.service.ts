import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SwalertConfirmDelete, SwalertOkDialog } from '../utils/utils';
import { UsersService } from './users.service';
import { UserRoles } from '../models/userroles';


@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private router: Router, private usersService: UsersService) { }
  private dataSubject = new BehaviorSubject<any>(null);
  private dataEditSubject = new BehaviorSubject<any>(null);
  private dataDeleteSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  dataEdit$ = this.dataEditSubject.asObservable();
  dataDelete$ = this.dataDeleteSubject.asObservable();

  usersRoles: UserRoles[] = [];

  updateData(newData: any): void {
    this.dataSubject.next(newData);
  }

  editData(newData: any) {
    if(newData.module === 'users') {
      this.router.navigateByUrl('/users/form');
    }
    this.dataEditSubject.next(newData);
  }

  deleteData =  async (newData: any) => {
    console.log('deleteData', newData);
       let result = false
       result = await SwalertConfirmDelete();
       if(result===true)
         //deleteData()
        if(newData.module === 'users') {
          this.usersService.deleteUser(newData.id)
          .then(
            () => {
              SwalertOkDialog('User deleted successfully');
              this.getAll(newData);
              }).catch(error => console.log(error));
        };  
   };

  /**
   * Retrieves all data based on the provided newData object.
   * If the module in newData is 'users', it fetches all users and updates their module property.
   * @param newData - The object containing the module information.
   */
   getAll(newData: any): void {
    if(newData.module === 'users') {
      this.usersService.getAllUsers()
      .then(usersRoles => {
        this.usersRoles.forEach(userRole => {
          userRole.module = newData.module;
        });
        this.updateData(usersRoles);
      } )
      .catch(error => console.log(error));
    }

   
  }

}
