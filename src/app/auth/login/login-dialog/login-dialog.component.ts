import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-dialog.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) { }

  async handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    this.error = '';
    this.isLoading = true;
    setTimeout(() => {
      const success = this.auth.login(this.email, this.password);
      this.isLoading = false;
      if (success) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.error = 'Credenciales incorrectas. Intenta admin@gymlaroca.com / admin123';
      }
    }, 500);
  }
}
