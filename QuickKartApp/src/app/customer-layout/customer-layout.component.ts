import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {
  userRole: string;

  constructor(private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
  }

  logout() {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('email');
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

}
