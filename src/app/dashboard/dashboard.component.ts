import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    quickRegisterAttendance() {
        alert('Abrir diálogo para registrar nueva asistencia');
    }

    quickProcessPayment() {
        alert('Abrir diálogo para procesar pago');
    }

    quickAddClient() {
        alert('Abrir diálogo para agregar cliente');
    }
    user: any;

    modules = [
        { title: 'Gestión de Clientes', description: 'Registrar y administrar información de clientes', href: '/clientes'},
        { title: 'Control de Asistencias', description: 'Registrar y monitorear la asistencia de clientes', href: '/asistencias'},
        { title: 'Rutinas de Entrenamiento', description: 'Crear y asignar rutinas personalizadas', href: '/rutinas'},
        { title: 'Gestión de Pagos', description: 'Procesar pagos y generar facturas', href: '/pagos'},
        { title: 'Tienda de Productos', description: 'Gestionar inventario y ventas de productos', href: '/tienda'}
    ];

    stats = [
        { label: 'Clientes Activos', value: '342', change: '+12%' },
        { label: 'Asistencias Hoy', value: '89', change: '+5%' },
        { label: 'Ventas del Mes', value: '$45,230', change: '+18%' },
        { label: 'Nuevos Miembros', value: '23', change: '+8%' }
    ];

    constructor(private auth: AuthService) { 
        this.user = this.auth.getCurrentUser();
    }

    logout() {
        this.auth.logout();
    }
}
