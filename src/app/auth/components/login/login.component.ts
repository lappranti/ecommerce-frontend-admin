import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // private snackBarService: SnackBarService
  ) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      // username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    console.log(this.authService.getToken());
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  login() {
    if (this.formGroup.valid) {
      this.authService.loginUser(this.formGroup.value).subscribe(
        (res) => {
          console.log('Login successful', res);
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
