import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getSession, IsLoged } from '../utils/utils';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit  {
  [x: string]: any;
  
  isLogin: boolean | undefined // Two possible types: boolean or unfined
  userName: any;

  constructor(private router: Router) {
    this.userName = "";
   }
  

  ngOnInit(): void {
    this.isLogin = IsLoged();
      if(!this.isLogin) {  
        this.router.navigateByUrl('/login');
      }
      else
        this.userName = getSession();
    }
}
