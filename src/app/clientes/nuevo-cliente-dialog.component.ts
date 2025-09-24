import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-nuevo-cliente-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './nuevo-cliente-dialog.component.html'
})
export class NuevoClienteDialogComponent {
  client = {
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    membership: 'Básica'
  };
  paymentMethod: 'efectivo' | 'transferencia' | 'debito' = 'efectivo';

  constructor(private dialogRef: MatDialogRef<NuevoClienteDialogComponent>) { }

  saveClient() {
    if (!this.client.name || !this.client.lastName || !this.client.dni || !this.client.phone) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }
    this.dialogRef.close(this.client);
  }
}
