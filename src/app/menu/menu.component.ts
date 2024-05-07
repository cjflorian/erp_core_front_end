import { Component, OnInit  } from '@angular/core';
import { IsLoged, getSession } from '../utils/utils';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  userName: any;
  isLogin: boolean | undefined // Two possible types: boolean or unfined

  constructor(private router: Router) { 
    this.userName = "";
    this.isLogin = IsLoged();
      
  }

  
  ngOnInit(): void {
    if(!this.isLogin) {  
      this.router.navigateByUrl('/login');
    }
    else
      this.userName = getSession();
  }

  ngClickRoute(any: any){
    this.router.navigateByUrl(any);
  }
}
