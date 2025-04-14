export class ThemeService {
  static #_theme = '';
  static {
    this.theme = localStorage.getItem('theme') || this.#getPreferredTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const systemTheme = e.matches ? 'dark' : 'light';
      this.theme = systemTheme;
    });
  }

  /**
   * Set the theme (dark or light)
   */
  static set theme(mode) {
    document.documentElement.setAttribute('data-bs-theme', mode);
    localStorage.setItem('theme', mode);
    this.#_theme = mode;
  }

  /**
   * Get the actual theme (dark or light)
   */
  static get theme() {
    return this.#_theme;
  }

  static #getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

}