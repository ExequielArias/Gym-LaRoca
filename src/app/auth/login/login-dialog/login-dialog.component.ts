// login-dialog.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// --- Importa Router ---
import { Router } from '@angular/router';
// ----------------------
import { AuthService } from '../../auth.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  // ✅ Inyecta Router y MatDialogRef
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router, // Inyecta Router aquí
    private authService: AuthService // Asumiendo que usas un servicio de autenticación
  ) { }

  async onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Por favor ingrese email y contraseña.';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      // ✅ Llama a tu servicio de autenticación
      const success = await this.authService.login(this.email, this.password);
      this.isLoading = false;

      if (success) {
        console.log('Login exitoso');
        this.dialogRef.close(); // Cierra el diálogo
        // ✅ Navega a /dashboard
        this.router.navigateByUrl('/dashboard');
      } else {
        this.error = 'Credenciales incorrectas. Intente: admin@gymlaroca.com / admin123';
      }
    } catch (err) {
      this.isLoading = false;
      this.error = 'Error de conexión. Intente nuevamente.';
      console.error(err);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}