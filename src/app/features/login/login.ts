import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from './models/login-form.model';
import { EMAIL_PATTERN } from '../../core/patterns/email-pattern';
import { PASSWORD_PATTERN } from '../../core/patterns/password-pattern';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule, MatIcon],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  public isPasswordHidden = true;

  private fb = inject(FormBuilder);

  public ngOnInit(): void {
    this.createLoginForm();
  }

  public onSubmit(): void {
    return;
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
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
