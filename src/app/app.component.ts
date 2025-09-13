import { Component, computed, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, User } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser = signal<User | null>(null);
  isLogged = computed(() => !!this.currentUser());

  constructor(private auth: AuthService) {
    this.currentUser.set(this.auth.getCurrentUser());

    effect(() => {
      this.currentUser.set(this.auth.getCurrentUser());
    });
  }

  openLogin() {
    location.href = '/login';
  }
}
