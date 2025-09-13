import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nuevo-cliente-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Nuevo Cliente</h2>
    <div mat-dialog-content>
      <form #form="ngForm">
        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="nombre" name="nombre" required>
        </mat-form-field>
        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="email" name="email" required type="email">
        </mat-form-field>
        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Teléfono</mat-label>
          <input matInput [(ngModel)]="telefono" name="telefono" required>
        </mat-form-field>
        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Membresía</mat-label>
          <input matInput [(ngModel)]="membresia" name="membresia" required>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="onSave()" [disabled]="!nombre || !email || !telefono || !membresia">Guardar</button>
    </div>
  `
})
export class NuevoClienteDialogComponent {
  nombre = '';
  email = '';
  telefono = '';
  membresia = '';

  constructor(private dialogRef: MatDialogRef<NuevoClienteDialogComponent>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close({ nombre: this.nombre, email: this.email, telefono: this.telefono, membresia: this.membresia });
  }
}
