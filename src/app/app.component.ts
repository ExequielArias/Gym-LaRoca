import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService, User } from '../app/auth/auth.service';
import { LoginDialogComponent } from '../app/auth/login/login-dialog/login-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicDialogModule, ButtonModule, RippleModule],
  providers: [DialogService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Para el header
  currentUser = signal<User | null>(null);
  isLogged = computed(() => !!this.currentUser());

  constructor(private dialog: DialogService, private auth: AuthService, private router: Router) {
    this.currentUser.set(this.auth.getCurrentUser());
  }

  openLogin() {
    const ref = this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }
}
