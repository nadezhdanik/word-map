import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Theme } from '../../core/services/theme/theme';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  public themeService = inject(Theme);
  public authService = inject(Auth);

  private router = inject(Router);

  public async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['/home']);
    } catch {
      return
    }
  }
}
