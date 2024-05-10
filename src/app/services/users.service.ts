import { HttpClient, HttpClientModule } from '@angular/common/http';
import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { User } from '../models/user.model';
import { UrlApi} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = UrlApi();
  user!: User[];
  constructor(private httpClient: HttpClient) {
    this.user = [];  

   }
}
