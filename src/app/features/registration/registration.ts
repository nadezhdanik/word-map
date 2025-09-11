import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationForm } from './models/registration-form.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
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
    } catch {
      this.errorMessage = 'Error Registration';
    } finally {
      this.isLoading = false;
    }
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.fb.nonNullable.group<RegistrationForm>({
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }
}
