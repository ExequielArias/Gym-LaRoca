import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, ButtonModule, RippleModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  galleryImages = [
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', alt: 'Máquinas de entrenamiento' },
    { src: 'https://images.unsplash.com/photo-1598228723793-52713b984737?auto=format&fit=crop&w=800&q=80', alt: 'Clase de spinning' },
    { src: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80', alt: 'Entrenamiento personal' }
  ];

  benefits = [
    { icon: 'pi pi-dumbbell text-yellow-500', text: 'Más de 100 equipos de entrenamiento' },
    { icon: 'pi pi-users text-green-500', text: 'Clases grupales: yoga, spinning, zumba' },
    { icon: 'pi pi-shopping-cart text-blue-500', text: 'Barra de batidos y suplementos' },
    { icon: 'pi pi-shield text-purple-500', text: 'Duchas, lockers y toallas gratuitas' },
    { icon: 'pi pi-clock text-orange-500', text: 'Horario ampliado: 5 AM - 11 PM' }
  ];
}
