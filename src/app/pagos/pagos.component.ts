import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevoPagoDialogComponent } from './nuevo-pago-dialog.component';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule, NuevoPagoDialogComponent],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
  selectedStatus: string = '';

  recentPayments = [
    { client: 'Juan Pérez', amount: '$50.00', date: '2024-01-15', method: 'Efectivo', detail: 'Membresía Premium, Producto X' },
    { client: 'María García', amount: '$75.00', date: '2024-01-14', method: 'Tarjeta', detail: 'Membresía Básica, Producto Y' },
    { client: 'Carlos López', amount: '$100.00', date: '2024-01-13', method: 'Transferencia', detail: 'Membresía VIP, Producto Z' }
  ];

  allPayments = [
    { client: 'Juan Pérez', concept: 'Membresía Premium', amount: '$50.00', date: '2024-01-15', method: 'Efectivo', status: 'Completado', alias: '', cbu: '', qr: '' },
    { client: 'María García', concept: 'Membresía Básica', amount: '$75.00', date: '2024-01-14', method: 'Tarjeta', status: 'Completado', alias: '', cbu: '', qr: '' },
    { client: 'Carlos López', concept: 'Membresía VIP', amount: '$100.00', date: '2024-01-13', method: 'Transferencia', status: 'Completado', alias: '', cbu: '', qr: '' },
    { client: 'Ana Martínez', concept: 'Membresía Premium', amount: '$60.00', date: '2024-01-12', method: 'Efectivo', status: 'Pendiente', alias: '', cbu: '', qr: '' },
    { client: 'Luis Rodríguez', concept: 'Membresía Básica', amount: '$45.00', date: '2024-01-11', method: 'Tarjeta', status: 'Pendiente', alias: '', cbu: '', qr: '' },
    { client: 'Sofia Herrera', concept: 'Membresía VIP', amount: '$80.00', date: '2024-01-10', method: 'Transferencia', status: 'Vencido', alias: '', cbu: '', qr: '' }
  ];

  filteredPayments = [...this.allPayments];

  filterPayments() {
    if (!this.selectedStatus) {
      this.filteredPayments = [...this.allPayments];
    } else {
      this.filteredPayments = this.allPayments.filter(p => p.status === this.selectedStatus);
    }
  }

  constructor(private dialog: MatDialog) {}

  openNewPaymentDialog() {
    const dialogRef = this.dialog.open(NuevoPagoDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result: {
      cliente: string;
      producto: string;
      monto: string;
      metodo: string;
      alias?: string;
      cbu?: string;
      qr?: string;
    } | undefined) => {
      if (result) {
        this.allPayments.push({
          client: result.cliente,
          concept: result.producto,
          amount: result.monto,
          date: new Date().toISOString().split('T')[0],
          method: result.metodo,
          status: 'Pendiente',
          alias: result.alias ?? '',
          cbu: result.cbu ?? '',
          qr: result.qr ?? ''
        });
        this.filterPayments();
      }
    });
  }
}
