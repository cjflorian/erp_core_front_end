import { Component, enableProdMode, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Logout } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      // Code to be executed after a delay of 1000 milliseconds (1 second)
      Logout();
    }, 1000);
    this.router.navigateByUrl('/login');
  }

}
