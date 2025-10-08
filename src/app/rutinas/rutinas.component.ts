import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('previewContent', { static: false }) previewContent!: ElementRef;

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


  // Descargar rutina como PDF personalizado
  async descargarPDF() {
    const jsPDF = (await import('jspdf')).jsPDF;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgUrl = 'https://cycbwbiszlojxhyovpfu.supabase.co/storage/v1/object/public/imagenes/fotos/iconoDos.png';
    // Cargar imagen para logo y marca de agua
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imgUrl;
    await new Promise(resolve => { img.onload = resolve; });


    // Marca de agua: fondo muy claro y realmente transparente
    // Convertir imagen a canvas y aplicar alpha
    function getAlphaImage(img: HTMLImageElement, width: number, height: number, alpha: number): string {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, 0, 0, width, height);
      return canvas.toDataURL('image/png');
    }
    const marcaAguaDataUrl = getAlphaImage(img, 150, 150, 0.08);
    doc.addImage(marcaAguaDataUrl, 'PNG', 30, 60, 150, 150, '', 'NONE');


  // Encabezado con logo y título centrados y color rojo
  // Rojo tailwind red-600
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(0, 0, pageWidth, 28, 0, 0, 'F');
  // Centrar logo y texto
  const logoW = 18, logoH = 18;
  const centerX = pageWidth / 2;
  // Logo a la izquierda del centro, texto a la derecha
  const text = 'Gym LaRoca';
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  const textWidth = doc.getTextWidth(text);
  const totalWidth = logoW + 6 + textWidth;
  const logoX = centerX - (totalWidth / 2);
  const textX = logoX + logoW + 6 + textWidth / 2;
  doc.addImage(img, 'PNG', logoX, 5, logoW, logoH, '', 'NONE');
  doc.setTextColor(255,255,255);
  doc.text(text, textX, 18, { align: 'center' });

  // Subtítulo
  doc.setFontSize(15);
  doc.setTextColor(220, 38, 38);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rutina para: ${this.clientePreview?.name || ''}`, pageWidth/2, 38, { align: 'center' });

    // Objetivo
    let y = 50;
    doc.setFontSize(13);
    doc.setTextColor(60,60,60);
    doc.setFont('helvetica', 'bold');
    doc.text('Objetivo:', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(this.rutinaPreview?.objetivo || '', 45, y);
    y += 10;

    // Rutina por días
    if (this.rutinaPreview?.ejercicios) {
      for (const dia of this.rutinaPreview.ejercicios) {
        // Más espacio antes del bloque de día
        y += 6;
        doc.setDrawColor(34, 58, 170);
        doc.setLineWidth(0.5);
        doc.roundedRect(15, y-4, pageWidth-30, 8, 2, 2, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text(`Día: ${dia.dia}`, 20, y+2);
  y += 12;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60,60,60);
        for (const ejercicio of dia.ejercicios) {
          let texto = `• ${ejercicio.nombre}`;
          if (ejercicio.detalle) texto += ` (${ejercicio.detalle})`;
          doc.text(texto, 28, y);
          y += 7;
          if (y > pageHeight - 30) {
            // Pie de página
            doc.setFontSize(9);
            doc.setTextColor(180,180,180);
            doc.text('Documento generado automáticamente por Gym LaRoca', pageWidth/2, pageHeight-10, { align: 'center' });
            doc.addPage();
            // Marca de agua en cada página
            doc.addImage(img, 'PNG', 30, 60, 150, 150, '', 'NONE', 0.08);
            y = 30;
          }
        }
        y += 8;
      }
    }

    // Pie de página
    doc.setFontSize(9);
    doc.setTextColor(180,180,180);
    doc.text('Documento generado automáticamente por Gym LaRoca', pageWidth/2, pageHeight-10, { align: 'center' });

    doc.save(`Rutina_${this.clientePreview?.name || 'cliente'}.pdf`);
  }

  // Enviar rutina por WhatsApp
  enviarWhatsApp() {
    if (!this.rutinaPreview || !this.clientePreview) {
      alert('No hay rutina para enviar.');
      return;
    }
    let mensaje = `*Rutina de ${this.clientePreview.name}*\n`;
    mensaje += `Objetivo: ${this.rutinaPreview.objetivo}\n`;
    for (const dia of this.rutinaPreview.ejercicios) {
      mensaje += `\n*${dia.dia}*\n`;
      for (const ejercicio of dia.ejercicios) {
        mensaje += `- ${ejercicio.nombre}`;
        if (ejercicio.detalle) mensaje += ` (${ejercicio.detalle})`;
        mensaje += '\n';
      }
    }
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
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