import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevoClienteDialogComponent } from './nuevo-cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule, NuevoClienteDialogComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clients = [
    { name: 'Juan Pérez', email: 'juan@email.com', phone: '+1234567890', membership: 'Premium', lastVisit: '2024-01-15' },
    { name: 'María García', email: 'maria@email.com', phone: '+1234567891', membership: 'Básica', lastVisit: '2024-01-14' },
    { name: 'Carlos López', email: 'carlos@email.com', phone: '+1234567892', membership: 'VIP', lastVisit: '2024-01-16' },
    { name: 'Ana Martínez', email: 'ana@email.com', phone: '+1234567893', membership: 'Premium', lastVisit: '2024-01-13' },
    { name: 'Luis Rodríguez', email: 'luis@email.com', phone: '+1234567894', membership: 'Básica', lastVisit: '2024-01-12' },
    { name: 'Sofia Herrera', email: 'sofia@email.com', phone: '+1234567895', membership: 'VIP', lastVisit: '2024-01-16' }
  ];

  searchTerm: string = '';
  filteredClients = [...this.clients];

  filterClients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.phone.toLowerCase().includes(term) ||
      client.membership.toLowerCase().includes(term)
    );
  }

  constructor(private dialog: MatDialog) { }

  openNewClientDialog() {
    const dialogRef = this.dialog.open(NuevoClienteDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.clients.push({
          name: `${result.name} ${result.lastName}`,
          email: '', // Puedes agregarlo si lo necesitas
          phone: result.phone,
          membership: result.membership,
          lastVisit: new Date().toISOString().split('T')[0]
        });
        this.filterClients();
      }
    });
  }

  editClient(client: any) {
    alert('Editar cliente: ' + client.name);
  }

  viewRoutine(client: any) {
    alert('Ver rutina de: ' + client.name);
  }
}
