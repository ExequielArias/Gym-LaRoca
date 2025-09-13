import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  galleryImages = [
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', alt: 'Máquinas de entrenamiento' },
    { src: 'https://images.unsplash.com/photo-1598228723793-52713b984737?auto=format&fit=crop&w=800&q=80', alt: 'Clase de spinning' },
    { src: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80', alt: 'Entrenamiento personal' }
  ];

  benefits = [
    { icon: '💪', text: 'Más de 100 equipos de entrenamiento' },
    { icon: '👥', text: 'Clases grupales: yoga, spinning, zumba' },
    { icon: '🧃', text: 'Barra de batidos y suplementos' },
    { icon: '🛡️', text: 'Duchas, lockers y toallas gratuitas' },
    { icon: '⏰', text: 'Horario ampliado: 5 AM - 11 PM' }
  ];

  stats = [
    { label: 'Miembros Activos', value: '500+' },
    { label: 'Entrenadores Certificados', value: '15' },
    { label: 'Acceso al Gimnasio', value: '24/7' },
    { label: 'Años de Experiencia', value: '5' }
  ];

  trainers = [
    { name: 'Carlos Mendoza', specialty: 'Entrenamiento de Fuerza' },
    { name: 'Ana García', specialty: 'Fitness Funcional' },
    { name: 'Miguel Torres', specialty: 'Rehabilitación Deportiva' }
  ];

  products = [
    { name: 'Proteína Whey', price: '$45.000' },
    { name: 'Creatina Monohidrato', price: '$25.000' },
    { name: 'Camiseta Gym LaRoca', price: '$18.000' },
    { name: 'Shaker Premium', price: '$12.000' }
  ];
}
