import { HttpClient } from '@angular/common/http';
import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { Login } from  '../models/login.model';
import { UrlApi} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
baseUrl: string = UrlApi();
user: Login = new Login('','',0,'',0,'','',  '', new Date()) ;
  constructor(private httpClient: HttpClient) {
    
    console.log(this.baseUrl);
    if(isDevMode()){
      enableProdMode();
    }
   }
   login(user: any): Promise<any[]>{
    console.log(this.baseUrl + 'login');
    const bodyRequest = user;
    return this.httpClient.post<any>(this.baseUrl + 'login', bodyRequest).toPromise();
   } 
}
