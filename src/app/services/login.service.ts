import { HttpClient, HttpClientModule } from '@angular/common/http';
import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { Login } from  '../models/login.model';
import { UrlApi} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = UrlApi();
  user!: Login[];
  constructor(private httpClient: HttpClient) {
    this.user = [];
   }
   login(user: any): Promise<any[]>{
    console.log(this.baseUrl + 'login');
    const bodyRequest = user;
    console.log(bodyRequest);
    return this.httpClient.post<any>(this.baseUrl + 'login', bodyRequest).toPromise();
   } 
}
