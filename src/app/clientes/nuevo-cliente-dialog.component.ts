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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-bold text-gray-900">Inscripción de Nuevo Cliente</h2>
    <div mat-dialog-content class="p-6 bg-white rounded-lg shadow-sm">
      <p class="text-sm text-gray-500 mb-6">Complete todos los campos para registrar un nuevo socio del gimnasio</p>

      <!-- Datos Personales -->
      <div class="space-y-4 mb-6">
        <h3 class="font-semibold text-gray-900">Datos Personales</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre/s *</label>
            <input
              type="text"
              id="name"
              [(ngModel)]="client.name"
              name="name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Ej: Juan Carlos"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Apellido/s *</label>
            <input
              type="text"
              id="lastName"
              [(ngModel)]="client.lastName"
              name="lastName"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Ej: González Pérez"
            />
          </div>
          <div>
            <label for="dni" class="block text-sm font-medium text-gray-700 mb-1">DNI *</label>
            <input
              type="text"
              id="dni"
              [(ngModel)]="client.dni"
              name="dni"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Ej: 12345678"
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
            <input
              type="text"
              id="phone"
              [(ngModel)]="client.phone"
              name="phone"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="Ej: 351-123-4567"
            />
          </div>
        </div>
      </div>

      <!-- Tipo de Membresía -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-900">Tipo de Membresía</h3>
        <p class="text-sm text-gray-500 mb-2">Seleccionar Plan *</p>
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Eligir tipo de membresía</mat-label>
          <mat-select [(value)]="client.membership" required>
            <mat-option value="Básica">Básica</mat-option>
            <mat-option value="Premium">Premium</mat-option>
            <mat-option value="VIP">VIP</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Método de Pago -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-900">Método de Pago</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <button
            (click)="paymentMethod = 'efectivo'"
            [class]="paymentMethod === 'efectivo' ? 'border-2 border-green-500 bg-green-50' : 'border border-gray-300'"
            class="p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500 mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              <path d="M10 6a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span class="font-medium">Efectivo</span>
            <span class="text-xs text-gray-500">Pago en caja</span>
          </button>

          <button
            (click)="paymentMethod = 'transferencia'"
            [class]="paymentMethod === 'transferencia' ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-300'"
            class="p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Transferencia</span>
            <span class="text-xs text-gray-500">Banco/Mercado Pago</span>
          </button>

          <button
            (click)="paymentMethod = 'debito'"
            [class]="paymentMethod === 'debito' ? 'border-2 border-purple-500 bg-purple-50' : 'border border-gray-300'"
            class="p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-500 mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm1 3h10v2H5V9zm0 4h10v2H5v-2z" />
            </svg>
            <span class="font-medium">Tarjeta Débito</span>
            <span class="text-xs text-gray-500">Visa/Mastercard</span>
          </button>
        </div>
      </div>

      <!-- Datos para Transferencia -->
      <div *ngIf="paymentMethod === 'transferencia'" class="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 class="font-medium text-blue-800 mb-2">Datos para Transferencia:</h4>
        <div class="text-sm text-blue-700 space-y-1">
          <p><strong>CBU:</strong> 000003100010000000001</p>
          <p><strong>Alias:</strong> GIMNASIO.CORDOBA</p>
          <p><strong>Titular:</strong> Gimnasio Córdoba S.R.L.</p>
        </div>
      </div>

      <!-- Botón Registrar -->
      <div class="flex justify-center">
        <button
          (click)="saveClient()"
          class="px-6 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors w-full"
        >
          Registrar Inscripción
        </button>
      </div>

      <!-- Aviso -->
      <div class="mt-4 text-center text-xs text-gray-500">
        Al registrarse, el cliente acepta los términos y condiciones del gimnasio.<br>
        Los campos marcados con (*) son obligatorios.
      </div>
    </div>
  `,
  styles: []
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
    // Validar que todos los campos estén llenos
    if (!this.client.name || !this.client.lastName || !this.client.dni || !this.client.phone) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Aquí puedes agregar lógica adicional antes de cerrar
    this.dialogRef.close(this.client);
  }
}