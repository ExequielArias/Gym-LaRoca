import { Component, computed, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, User } from './auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
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
