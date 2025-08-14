import { Injectable } from '@angular/core';
import { Theme } from '../../utilities/types';


@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private readonly STORAGE_KEY = "theme";
  private readonly DARK_CLASS = "dark"

  public initTheme(): void {
    const savedTheme = this.getSavedTheme();
    const theme = savedTheme || this.getSystemTheme();
    this.applyTheme(theme);
  }

  public toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  public getCurrentTheme(): Theme {
    return document.documentElement.classList.contains(this.DARK_CLASS)
      ? 'dark'
      : 'light';
  }

  public getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }


  private applyTheme(theme: Theme) {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add(this.DARK_CLASS);
    } else {
      html.classList.remove(this.DARK_CLASS);
    }
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  public getSavedTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  }

}
