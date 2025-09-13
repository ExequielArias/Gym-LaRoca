import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrarAsistenciaDialogComponent } from './registrar-asistencia-dialog.component';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule, RegistrarAsistenciaDialogComponent],
  templateUrl: './asistencias.component.html',
  styleUrl: './asistencias.component.css'
})
export class AsistenciasComponent {
  attendances = [
    { client: 'Juan Pérez', entryTime: '2024-01-15T08:30', exitTime: '2024-01-15T10:15', duration: '1h 45m', status: 'Activo', date: '2024-01-15' },
    { client: 'María García', entryTime: '2024-01-14T09:00', exitTime: '2024-01-14T11:30', duration: '2h 30m', status: 'Activo', date: '2024-01-14' },
    { client: 'Carlos López', entryTime: '2024-01-16T10:15', exitTime: '2024-01-16T12:00', duration: '1h 45m', status: 'Activo', date: '2024-01-16' },
    { client: 'Ana Martínez', entryTime: '2024-01-13T14:00', exitTime: '2024-01-13T15:30', duration: '1h 30m', status: 'Activo', date: '2024-01-13' },
    { client: 'Luis Rodríguez', entryTime: '2024-01-12T16:00', exitTime: '2024-01-12T17:45', duration: '1h 45m', status: 'Activo', date: '2024-01-12' },
    { client: 'Sofia Herrera', entryTime: '2024-01-16T18:30', exitTime: '2024-01-16T20:00', duration: '1h 30m', status: 'Activo', date: '2024-01-16' }
  ];

  selectedDate: string = '';
  filteredAttendances = [...this.attendances];

  filterAttendances() {
    if (!this.selectedDate) {
      this.filteredAttendances = [...this.attendances];
    } else {
      this.filteredAttendances = this.attendances.filter(a => a.date === this.selectedDate);
    }
  }

  constructor(private dialog: MatDialog) {}

  openRegisterAttendanceDialog() {
    const dialogRef = this.dialog.open(RegistrarAsistenciaDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result: { cliente: string; entrada: string } | undefined) => {
      if (result) {
        this.attendances.push({
          client: result.cliente,
          entryTime: result.entrada,
          exitTime: '',
          duration: '',
          status: 'Activo',
          date: new Date().toISOString().split('T')[0]
        });
        this.filterAttendances();
      }
    });
  }

  registerExit(attendance: any) {
    alert('Registrar retiro para: ' + attendance.client);
    // Aquí podrías actualizar la hora de salida y duración
  }
}
