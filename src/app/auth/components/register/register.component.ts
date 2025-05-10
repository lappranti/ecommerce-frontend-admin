import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // checkbox: ['', [Validators.required]],
    });
  }

  register() {
    if (this.formGroup.valid) {
      // delete this.formGroup.value.checkbox;
      // console.log(this.formGroup.value);

      this.authService.registerUser(this.formGroup.value).subscribe(
        (res) => {
          // console.log('Login successful', res);
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
