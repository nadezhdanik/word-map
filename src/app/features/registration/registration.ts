import { ChangeDetectorRef, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationForm } from './models/registration-form.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Auth } from '../../core/services/auth';
import { EMAIL_PATTERN } from '../../core/patterns/email-pattern';
import { PASSWORD_PATTERN } from '../../core/patterns/password-pattern';
import { FirebaseError } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Registration implements OnInit {
  public registrationForm!: FormGroup<RegistrationForm>
  public isPasswordHidden = true;
  public errorMessage: string | null = null;
  public isLoading = false;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private cd = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  public ngOnInit(): void {
    this.createRegistrationForm()
  }

  public async onSubmit(): Promise<void>{
    if (this.registrationForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password } = this.registrationForm.getRawValue();

    try {
      await this.authService.register(email, password);
      await this.router.navigate(['/home']);
      this.snackBar.open(`✅ Registration successful.`, 'Close', {duration: 3000});
    } catch(error: unknown) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message || 'Error Registration';
        this.snackBar.open(`❌ Error Registration: ${error.message}`, 'Close', {duration: 3000});
      } else {
        this.errorMessage = 'Error Registration'
        this.snackBar.open(`❌ Error Registration.`, 'Close', {duration: 3000});
      }
    } finally {
      this.isLoading = false;
      this.cd.markForCheck();
    }
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.fb.nonNullable.group<RegistrationForm>({
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN),
      ])
    })
  }
}
