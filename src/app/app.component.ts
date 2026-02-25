import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
/**
 * AppComponent - The root of the app
 *
 * This component serves as the main layout wrapper and controls
 * global UI elements such as the navigation bar and logout behavior.
 * @remarks
 * - Listens to Angular Router navigation events
 * - Dynamically hides the navbar on the welcome page
 * - Handles global logout functionality
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Controls visibility of the navigation bar.
   * The navbar is hidden when the current route includes 'welcome'
   * and shown on all other routes.
   */
  showNavbar = true;

  /**
   * Creates an instance of AppComponent.
   *
   * Subscribes to Angular Router navigation events in order to
   * dynamically update navbar visibility based on the current route.
   *
   * @param router - Angular Router service used for navigation and route event tracking
   */
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      /**
       * Only act on completed navigation events.
       * NavigationEnd ensures the URL is finalized after redirects.
       */

      if (event instanceof NavigationEnd) {
        /**
         * Hide navbar on the welcome page.
         * The navbar is shown on all other routes.
         */
        this.showNavbar = !event.urlAfterRedirects.includes('welcome');
      }
    });

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['welcome']);
    }
  }

  title = 'myFlix-Angular-client';

  /**
   * Logs the user out of the application.
   * Clears all data stored in localStorage and redirects
   * the user to the welcome page.
   * @returns void
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
