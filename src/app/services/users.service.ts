import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { User } from '../models/user.model';
import { UrlApi, httpOptions} from '../utils/utils';
import { UserRoles } from '../models/userroles';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl: string = UrlApi();
  user!: User[];
  userRoles!: UserRoles[];
  constructor(private httpClient: HttpClient) {
    this.user = [];  
   }
   //update another component
    private dataSubject = new BehaviorSubject<any>(null);
    private dataEditSubject = new BehaviorSubject<any>(null);
    data$ = this.dataSubject.asObservable();
    dataEdit$ = this.dataEditSubject.asObservable();

    /*
    updateData(newData: any) {
      //console.log(newData);
      this.dataSubject.next(newData);
    }

    editData(newData: any) {
      console.log('editData', newData);
      this.dataEditSubject.next(newData);
    }

    deleteData(newData: any) {
      console.log('deleteData', newData);
      //this.dataSubject.next(newData);
    }
    */

  getAllUsers(): Promise<any> {
    return this.httpClient.get<UserRoles[]>(`${this.baseUrl}User`, httpOptions).toPromise();
  }

  getUserById(id: number): Promise<any> {
    return this.httpClient.get<UserRoles>(`${this.baseUrl}User/${id}`, httpOptions).toPromise();
  }

  createUser(user: User): Promise<any> {
    return this.httpClient.post<User>(`${this.baseUrl}User`, user, httpOptions).toPromise();
  }

  updateUser(user: User): Promise<any> {
    return this.httpClient.put<User>(`${this.baseUrl}User/${user.id}`, user, httpOptions).toPromise();
  }

  deleteUser(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}User/${id}`, httpOptions).toPromise();
  }
}
