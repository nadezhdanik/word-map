import { effect, Injectable, signal } from '@angular/core';
import { THEME } from '../../models/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  public theme = signal<THEME.light | THEME.dark>(THEME.light);

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && (savedTheme === THEME.light || savedTheme === THEME.dark)) {
      this.theme.set(savedTheme);
    }

    effect(() => {
      localStorage.setItem('theme', this.theme());
      document.body.className = this.theme();
    });
  }

  public toggleTheme(): void {
    this.theme.update(currentTheme => (currentTheme === THEME.light ? THEME.dark : THEME.light));
  }

}
