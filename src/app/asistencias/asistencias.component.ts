import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule],
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {
  searchTerm = '';
  result: any = null;
  currentTime = new Date().toLocaleTimeString();
  currentDate = new Date().toLocaleDateString();

  // Datos simulados
  attendanceRecords = [
    { time: '02:12:43', client: 'Juan Carlos González', dni: '12345678', credential: 'GYM001', status: 'Permitido', notes: '' },
    { time: '02:13:34', client: 'Juan Carlos González', dni: '12345678', credential: 'GYM001', status: 'Permitido', notes: '' },
    { time: '02:14:07', client: 'María Elena Rodríguez', dni: '87654321', credential: 'GYM002', status: 'Denegado', notes: 'Membresía vencida' }
  ];

  accessLog = [
    { client: 'Juan Carlos González', credential: 'GYM001', time: '02:12:43', status: 'Permitido' },
    { client: 'Juan Carlos González', credential: 'GYM001', time: '02:13:34', status: 'Permitido' },
    { client: 'María Elena Rodríguez', credential: 'GYM002', time: '02:14:07', status: 'Denegado' }
  ];

  totalIngress = 3;
  allowedAccesses = 2;
  deniedAccesses = 1;

  verifyAccess() {
    if (!this.searchTerm) return;

    const mockClient = this.searchTerm === '12345678'
      ? { client: 'Juan Carlos González', dni: '12345678', credential: 'GYM001', membership: 'Mensual', expirationDate: '14/7/2025', status: 'permitido' }
      : this.searchTerm === '87654321'
        ? { client: 'María Elena Rodríguez', dni: '87654321', credential: 'GYM002', membership: 'Trimestral', expirationDate: '19/6/2025', status: 'denegado' }
        : null;

    if (mockClient) {
      this.result = mockClient;
      this.accessLog.unshift({
        client: mockClient.client,
        credential: mockClient.credential,
        time: new Date().toLocaleTimeString(),
        status: mockClient.status === 'permitido' ? 'Permitido' : 'Denegado'
      });

      this.totalIngress++;
      if (mockClient.status === 'permitido') {
        this.allowedAccesses++;
      } else {
        this.deniedAccesses++;
      }
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.result = null;
  }
}