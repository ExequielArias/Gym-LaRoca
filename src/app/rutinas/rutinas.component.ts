import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule],
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent {
  activeTab = 'search'; // search, evaluation, routine, preview

  constructor() { }

  // Simulación de funciones
  generateRoutine() {
    this.activeTab = 'routine';
  }

  openPreview() {
    this.activeTab = 'preview';
  }

  printRoutine() {
    const content = document.querySelector('.preview-content')?.innerHTML;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Rutina de Entrenamiento</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow?.print();
  }

  sendToWhatsApp() {
    const message = encodeURIComponent(
      `GIMNASIO CÓRDOBA\n\nRUTINA PERSONALIZADA\n\nCliente: Juan Carlos González\nDNI: 12345678\nFecha: 24/6/2025\nTipo: PRINCIPIANTE\nDuración por sesión: 60min\n\n==================================================\n\nLUNES - Pecho y Triceps\n----------------------\n\n✓ Press de Banca\n  Ejercicio básico para desarrollo del pecho\n  3 series | 12-15 reps | ⏎ 60-90 seg\n  Barra • Pecho\n\n✓ Press Inclinado con Mancuernas\n  Trabajo del pecho superior\n  3 series | 10-12 reps | ⏎ 60 seg\n  Mancuernas • Pecho\n\n✓ Press Francés\n  Ejercicio para tríceps\n  3 series | 12-15 reps | ⏎ 45 seg\n  Barra • Brazos`
    );
    window.open(`https://wa.me/543511234567?text=${message}`);
  }
}