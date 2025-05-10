import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../utils/utils.module';
import { DropdownModule } from '../../directives/dropdown/dropdown.module';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UtilsModule, DropdownModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navList = [
    {
      icon: './assets/img/icon-user-dark.svg',
      label: 'Profile settings',
      link: '/dashboard/profile-settings',
    },
    {
      icon: './assets/img/icon-projects.svg',
      label: 'Projects settings',
      link: '/dashboard/projects-settings',
    },
    {
      icon: './assets/img/icon-porfolio.svg',
      label: 'My Portfolio',
      link: '/dashboard/portfolio',
    },
  ];

  currentUser!: User;

  constructor(private router: Router, private authService: AuthService) {
    authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    localStorage.clear();
    this.authService.cleanAuthData().subscribe((resp) => {
      this.router.navigate(['/']);
    });
  }
}
