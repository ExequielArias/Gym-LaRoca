import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);

  user$ = {
    get: () => this._user(),
  };

  constructor(private router: Router) {
    // intentar cargar usuario desde localStorage
    const raw = localStorage.getItem('auth_user');
    if (raw) {
      try { this._user.set(JSON.parse(raw)); } catch { }
    }
  }

  login(email: string, password: string) {
    // Mock: aceptamos admin@gymlaroca.com / admin123
    if ((email === 'admin@gymlaroca.com' && password === 'admin123') ||
      (email === 'staff@gymlaroca.com' && password === 'staff123')) {
      const user: User = {
        name: email === 'admin@gymlaroca.com' ? 'Administrador' : 'Staff',
        email,
        role: email === 'admin@gymlaroca.com' ? 'admin' : 'staff'
      };
      this._user.set(user);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('auth_user');
    this.router.navigateByUrl('/');
  }

  getCurrentUser(): User | null {
    return this._user();
  }

  isAuthenticated(): boolean {
    return !!this._user();
  }
}
