import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { User } from '../models/user.model';
import { UrlApi, httpOptions} from '../utils/utils';
import { UserRoles } from '../models/userroles';


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

  getAllUsers(): Promise<any> {
    return this.httpClient.get<UserRoles[]>(`${this.baseUrl}User`, httpOptions).toPromise();
  }

  getUserById(id: number): Promise<any> {
    return this.httpClient.get<UserRoles>(`${this.baseUrl}User/${id}`, httpOptions).toPromise();
  }

  createUser(user: User): Promise<any> {
    console.log('user', user);
    return this.httpClient.post<User>(`${this.baseUrl}User`, user, httpOptions).toPromise();
  }

  updateUser(user: User): Promise<any> {
    return this.httpClient.put<User>(`${this.baseUrl}User/${user.id}`, user, httpOptions).toPromise();
  }

  deleteUser(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}User/${id}`, httpOptions).toPromise();
  }
}
