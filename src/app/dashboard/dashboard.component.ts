import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  links = [
    {
      label: 'Dashboard',
      link: 'overview',
      icon: 'dashboard',
    },
    {
      label: 'Products',
      link: 'products',
      icon: 'local_mall',
    },
    {
      label: 'Orders',
      link: 'orders',
      icon: 'shopping_basket',
    },
    {
      label: 'Customers',
      link: 'customers',
      icon: 'group',
    },
    {
      label: 'Reviews',
      link: 'reviews',
      icon: 'star',
    },
    {
      label: 'Settings',
      link: 'settings',
      icon: 'settings',
    },
  ];

  isMenuCollapsed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  logout() {
    this.authService.cleanAuthData().subscribe((resp) => {
      if (resp) {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
