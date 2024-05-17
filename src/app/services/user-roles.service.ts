import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Roles } from '../models/roles.model';
import { UrlApi, httpOptions} from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  public baseUrl: string = UrlApi();
  roles!: Roles[];

  constructor(private httpClient: HttpClient) { 
    this.roles = [];
  }

  getAllRoles(): Promise<any> {
    return this.httpClient.get<Roles[]>(`${this.baseUrl}/Rol`, httpOptions).toPromise();
  }

  getRoleById(id: number): Promise<any> {
    return this.httpClient.get<Roles>(`${this.baseUrl}/Rol/${id}`, httpOptions).toPromise();
  }
  createRole(role: Roles): Promise<any> {
    return this.httpClient.post<Roles>(`${this.baseUrl}/Rol`, role, httpOptions).toPromise();
  }
  updateRole(role: Roles): Promise<any> {
    return this.httpClient.put<Roles>(`${this.baseUrl}/Rol/${role.id}`, role, httpOptions).toPromise();
  }
  deleteRole(id: number): Promise<any> {
    return this.httpClient.delete<Roles>(`${this.baseUrl}/Rol/${id}`, httpOptions).toPromise();
  }
}
