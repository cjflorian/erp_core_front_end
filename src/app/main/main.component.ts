import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit  {
  [x: string]: any;
  
  isLogin: boolean = false; // hidden by default
  userName: any;

  constructor(private router: Router) {
    this.userName = "";
   }
  

  ngOnInit(): void {
    
    let session:any  = localStorage.getItem('user');
    console.log(session);
    let usuario = JSON.parse(session);
    let email = usuario["email"];
    
    this.userName = email;
      if(session!==null)
      {
        this.isLogin==true 
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      }    
    }
}
