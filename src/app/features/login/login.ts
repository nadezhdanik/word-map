import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from './models/login-form.model';
import { EMAIL_PATTERN } from '../../core/patterns/email-pattern';
import { PASSWORD_PATTERN } from '../../core/patterns/password-pattern';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Auth } from '../../core/services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  public isPasswordHidden = true;
  public errorMessage = '';

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.createLoginForm();
  }

  public async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    try {
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
        this.cdr.markForCheck();
      }
    }
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      await this.authService.googleSignIn();
      await this.router.navigate(['/home']);
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message;
      }
    }
  }

  private createLoginForm(): void {
    this.loginForm = this.fb.nonNullable.group<LoginForm>({
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN),
      ]),
    });
  }
}
