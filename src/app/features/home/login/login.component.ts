import { Component, ChangeDetectionStrategy, OnInit, inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../@core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm.valid) {

      console.log('Login form submitted:', this.loginForm.value);
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
      // Handle login logic here
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Form is invalid');
    }
  }
}