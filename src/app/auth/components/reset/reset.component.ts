import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  formGroup!: FormGroup;
  showPassword: boolean = false;
  showConirmPassword: boolean = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((route) => {
      // console.log(route['token']);
      this.token = route['token'];
    });
  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }
  reset() {
    if (this.formGroup.valid) {
      const newPassword = this.formGroup.value.newPassword;
      const confirmNewPassword = this.formGroup.value.confirmNewPassword;

      if (newPassword !== confirmNewPassword) {
        console.error('Les mots de passe ne correspondent pas.');
        return;
      }
      const payload = {
        token: this.token,
        newPassword: newPassword,
      };

      this.authService.resetPassword(payload).subscribe(
        (res) => {
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('Reset failed', error);
        }
      );
      // this.router.navigateByUrl('/dashboard');
    }
  }

  //   {
  //   "token": "abc123xyz456",
  //   "newPassword": "newSecurePassword123"
  // }
}
