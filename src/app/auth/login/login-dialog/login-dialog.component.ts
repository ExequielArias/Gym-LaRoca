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
      const result = await this.authService.login(this.email, this.password);
      this.isLoading = false;

      if (result === true) {
        this.dialogRef.close();
        this.router.navigateByUrl('/dashboard');
      } else if (typeof result === 'string') {
        // Personaliza los mensajes de error de Supabase
        if (result.toLowerCase().includes('invalid login credentials')) {
          this.error = 'Usuario o contraseña incorrectos.';
        } else if (result.toLowerCase().includes('user not found')) {
          this.error = 'El usuario no existe.';
        } else if (result.toLowerCase().includes('email not confirmed')) {
          this.error = 'Debes confirmar tu correo electrónico antes de iniciar sesión.';
        } else {
          this.error = result;
        }
      } else {
        this.error = 'Credenciales incorrectas o usuario no registrado.';
      }
    } catch (err: any) {
      this.isLoading = false;
      // Si Supabase devuelve un mensaje de error, mostrarlo
      if (err?.message) {
        this.error = err.message;
      } else {
        this.error = 'Error de conexión. Intente nuevamente.';
      }
      console.error(err);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}