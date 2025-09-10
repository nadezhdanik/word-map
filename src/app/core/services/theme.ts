import { effect, Injectable, signal } from '@angular/core';
import { THEME } from '../models/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  public _theme = signal<THEME.light | THEME.dark>(THEME.light);

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && (savedTheme === THEME.light || savedTheme === THEME.dark)) {
      this._theme.set(savedTheme);
    }

    effect(() => {
      localStorage.setItem('theme', this._theme());
      document.body.className = this._theme();
    });
  }

  public toggleTheme(): void {
    this._theme.update(currentTheme => (currentTheme === THEME.light ? THEME.dark : THEME.light));
  }

}
