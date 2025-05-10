import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  request() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.authService.requestResetPassword(this.formGroup.value).subscribe(
        (res) => {
          this.router.navigateByUrl(res.result);
        },
        (error) => {
          console.error('Request failed', error);
        }
      );
    }
  }
}
