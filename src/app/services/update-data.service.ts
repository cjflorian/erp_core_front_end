import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private router: Router) { }
  private dataSubject = new BehaviorSubject<any>(null);
  private dataEditSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  dataEdit$ = this.dataEditSubject.asObservable();
  module: string = '';

  updateData(newData: any, componentData: string): void {
    //console.log(newData);
    this.module = componentData;
    this.dataSubject.next(newData);
  }

  editData(newData: any , componentData: string) {
    //console.log('editData', newData);
    console.log(componentData);
    if(componentData === 'users') {
      this.router.navigateByUrl('/users/form');
    }
    this.dataEditSubject.next(newData);
  }

  deleteData(newData: any) {
    console.log('deleteData', newData);
    //this.dataSubject.next(newData);
  }
}
