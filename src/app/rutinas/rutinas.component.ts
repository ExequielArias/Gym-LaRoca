import { Component, OnInit } from '@angular/core';
import { supabase } from '../supabase.client';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, RouterModule, FormsModule, MatDialogModule],
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})

export class RutinasComponent implements OnInit {
  // ...existing code...

  // Eliminar la rutina del cliente en Supabase
  async eliminarRutina() {
    if (!this.cliente) return;
    if (!confirm('¿Seguro que deseas eliminar la rutina de este cliente?')) return;
    const { error } = await supabase
      .from('rutinas')
      .delete()
      .eq('cliente_id', this.cliente.id);
    if (error) {
      alert('Error al eliminar rutina: ' + error.message);
      return;
    }
    alert('Rutina eliminada correctamente');
    this.activeTab = 'search';
    await this.loadClients();
    this.cliente = null;
    this.rutina = { objetivo: '', dias: [] };
  }
  // ...existing code...

  // Agregar un nuevo día a la rutina
  agregarDia() {
    this.rutina.dias.push({ nombre: '', ejercicios: [] });
  }

  // Eliminar un día de la rutina
  eliminarDia(index: number) {
    this.rutina.dias.splice(index, 1);
  }

  // Agregar un ejercicio a un día
  agregarEjercicio(diaIndex: number) {
    this.rutina.dias[diaIndex].ejercicios.push({ nombre: '', detalle: '' });
  }

  // Eliminar un ejercicio de un día
  eliminarEjercicio(diaIndex: number, ejercicioIndex: number) {
    this.rutina.dias[diaIndex].ejercicios.splice(ejercicioIndex, 1);
  }

  // Guardar rutina en Supabase (crear o actualizar)
  async guardarRutina() {
    if (!this.cliente) return;
    const rutinaData = {
      cliente_id: this.cliente.id,
      objetivo: this.rutina.objetivo,
      ejercicios: this.rutina.dias.map((d: any) => ({
        dia: d.nombre,
        ejercicios: d.ejercicios
      }))
    };
    // Verificar si ya existe rutina para este cliente
    const { data: existente, error: errorExistente } = await supabase
      .from('rutinas')
      .select('id')
      .eq('cliente_id', this.cliente.id)
      .single();
    let result;
    if (!errorExistente && existente) {
      // Actualizar
      result = await supabase
        .from('rutinas')
        .update(rutinaData)
        .eq('cliente_id', this.cliente.id);
    } else {
      // Insertar
      result = await supabase
        .from('rutinas')
        .insert(rutinaData);
    }
    if (result.error) {
      alert('Error al guardar rutina: ' + result.error.message);
      return;
    }
    alert('Rutina guardada correctamente');
    this.activeTab = 'search';
    await this.loadClients();
  }

  // Descargar rutina como PDF (placeholder)
  descargarPDF() {
    alert('Funcionalidad de descarga PDF aún no implementada.');
  }

  // Enviar rutina por WhatsApp (placeholder)
  enviarWhatsApp() {
    alert('Funcionalidad de envío por WhatsApp aún no implementada.');
  }
  clients: any[] = [];
  searchTerm: string = '';
  filteredClients: any[] = [];
  activeTab = 'search';
  cliente: any = null;
  rutina: any = { objetivo: '', dias: [] };
  rutinaPreview: any = null;
  clientePreview: any = null;

  async ngOnInit() {
    await this.loadClients();
  }

  async loadClients() {
    // Cargar clientes
    const { data: clientes, error: errorClientes } = await supabase.from('clientes').select('*');
    if (errorClientes) {
      alert('Error al cargar clientes: ' + errorClientes.message);
      this.clients = [];
      this.filteredClients = [];
      return;
    }

    // Cargar rutinas existentes
    const { data: rutinas, error: errorRutinas } = await supabase.from('rutinas').select('cliente_id');
    if (errorRutinas) {
      alert('Error al cargar rutinas: ' + errorRutinas.message);
    }
    const clientesConRutina = new Set((rutinas ?? []).map((r: any) => r.cliente_id));

    this.clients = clientes.map((c: any) => ({
      id: c.id,
      name: `${c.nombres ?? ''} ${c.apellidos ?? ''}`.trim(),
      dni: c.dni,
      phone: c.telefono,
      tieneRutina: clientesConRutina.has(c.id)
    }));
    this.filterClients();
  }

  filterClients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(c =>
      c.name.toLowerCase().includes(term) ||
      (c.dni && c.dni.toString().includes(term)) ||
      (c.phone && c.phone.toString().includes(term))
    );
  }

  async irAEvaluacion(client: any) {
    this.cliente = client;
    // Si el cliente ya tiene rutina, cargarla en el formulario para editar
    const { data, error } = await supabase
      .from('rutinas')
      .select('*')
      .eq('cliente_id', client.id)
      .single();
    if (!error && data) {
      // Adaptar datos al formato del formulario
      this.rutina = {
        objetivo: data.objetivo || '',
        dias: Array.isArray(data.ejercicios)
          ? data.ejercicios.map((d: any) => ({
              nombre: d.dia,
              ejercicios: Array.isArray(d.ejercicios) ? d.ejercicios : []
            }))
          : []
      };
    } else {
      this.rutina = { objetivo: '', dias: [] };
    }
    this.activeTab = 'evaluation';
  }

  async verRutinaPreview(cliente: any) {
    // Buscar la rutina de este cliente
    const { data, error } = await supabase
      .from('rutinas')
      .select('*')
      .eq('cliente_id', cliente.id)
      .single();
    if (error) {
      alert('No se pudo cargar la rutina para vista previa.');
      return;
    }
    this.rutinaPreview = data;
    this.clientePreview = cliente;
    this.activeTab = 'preview';
  }
}