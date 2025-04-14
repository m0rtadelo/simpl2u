export class ThemeService {
  static #_theme = '';
  static {
    this.theme = localStorage.getItem('theme') || this.#getPreferredTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const systemTheme = e.matches ? 'dark' : 'light';
      ThemeService.theme = systemTheme;
    });
  }

  /**
   * Set the theme (dark or light)
   */
  static set theme(mode) {
    document.documentElement.setAttribute('data-bs-theme', mode);
    localStorage.setItem('theme', mode);
    ThemeService.#_theme = mode;
  }

  /**
   * Get the actual theme (dark or light)
   */
  static get theme() {
    return ThemeService.#_theme;
  }

  static #getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  static switchTheme() {
    ThemeService.theme = (ThemeService.theme === 'dark' ? 'light' : 'dark');
  }
}
