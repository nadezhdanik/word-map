import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  public authService = inject(Auth);

  public isVerifyEmail = computed(() => this.authService.user()?.emailVerified ?? false);
  private snackBar = inject(MatSnackBar);
  private readonly SNACKBAR_CONFIG = {
    duration: 3000,
    verticalPosition: 'top' as const,
    horizontalPosition: 'center' as const,
  };
  private router = inject(Router);

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public async verifyEmail(): Promise<void> {
    try {
      await this.authService.verifyEmail();
      this.snackBar.open(`✅ Verification email sent!`, 'Close', this.SNACKBAR_CONFIG);
    } catch {
      this.snackBar.open(`❌ Error Verification email sent!`, 'Close', this.SNACKBAR_CONFIG);
    }
  }

  public async changePassword(): Promise<void> {
    const email = this.authService.user()?.email;
    if (!email) {
      this.snackBar.open(`❌ No email found for this user.`, 'Close', this.SNACKBAR_CONFIG);
      return;
    }
    if (!this.authService.user()?.emailVerified) {
      this.snackBar.open(`❌ Please verify your email first.`, 'Close', this.SNACKBAR_CONFIG);
      return;
    }

    try {
      await this.authService.resetPassword(email);
      this.snackBar.open(
        `✅ Password reset link sent to your email.`,
        'Close',
        this.SNACKBAR_CONFIG,
      );
    } catch {
      this.snackBar.open(`❌ Error password reset!`, 'Close', this.SNACKBAR_CONFIG);
    }
  }
}
