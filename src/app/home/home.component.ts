import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login-dialog/login-dialog.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatDialogModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Estado del modo oscuro
  isDarkMode = false;

  constructor(private dialog: MatDialog) { }

  benefits = [
    { title: 'Más de 100 equipos', text: 'Máquinas de última generación para todos los niveles.' },
    { title: 'Clases grupales', text: 'Yoga, spinning, zumba y más para mantenerte motivado.' },
    { title: 'Suplementos', text: 'Barra de batidos y productos nutricionales profesionales.' },
    { title: 'Comodidades', text: 'Duchas, lockers y toallas gratuitas para tu comodidad.' },
    { title: 'Horarios flexibles', text: 'Acceso 24/7 para adaptarse a tu rutina.' }
  ];

  stats = [
    { label: 'Miembros Activos', value: '500+' },
    { label: 'Entrenadores Certificados', value: '15' },
    { label: 'Acceso al Gimnasio', value: '24/7' },
    { label: 'Años de Experiencia', value: '5' }
  ];

  trainers = [
    { name: 'Carlos Mendoza', specialty: 'Entrenamiento de Fuerza', image: 'assets/fotos/entrenador1.jpg' },
    { name: 'Ana García', specialty: 'Fitness Funcional', image: 'assets/fotos/entrenadora1.jpg' },
    { name: 'Miguel Torres', specialty: 'Rehabilitación Deportiva', image: 'assets/fotos/entrenador2.jpg' }
  ];

  products = [
    { name: 'Proteína Whey', description: 'Proteína de suero de leche, sabor chocolate', image: 'assets/fotos/proteina.png' },
    { name: 'Creatina Monohidrato', description: 'Creatina pura para aumentar fuerza y masa muscular', image: 'assets/fotos/creatina.png' },
    { name: 'Camiseta Gym LaRoca', description: 'Remera de poliéster, tecnología dry-fit', image: 'assets/fotos/remera.png' },
    { name: 'Shaker Premium', description: 'Botella mezcladora de 750ml', image: 'assets/fotos/shaker.png' }
  ];

  // Alternar modo oscuro
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const html = document.documentElement;
    if (this.isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    // ✅ Maneja lo que sucede cuando se cierra el diálogo
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo de login cerrado', result);

      // Si el login fue exitoso, el componente LoginComponent ya debería navegar
      // o el guard ya debería estar activo. No necesitas navegar aquí.
      // Si result es undefined, significa que se cerró sin hacer login
    });
  }
}
