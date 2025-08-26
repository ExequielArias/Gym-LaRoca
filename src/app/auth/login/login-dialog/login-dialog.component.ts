import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, ButtonModule, RippleModule],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  username = '';
  password = '';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) { }

  login() {
    if (this.username && this.password) {
      const success = this.authService.login(this.username, this.password);
      if (success) {
        this.ref.close(true);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  }
}
